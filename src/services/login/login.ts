import axios from 'axios';

interface ApiPayload {
  usuario: string;
  senha: string;
}

export async function login(payload: ApiPayload): Promise<any> {
  try {
    const response = await axios.post('http://localhost:3001/login', payload);
    const userData = response.data[0]; // Considerando que a resposta é um array com um único objeto
    
    // Salvar informações no localStorage
    localStorage.setItem('userId', String(userData.id));
    localStorage.setItem('userName', userData.nome);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userUsername', userData.usuario);
    localStorage.setItem('userPassword', userData.senha);
    return response.data    ;
  } catch (error) {
    throw new Error('Erro na chamada da API: ' + error);
  }
}

/*
  Salvar os dados do user ao afetuar login no localStorage

  O botão de add em produtos deve chamar validação para ver se user ja tem carrinho, se não tiver deve criar
  Depois de verificar carrinho deve adicionar o produto ao carrinho
  Listar produtos que estão no carrinho
  Dar opção de editar quantidade e excluir itens do carrinho
  dar opcao de mudar estado do carrinho




*/