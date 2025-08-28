import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getProducts } from '~/modules/product/product.api';
import type { ProductPaginated, QueryProducts } from '~/modules/product/product.schema';
import { QUERY_KEY, type QueryKey } from '~/common/const/querykey';
import type { TAxiosResponse, TResponse } from '~/common/types/response';

type Result = UseQueryOptions<TAxiosResponse<ProductPaginated>, TResponse, ProductPaginated | undefined, QueryKey<QueryProducts>[]>;

export const queryProducts = (query: QueryProducts = { engine: 'server_side' }): Result => ({
  queryKey: [QUERY_KEY.PRODUCT.GET_ALL, query],
  queryFn: () => getProducts(query),
  select: (s) => s.data.data,
});

const useGetProducts = (query: QueryProducts = {}) => {
  return useQuery(queryProducts(query));
};

export default useGetProducts;
