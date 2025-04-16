import axios from "axios";
import { Product, User, Cart } from "@/types";

// Using a more reliable endpoint
const API_BASE_URL = "https://fakestoreapi.com";

// Add a timeout and retry logic to axios requests
axios.defaults.timeout = 10000; // 10 seconds timeout

// Products API
export const getProducts = async (): Promise<Product[]> => {
  // Add retry logic
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error("Error fetching products after multiple retries:", error);

        // Return fallback data if available
        try {
          const cachedProducts = localStorage?.getItem("offline_products");
          if (cachedProducts) {
            console.log("Using cached products from localStorage");
            return JSON.parse(cachedProducts);
          }
        } catch (e) {
          console.error("Error accessing localStorage:", e);
        }

        // Return empty array as last resort
        return [];
      }
      console.log(`Retrying... ${retries} attempts left`);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return [];
};

export const getProduct = async (id: number): Promise<Product | null> => {
  // Add retry logic
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error(`Error fetching product with id ${id} after multiple retries:`, error);

        // Try to get from localStorage
        try {
          const cachedProducts = localStorage?.getItem("offline_products");
          if (cachedProducts) {
            const products = JSON.parse(cachedProducts) as Product[];
            const product = products.find(p => p.id === id);
            if (product) {
              console.log(`Using cached product ${id} from localStorage`);
              return product;
            }
          }
        } catch (e) {
          console.error("Error accessing localStorage:", e);
        }

        return null;
      }
      console.log(`Retrying product ${id}... ${retries} attempts left`);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return null;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // Add retry logic
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
      return response.data;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error(`Error fetching products in category ${category} after multiple retries:`, error);

        // Try to get from localStorage
        try {
          const cachedProducts = localStorage?.getItem("offline_products");
          if (cachedProducts) {
            const products = JSON.parse(cachedProducts) as Product[];
            const filteredProducts = products.filter(p => p.category === category);
            if (filteredProducts.length > 0) {
              console.log(`Using cached products for category ${category} from localStorage`);
              return filteredProducts;
            }
          }
        } catch (e) {
          console.error("Error accessing localStorage:", e);
        }

        return [];
      }
      console.log(`Retrying category ${category}... ${retries} attempts left`);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return [];
};

export const getCategories = async (): Promise<string[]> => {
  // Add retry logic
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      return response.data;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error("Error fetching categories after multiple retries:", error);

        // Return fallback data if available
        try {
          const cachedCategories = localStorage?.getItem("offline_categories");
          if (cachedCategories) {
            console.log("Using cached categories from localStorage");
            return JSON.parse(cachedCategories);
          }
        } catch (e) {
          console.error("Error accessing localStorage:", e);
        }

        // Return default categories as last resort
        return ["electronics", "jewelery", "men's clothing", "women's clothing"];
      }
      console.log(`Retrying categories... ${retries} attempts left`);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return [];
};

// Users API
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUser = async (id: number): Promise<User | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    return null;
  }
};

// Carts API
export const getCarts = async (): Promise<Cart[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    return [];
  }
};

export const getUserCart = async (userId: number): Promise<Cart[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart for user ${userId}:`, error);
    return [];
  }
};

// Offline fallback data
export const getOfflineProducts = async (): Promise<Product[]> => {
  try {
    // Try to get from localStorage first
    const cachedProducts = localStorage.getItem("offline_products");
    if (cachedProducts) {
      return JSON.parse(cachedProducts);
    }

    // If not in localStorage, fetch and cache
    const products = await getProducts();
    localStorage.setItem("offline_products", JSON.stringify(products));
    return products;
  } catch (error) {
    console.error("Error getting offline products:", error);
    return [];
  }
};

export const getOfflineCategories = async (): Promise<string[]> => {
  try {
    const cachedCategories = localStorage.getItem("offline_categories");
    if (cachedCategories) {
      return JSON.parse(cachedCategories);
    }

    const categories = await getCategories();
    localStorage.setItem("offline_categories", JSON.stringify(categories));
    return categories;
  } catch (error) {
    console.error("Error getting offline categories:", error);
    return [];
  }
};
