import { ApiRoutes } from '@/constants/api-routes';
import { IQueryParams } from '@/hooks/useQueryParams';
import httpClient from '@/lib/http-client';
import { objectToQueryString } from '@/lib/utils';
import { Paginator } from '@/types/common';
import axios, { CancelTokenSource } from 'axios';
import { enqueueSnackbar } from 'notistack';

export type IResponseListType = {
  status: boolean | string;
  message: string;
  data: Record<string, unknown> | null;
};

export interface IProducts {
  id: string;
  category_name: string;
  style_code: string;
  title: string;
  short_desc: string;
  description: string;
  images: string[];
  fabric: string;
  name: string;
  related_products: IProducts[];
}

export type IStore = {
  allProductsIsLoading: boolean;
  paymentListLoading: boolean;

  allProductsListLoading: boolean;
  isAllProductsFirstLoading: boolean;
  allProductsListData: IProducts[] | null;
  getAllProductsList: (queryParams: IQueryParams) => Promise<IResponseListType | null>;
  totalAllProductsPages: number;
  allProductsPaginator: Paginator | null;

  queryParams: IQueryParams | null;
  totalPaymentPages: number;
  paymentPaginator: Paginator | null;
  search: string;
  cancelTokenSource: CancelTokenSource | null;
  formSubmitError: string | null;

  setTotalAllProductsPages: (totalPages: number) => void;

  setTotalPaymentPages: (total: number) => void;
  setPaymentPaginator: (paginator: Paginator | null) => void;
};

import { create } from 'zustand';

export const useAllProductStore = create<IStore>((set, get) => ({
  // Initial state
  allProductsIsLoading: false,
  allProductsListLoading: false,
  isAllProductsFirstLoading: false,
  paymentListLoading: false,

  deleteSelectedallProductsListLoading: false,


  allProductsListData: null,
  allProductsPaginator: null,
  paymentPaginator: null,

  totalAllProductsPages: 1,
  totalPaymentPages: 1,

  queryParams: null,
  search: '',
  cancelTokenSource: null,
  formSubmitError: null,

  // Setters
  setTotalAllProductsPages: (total) => set({ totalAllProductsPages: total }),
  setTotalPaymentPages: (total) => set({ totalPaymentPages: total }),
  setPaymentPaginator: (paginator) => set({ paymentPaginator: paginator }),

  // API
  getAllProductsList: async (queryParams) => {
    try {
      set({ allProductsListLoading: true });

      const { queryParams: savedQueryParams, cancelTokenSource } = get();

      if (cancelTokenSource) {
        cancelTokenSource.cancel('Cancelled due to new request');
      }

      const newCancelTokenSource = axios.CancelToken.source();
      set({ cancelTokenSource: newCancelTokenSource });

      const singleRow = (queryParams?.query as { singleRow?: string })?.singleRow ?? null;

      const mergedQueryParams =
        singleRow === 'true' ? { ...savedQueryParams, ...queryParams } : queryParams;

      const queryString = objectToQueryString(mergedQueryParams);

      if (!get().isAllProductsFirstLoading) {
        set({
          allProductsIsLoading: true,
          isAllProductsFirstLoading: true,
        });
      }

      set({ queryParams: mergedQueryParams });

      const response = await httpClient.get(`${ApiRoutes.products.product_list}?${queryString}`, {
        cancelToken: newCancelTokenSource.token,
      });

      const resp = response.data;

      console.log("respresp", resp);


      if (resp.status === 'SUCCESS') {
        const allProductsData = resp.products_data ?? [];
        console.log("allProductsData", allProductsData);


        set({
          allProductsListData: allProductsData,
          allProductsPaginator: resp.data?.paginator ?? null,
          totalAllProductsPages: Math.ceil(
            (resp.data?.paginator?.itemCount ?? 0) / (resp.data?.paginator?.perPage ?? 1)
          ),
        });
      } else {
        enqueueSnackbar(resp.message || 'Failed to fetch All Products', {
          variant: 'error',
        });
      }

      set({
        allProductsIsLoading: false,
        allProductsListLoading: false,
        isAllProductsFirstLoading: false,
      });

      return resp;
    } catch (error) {
      if (axios.isCancel(error)) return null;

      set({
        formSubmitError: 'Failed to fetch All Products',
        allProductsIsLoading: false,
        allProductsListLoading: false,
        isAllProductsFirstLoading: false,
      });

      return null;
    }
  },
}));
