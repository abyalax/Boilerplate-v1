import type { UseMutationResult } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import type { IProduct, TPayloadProduct } from '~/modules/product/product.schema';
import type { TAxiosResponse } from '~/common/types/response';
import { createProduct } from '~/modules/product/product.api';
import { MUTATION_KEY } from '~/common/const/mutationkey';
import { QUERY_KEY } from '~/common/const/querykey';

export const useCreateProduct = (): UseMutationResult<TAxiosResponse<IProduct>, unknown, TPayloadProduct, unknown> => {
  return useMutation({
    mutationKey: [MUTATION_KEY.PRODUCT.CREATE],
    mutationFn: async (payload) => await createProduct(payload),
    meta: { invalidateQueries: [QUERY_KEY.PRODUCT.GET_ALL] },
    onSuccess: () => {
      console.log('useCreateProduct onSuccess');
      notifications.show({
        title: 'Success',
        message: 'Successfully created product',
      });
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        color: 'red',
        title: 'Failed to create product',
        message: (error as Error).message,
      });
    },
  });
};
