'use server';

import { FeedPost, INITIAL_FEED_POSTS } from '@/lib/data';
import { z } from 'zod';

// Esquema de validação com Zod
const createPostSchema = z.object({
  content: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
});

// Simulando um banco de dados em memória para a Fase 1
let MOCK_DB = [...INITIAL_FEED_POSTS];

export async function getFeedPosts(): Promise<FeedPost[]> {
  // Simular latência de rede
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_DB;
}

export async function createFeedPost(data: { content: string }) {
  // Validação Zod
  const parsed = createPostSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const newPost: FeedPost = {
    id: `post-${Date.now()}`,
    author: {
      name: 'Mariana Alencar', // Mock user
      role: 'Coord. Branding',
      avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1WNA9nH2zY9EotrNixsrRtNBhwi_E0dlvwDGcws0lFFXOAQFQZKLtjtz9XXWZhaA-rVX6fZJHZ0VxnO_B5TkkiZLiIELSMYMIGJ54TQvvaFwsPe_qK4zBmn7JMYYIj4f08AC-H_gdPgFd7omdHlMU9dxdf1DakS-gBzCCyzbVjig8HmyDGwmoWe2V5pMycdWFUWN_tR326ylET4GD-g4cOE276CduGrLzsMkiuBW02AFka7arfrqlzKIvs',
    },
    timeAgo: 'Agora mesmo',
    subtitle: 'Marketing Corp. • São Paulo (Sede)',
    content: parsed.data.content,
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    liked: false,
  };

  MOCK_DB = [newPost, ...MOCK_DB];
  return newPost;
}

export async function toggleLikePost(postId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  MOCK_DB = MOCK_DB.map((p) => {
    if (p.id === postId) {
      const nextLiked = !p.liked;
      return {
        ...p,
        liked: nextLiked,
        likesCount: nextLiked ? p.likesCount + 1 : p.likesCount - 1,
      };
    }
    return p;
  });
  
  return { success: true };
}
