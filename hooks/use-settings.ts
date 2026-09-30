'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDepartments, saveDepartment, getRequestTypes, saveRequestType, getFeaturedItems, saveFeaturedItem } from '@/app/actions/settings';
import toast from 'react-hot-toast';

export function useSettings() {
  const queryClient = useQueryClient();

  const departmentsQuery = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
  });

  const requestTypesQuery = useQuery({
    queryKey: ['requestTypes'],
    queryFn: () => getRequestTypes(),
  });

  const featuredItemsQuery = useQuery({
    queryKey: ['featuredItems'],
    queryFn: () => getFeaturedItems(),
  });

  const saveDepartmentMutation = useMutation({
    mutationFn: saveDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success('Departamento salvo com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao salvar departamento');
    }
  });

  const saveRequestTypeMutation = useMutation({
    mutationFn: saveRequestType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestTypes'] });
      toast.success('Tipo de solicitação salvo com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao salvar tipo de solicitação');
    }
  });

  const saveFeaturedItemMutation = useMutation({
    mutationFn: saveFeaturedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featuredItems'] });
      toast.success('Destaque salvo com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao salvar destaque');
    }
  });

  return {
    departments: departmentsQuery.data || [],
    isLoadingDepartments: departmentsQuery.isLoading,
    saveDepartment: saveDepartmentMutation.mutateAsync,
    isSavingDepartment: saveDepartmentMutation.isPending,

    requestTypes: requestTypesQuery.data || [],
    isLoadingRequestTypes: requestTypesQuery.isLoading,
    saveRequestType: saveRequestTypeMutation.mutateAsync,
    isSavingRequestType: saveRequestTypeMutation.isPending,

    featuredItems: featuredItemsQuery.data || [],
    isLoadingFeaturedItems: featuredItemsQuery.isLoading,
    saveFeaturedItem: saveFeaturedItemMutation.mutateAsync,
    isSavingFeaturedItem: saveFeaturedItemMutation.isPending,
  };
}
