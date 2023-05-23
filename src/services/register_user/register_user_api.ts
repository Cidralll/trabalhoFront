import axios from 'axios';

interface Apiuser {
  nome: string;
  email: string;
  usuario: string;
  senha: string
}

export async function registerUserAPI(user: Apiuser): Promise<any> {
  try {
    const response = await axios.post('http://localhost:3001/register', user);
    return response.data;
  } catch (error) {
    throw new Error('Erro na chamada da API: ' + error);
  }
}
