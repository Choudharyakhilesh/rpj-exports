
import httpClient from "@/lib/http-client";
import { ApiRoutes } from "@/constants/api-routes";

import { create } from "zustand";

export type IResponseType = {
  status: boolean | string;
  message: string;
  data: Record<string, unknown> | null;
};

export interface IPaginatedBlogs {
  data: IBlog[];
  current_page: number;
  last_page: number;
}

export interface IBlog {
  title: string;
  short_desc: string;
  content: string;
  image: string;
  status: string;
  blog_image_url: string;
  author_name: string;
  publish_date: string;
  category: string;
  id: number;
  tags: string[];
  created_at: string;
  related_blogs?: IBlog[];
}

export interface ISettings {
  id: number;
  key: string;
  value: string;
  description?: string | null;

}


export interface IHomePage {
  status: boolean | string;
  message: string;
  blogs: IBlog[];
  setting: ISettings[];
  map: {
    view_url: string;
    embed_url: string;
  }
  banners: {
    id: number;
    title: string;
    image: string;
    banner_image: string;
    short_descp: string;
    long_description: string;
  }[]
}

export interface IBlogPage {
  status: boolean | string;
  message: string;
  blogs: IPaginatedBlogs;
}

export type IStore = {
  homePageData: IHomePage | null;
  homeDataLoading: boolean;

  getHomeData: () => Promise<IResponseType | null>;

  allBlogsListData: IBlogPage | null;
  allBlogsListLoading: boolean;
  getAllBlogsList: (page?: number) => Promise<IResponseType | null>;

  blogDeatilsData: IBlog | null;
  blogDetailsLoading: boolean;
  getBlogDetails: (data: object) => Promise<IResponseType | null>;



  searchDetailsLoading: boolean;
  getSearchDetails: (data: object) => Promise<IResponseType | null>;
};

export const useHomeStore = create<IStore>((set) => ({
  homeDataLoading: false,

  homePageData: null,

  allBlogsListData: null,
  allBlogsListLoading: false,

  blogDetailsLoading: false,

  blogDeatilsData: null,

  searchDetailsLoading: false,

  getHomeData: async () => {
    try {
      set({ homeDataLoading: true });

      const response = await httpClient.get(`${ApiRoutes.home.home_page}`);
      const resp = response.data;

      set({
        homePageData: resp || null,
        homeDataLoading: false,
      });
      return resp;
    } catch (error) {
      const err = error as { response?: { data?: string } };
      set({
        homeDataLoading: false,
      });
      return err.response?.data ?? null;
    }
  },

  getAllBlogsList: async (page: number = 1) => {
    try {
      set({ allBlogsListLoading: true });

      const response = await httpClient.get(`${ApiRoutes.blog.blog_list}?page=${page}`);
      const resp = response.data;

      set({
        allBlogsListData: resp || null,
        allBlogsListLoading: false,
      });
      return resp;
    } catch {
      set({ allBlogsListLoading: false });
      return null;
    }
  },

  getBlogDetails: async (data) => {
    try {
      set({ blogDetailsLoading: true });

      const response = await httpClient.post(
        `${ApiRoutes.blog.blog_details}`,
        data
      );
      const resp = response.data;
      const blogWithRelated = resp.blog ? {
        ...resp.blog,
        related_blogs: resp.related_blogs || []
      } : null;

      set({
        blogDeatilsData: blogWithRelated,
        blogDetailsLoading: false,
      });
      return resp;
    } catch (error) {
      const err = error as { response?: { data?: string } };
      set({
        blogDetailsLoading: false,
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

      if (resp.status) {
        // Hum results ko usi format mein set kar rahe hain jo UI expect kar raha hai
        set({
          allBlogsListData: {
            status: resp.status,
            message: resp.message,
            blogs: {
              data: resp.results, // API se 'results' aa raha hai (postman screenshot ke hisab se)
              current_page: 1,
              last_page: 1,
            },
          },
          allBlogsListLoading: false,
        });
      }

      return resp;
    } catch (error) {
      const err = error as { response?: { data?: string } };
      set({
        searchDetailsLoading: false,
      });
      return err.response?.data ?? null;
    }
  },
}));
