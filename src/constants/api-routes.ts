// import { add } from "lodash";

interface IApiPrefix {
  BLOG: string;
  SUPPORT: string;
  USERS: string;
}
export const API_PREFIX: IApiPrefix = {
  BLOG: 'blog',
  SUPPORT: 'support',
  USERS: 'users',
};

export const ApiRoutes = {
  inquiry: {
    add_inquiry: '/enquiry-submit',
  },
  home: {
    home_page: 'home-page',
  },

  blog: {
    blog_list: 'get-all-blogs',
    blog_details: 'get-blog-details',
  },
  search: {
    search_items: 'search-items'
  },
  products: {
    product_list: 'get-all-product',
    product_category: 'get-all-product-categories',
    product_details: 'get-product-details',
  },
};
