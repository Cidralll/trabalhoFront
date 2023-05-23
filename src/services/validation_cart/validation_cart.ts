import axios from 'axios';

export async function validationCart(userID: number): Promise<any> {
    const enviar = {
        valor_total: 0,
        usuario_id: userID,
        data_criacao: Date.now(),
        data_alteracao: Date.now(),
        status: 'pendente'
    }
    try {
      const response = await axios.post('http://localhost:3001/login', enviar);

      const result = response.data.msg;

      if (result === 'Carrinho criado com sucesso') {
        return true
      }else {
        return false;
      }
    } catch (error) {
      throw new Error('Erro na chamada da API: ' + error);
    }
  }
  