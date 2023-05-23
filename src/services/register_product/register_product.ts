import axios from 'axios';

interface Apiproduct {
  nome: string;
  marca: string;
  preco: number;
  data_validade: string,
  descricao: string
}

export async function registerProductAPI(product: Apiproduct): Promise<any> {
  try {
    const response = await axios.post('http://localhost:3001/register/product', product);
    return response.data;
  } catch (error) {
    throw new Error('Erro na chamada da API: ' + error);
  }
}
