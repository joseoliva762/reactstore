import axios from 'axios';
import endPoints from '@services/api';
import { Product, ProductToCreate } from '@models/product';

const addProducts = async (payload: ProductToCreate) => {
  const options = {
    headers: {
      accept: '*/*',
      'Content-type': 'application/json'
    }
  };
  const api = endPoints.products.postProducts;
  const { data } = await axios.post(api, payload, options);
  return data;
};

const getAllProducts = (limit: number, offset: number) => {
  return new Promise<Product[]>((resolve, reject) => {
    try {
      const getProducts = async () => {
        const { data: products } = await axios.get(endPoints.products.getProducts(limit, offset));
        resolve(products);
      };
      getProducts();
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = async (id: number) => {
  const api = endPoints.products.deleteProduct(id);
  const { data } = await axios.delete(api);
  return data;
};

export { addProducts, getAllProducts, deleteProduct };
