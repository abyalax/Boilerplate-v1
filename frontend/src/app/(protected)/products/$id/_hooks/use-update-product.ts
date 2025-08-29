import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

import type { IProduct, TPayloadProduct } from '~/modules/product/product.schema';
import { QUERY_KEY, type QueryKey } from '~/common/const/querykey';
import type { TAxiosResponse } from '~/common/types/response';
import { updateProduct } from '~/modules/product/product.api';
import { MUTATION_KEY } from '~/common/const/mutationkey';

export const useUpdateProduct = (id: string): UseMutationResult<TAxiosResponse<IProduct>, unknown, TPayloadProduct, unknown> => {
  return useMutation({
    mutationKey: [MUTATION_KEY.PRODUCT.UPDATE],
    mutationFn: async (payload) => await updateProduct(payload),
    meta: { invalidateQueries: [QUERY_KEY.PRODUCT.GET_BY_ID, id] as QueryKey[] },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Successfully created product',
      });
    },
    onError: (error) => {
      notifications.show({
        color: 'red',
        title: 'Failed to create product',
        message: (error as Error).message,
      });
    },
  });
};
