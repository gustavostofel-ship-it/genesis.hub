'use client';

import { useQuery } from '@tanstack/react-query';
import { getPeople } from '@/app/actions/people';

export function usePeople() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['people'],
    queryFn: () => getPeople(),
  });

  return {
    people: data || [],
    isLoading,
    isError,
    refetch,
  };
}
