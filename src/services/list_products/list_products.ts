import axios from 'axios';

export async function listProductsAPI(): Promise<any> {
  try {
    const response = await axios.get('http://localhost:3001/product');
    return response.data;
  } catch (error) {
    throw new Error('Erro na chamada da API: ' + error);
  }
}
