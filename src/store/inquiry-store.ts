
import { API_PREFIX } from "@/constants/api-routes";
import httpClient from "@/lib/http-client";

import { create } from "zustand";

export type IResponseType = {
  status: string;
  message: string;
  data: Record<string, unknown> | null;
};

interface ApiError {
  response?: {
    data?: IResponseType;
  };
}

export type IStore = {
  createInquiryLoading: boolean;
  apiCreateInquiry: (data: object) => Promise<IResponseType | null>;

  createInquiryStickeyLoading: boolean;
  apiCreateInquirySticky: (data: object) => Promise<IResponseType | null>;
};

export const useInquiryManagementStore = create<IStore>((set) => ({
  createInquiryLoading: false,

  createInquiryStickeyLoading: false,

  // apiCreateInquiry: async (data) => {
  //   try {
  //     set({ createInquiryLoading: true });

  //     const response = await httpClient.post(`/${API_PREFIX.SUPPORT}/enquiry-submit`, data);
  //     const resp = response?.data;
  //     console.log("response", resp);

  //     if (resp?.status === "SUCCESS") {
  //     }

  //     set({ createInquiryLoading: false });
  //     return resp;
  //   } catch (error) {
  //     const err = error as { response?: { data?: string } };
  //     return err.response?.data ?? null;
  //   } finally {
  //     set({ createInquiryLoading: false });
  //   }
  // },

  apiCreateInquiry: async (data: object) => {
    try {
      set({ createInquiryLoading: true });

      const response = await httpClient.post(`/${API_PREFIX.SUPPORT}/enquiry-submit`, data);

      // Seedha response data return karein
      return response?.data as IResponseType;

    } catch (error) {
      // 'any' ki jagah 'unknown' handle karna
      const err = error as ApiError;
      return err.response?.data ?? null;
    } finally {
      set({ createInquiryLoading: false });
    }
  },

  // apiCreateInquirySticky: async (data) => {
  //   try {
  //     set({ createInquiryStickeyLoading: true });

  //     const response = await httpClient.post(`/${API_PREFIX.SUPPORT}/enquiry-submit`, data);
  //     const resp = response?.data;
  //     console.log("response", resp);

  //     if (resp?.status === "SUCCESS") {


  //     }
  //     set({ createInquiryStickeyLoading: false });
  //     return resp;
  //   } catch (error) {
  //     const err = error as { response?: { data?: string } };
  //     return err.response?.data ?? null;
  //   } finally {
  //     set({ createInquiryStickeyLoading: false });
  //   }
  // },

  apiCreateInquirySticky: async (data: object) => {
    try {
      set({ createInquiryStickeyLoading: true });

      const response = await httpClient.post(`/${API_PREFIX.SUPPORT}/enquiry-submit`, data);

      // Seedha response data return karein
      return response?.data as IResponseType;

    } catch (error) {
      // 'any' ki jagah 'unknown' handle karna
      const err = error as ApiError;
      return err.response?.data ?? null;
    } finally {
      set({ createInquiryStickeyLoading: false });
    }
  },
}));
