import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

import type { UseMutationResult } from '@tanstack/react-query';

import { MUTATION_KEY } from '~/common/const/mutationkey';
import { createProduct } from '~/modules/product/product.api';
import { QUERY_KEY } from '~/common/const/querykey';

import type { TAxiosResponse } from '~/common/types/response';
import type { IProduct, TPayloadProduct } from '~/modules/product/product.schema';

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
