import axios from "axios";
import { Product, User, Cart } from "@/types";

// Using a more reliable endpoint
const API_BASE_URL = "https://fakestoreapi.com";

// Add a timeout and retry logic to axios requests
axios.defaults.timeout = 15000; // 15 seconds timeout

// Fallback data for when API is unavailable
const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Womens T-Shirt",
    price: 39.99,
    description: "Lightweight perfection in a versatile t-shirt for women, ideal for casual outings or relaxed home wear.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.5, count: 430 }
  },
  {
    id: 5,
    title: "Wireless Earbuds",
    price: 129.99,
    description: "Premium wireless earbuds with noise cancellation and long battery life for immersive audio experiences.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 4.6, count: 320 }
  },
  {
    id: 6,
    title: "Gold Pendant Necklace",
    price: 89.95,
    description: "Elegant gold pendant necklace, perfect for special occasions or as a thoughtful gift.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.3, count: 210 }
  }
];

const fallbackCategories: string[] = ["electronics", "jewelery", "men's clothing", "women's clothing"];

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

        // Return fallback data
        console.log("Using fallback products data");
        return fallbackProducts;
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

        // Try to get from fallback data
        const product = fallbackProducts.find(p => p.id === id);
        if (product) {
          console.log(`Using fallback product ${id}`);
          return product;
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

        // Try to get from fallback data
        const filteredProducts = fallbackProducts.filter(p => p.category === category);
        if (filteredProducts.length > 0) {
          console.log(`Using fallback products for category ${category}`);
          return filteredProducts;
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

        // Return fallback categories
        console.log("Using fallback categories");
        return fallbackCategories;
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
    // Try to fetch products
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error("Error getting offline products:", error);
    return fallbackProducts;
  }
};

export const getOfflineCategories = async (): Promise<string[]> => {
  try {
    // Try to fetch categories
    const categories = await getCategories();
    return categories;
  } catch (error) {
    console.error("Error getting offline categories:", error);
    return fallbackCategories;
  }
};
