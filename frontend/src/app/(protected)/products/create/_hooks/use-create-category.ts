import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

import type { ICategory } from '~/modules/product/product.schema';
import { createCategory } from '~/modules/product/product.api';
import type { TAxiosResponse } from '~/common/types/response';
import { MUTATION_KEY } from '~/common/const/mutationkey';
import { QUERY_KEY } from '~/common/const/querykey';

export const useCreateCategory = (): UseMutationResult<TAxiosResponse<{ category: ICategory }>, unknown, { name: string }, unknown> => {
  return useMutation({
    mutationKey: [MUTATION_KEY.PRODUCT.CREATE_CATEGORY],
    mutationFn: async (payload) => await createCategory(payload),
    meta: { invalidateQueries: [QUERY_KEY.PRODUCT.GET_CATEGORIES] },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Successfully create new categories',
      });
    },
    onError: (error) => {
      notifications.show({
        color: 'red',
        title: 'Failed to create category',
        message: (error as Error).message,
      });
    },
  });
};
