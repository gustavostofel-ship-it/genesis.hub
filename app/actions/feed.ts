'use server';

import { FeedPost } from '@/lib/data';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const createPostSchema = z.object({
  content: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
});

export async function getFeedPosts(): Promise<FeedPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      type,
      image_url,
      video_url,
      title,
      author:author_id (
        id,
        first_name,
        last_name,
        avatar_url,
        role_title,
        department:department_id (name)
      ),
      reactions:post_reactions (reaction_type, user_id),
      comments:comments (id)
    `)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  const { data: userAuth } = await supabase.auth.getUser();
  const uid = userAuth?.user?.id;

  return data.map((post: any) => {
    const authorName = post.author ? `${post.author.first_name} ${post.author.last_name}` : 'Sistema Genesis';
    const departmentName = post.author?.department?.name || 'Comunicação Interna';
    
    // Check reactions
    const likes = post.reactions ? post.reactions.filter((r: any) => r.reaction_type === 'like') : [];
    const myLike = uid ? likes.some((r: any) => r.user_id === uid) : false;

    return {
      id: post.id,
      author: {
        name: authorName,
        role: post.author?.role_title || '',
        avatar: post.author?.avatar_url || '',
      },
      timeAgo: new Date(post.created_at).toLocaleDateString('pt-BR'),
      subtitle: departmentName,
      content: post.content,
      likesCount: likes.length,
      commentsCount: post.comments ? post.comments.length : 0,
      sharesCount: 0,
      liked: myLike,
    };
  });
}

export async function createFeedPost(data: { content: string }) {
  const parsed = createPostSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(String(parsed.error));
  }

  const supabase = await createClient();
  const { data: userAuth } = await supabase.auth.getUser();
  if (!userAuth?.user) throw new Error("Unauthorized");

  const { data: newPost, error } = await (supabase as any)
    .from('posts')
    .insert({
      author_id: userAuth.user.id,
      content: parsed.data.content,
      type: 'conquista',
    })
    .select('*')
    .single();

  if (error) throw error;
  return newPost;
}

export async function toggleLikePost(postId: string) {
  const supabase = await createClient();
  const { data: userAuth } = await supabase.auth.getUser();
  if (!userAuth?.user) throw new Error("Unauthorized");
  
  const uid = userAuth.user.id;
  
  const { data: existing }: { data: any } = await supabase
    .from('post_reactions')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', uid)
    .eq('reaction_type', 'like')
    .single();
    
  if (existing) {
    await supabase.from('post_reactions').delete().eq('id', existing.id);
  } else {
    await (supabase as any).from('post_reactions').insert({
      post_id: postId,
      user_id: uid,
      reaction_type: 'like'
    });
  }
  
  return { success: true };
}
