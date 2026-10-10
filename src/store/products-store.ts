import httpClient from "@/lib/http-client";
import { ApiRoutes } from "@/constants/api-routes";

import { create } from "zustand";

export type IResponseType = {
  status: boolean | string;
  message: string;
  data: Record<string, unknown> | null;
};

export interface IPaginatedProduct {
  data: IProducts[];
  current_page: number;
  last_page: number;
}

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
  status: string;
}

export interface IProductsPage {
  status: boolean | string;
  message: string;
  blogs: IPaginatedProduct;
}

export interface IProductCategory {
  name: string;
  id?: number;
}

export type IStore = {
  allCategoryListData: IProductCategory[] | null;
  categoryDetailsLoading: boolean;
  getProductCategory: () => Promise<IResponseType | null>;

  allProductsListData: IProducts[] | null;
  allProductsListLoading: boolean;
  getAllProductsList: (data?: object, page?: number) => Promise<IResponseType | null>;

  productDeatilsData: IProducts | null;
  productDetailsLoading: boolean;
  getProductDetails: (data: object) => Promise<IResponseType | null>;

  searchDetailsLoading: boolean;
  getSearchDetails: (data: object) => Promise<IResponseType | null>;

  currentPage: number;
  lastPage: number;
  showLessProducts: () => void;
  pageDataCounts: number[];
};

export const useProductsStore = create<IStore>((set) => ({
  allCategoryListData: null,
  allProductsListData: null,
  allProductsListLoading: false,

  categoryDetailsLoading: false,

  productDeatilsData: null,
  productDetailsLoading: false,

  searchDetailsLoading: false,

  currentPage: 1,
  lastPage: 1,

  pageDataCounts: [],

  getProductCategory: async () => {
    try {
      set({ categoryDetailsLoading: true });

      const response = await httpClient.get(`${ApiRoutes.products.product_category}`);
      const resp = response.data;

      set({
        allCategoryListData: resp.categories_data || null,
        categoryDetailsLoading: false,
      });
      return resp;
    } catch (error) {
      const err = error as { response?: { data?: string } };
      set({
        categoryDetailsLoading: false,
      });
      return err.response?.data ?? null;
    }
  },
  // getAllProductsList: async (page: number = 1) => {
  //   try {
  //     set({ allProductsListLoading: true });

  //     const response = await httpClient.get(`${ApiRoutes.products.product_list_page}?page=${page}`);
  //     const resp = response.data;

  //     set({
  //       allProductsListData: resp?.products_data || null,
  //       allProductsListLoading: false,
  //     });
  //     return resp;
  //   } catch {
  //     set({ allProductsListLoading: false });
  //     return null;
  //   }
  // },

  getAllProductsList: async (data, page: number = 1) => {
    try {
      set({ allProductsListLoading: true });
      const response = await httpClient.post(
        `${ApiRoutes.products.product_list}?page=${page}`,
        {
          ...data, // single: { category_id: [3] }, multiple: { category_id: [3,4,2] }, no filter: {}
        }
      );

      const resp = response.data;

      const newData = resp?.products_data?.data || [];

      set((state) => {
        const currentData = state.allProductsListData || [];
        const filteredNewData = newData.filter(
          (newItem: IProducts) => !currentData.some((oldItem) => oldItem.id === newItem.id)
        );

        return {
          allProductsListData: page === 1 ? newData : [...currentData, ...filteredNewData],
          // 🔥 Har page ka naya count save karo
          pageDataCounts: page === 1 ? [newData.length] : [...state.pageDataCounts, filteredNewData.length],
          currentPage: resp?.products_data?.current_page || 1,
          lastPage: resp?.products_data?.last_page || 1,
          allProductsListLoading: false,
        };
      });
      return resp;
    } catch {
      set({ allProductsListLoading: false });
      return null;
    }
  },

  showLessProducts: () => {
    set((state) => {
      const currentData = state.allProductsListData || [];
      const counts = state.pageDataCounts;

      if (state.currentPage > 1 && counts.length > 0) {
        // 🔥 Aakhri page par jitna data aaya tha, sirf utna hi remove karo
        const lastPageCount = counts[counts.length - 1];
        const newData = currentData.slice(0, currentData.length - lastPageCount);

        return {
          allProductsListData: newData,
          pageDataCounts: counts.slice(0, -1), // Aakhri count hata do
          currentPage: state.currentPage - 1
        };
      }
      return state;
    });
  },

  getProductDetails: async (data) => {
    try {
      set({ productDetailsLoading: true });

      const response = await httpClient.post(
        `${ApiRoutes.products.product_details}`,
        data
      );
      const resp = response.data;
      const productWithRelated = resp.product ? {
        ...resp.product,
        related_products: resp.related_products || []
      } : null;

      set({
        productDeatilsData: productWithRelated,
        productDetailsLoading: false,
      });
      return resp;
    } catch (error) {
      const err = error as { response?: { data?: string } };
      set({
        productDetailsLoading: false,
      });
      return err.response?.data ?? null;
    }
  },

  getSearchDetails: async (data) => {
    try {
      set({ searchDetailsLoading: true });

      const response = await httpClient.post(
        `${ApiRoutes.search.search_items}`,
        data
      );

      const resp = response.data;

      if (resp.status && resp.type === "product") {
        const resultData = resp.results?.data || [];

        set({
          allProductsListData: resultData,
          currentPage: resp.results?.current_page || 1,
          lastPage: resp.results?.last_page || 1,
          pageDataCounts: [resultData.length],
          searchDetailsLoading: false,
        });
      }

      return resp;
    } catch {
      set({ searchDetailsLoading: false });
      return null;
    }
  },
}));
