import type { ExtractString } from '~/utils';

export const QUERY_KEY = {
  PRODUCT: {
    GET_ALL: 'get-product-all',
    GET_BY_ID: 'get-product-by-id',
    GET_CATEGORIES: 'get-product-categories',
  },
} as const;

export type QueryKey = ExtractString<typeof QUERY_KEY>;
