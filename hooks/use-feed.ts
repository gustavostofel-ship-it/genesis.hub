'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeedPosts, createFeedPost, toggleLikePost } from '@/app/actions/feed';
import toast from 'react-hot-toast';

export function useFeed() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['feedPosts'],
    queryFn: () => getFeedPosts(),
  });

  const createPostMutation = useMutation({
    mutationFn: createFeedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
      toast.success('Publicação enviada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao publicar.');
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleLikePost,
    // Optimistic Update
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['feedPosts'] });
      const previousPosts = queryClient.getQueryData(['feedPosts']);
      
      queryClient.setQueryData(['feedPosts'], (old: any) => {
        if (!old) return old;
        return old.map((p: any) => {
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
      });
      return { previousPosts };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['feedPosts'], context?.previousPosts);
      toast.error('Erro ao curtir publicação.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
    },
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    refetch: postsQuery.refetch,
    createPost: createPostMutation.mutate,
    isCreating: createPostMutation.isPending,
    toggleLike: toggleLikeMutation.mutate,
  };
}
