import { useQuery } from '@tanstack/react-query';
import { getProductCategories } from '~/modules/product/product.api';
import { QUERY_KEY } from '~/common/const/querykey';

export const queryProductCategories = () => ({
  queryKey: [QUERY_KEY.PRODUCT.GET_CATEGORIES],
  queryFn: () => getProductCategories(),
});

const useGetProductCategories = () => {
  return useQuery(queryProductCategories());
};

export default useGetProductCategories;
