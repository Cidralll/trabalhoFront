import { listProducts } from '@/lists/products';
import styles from '../styles/pages/produtos.module.scss';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { listProductsAPI } from '@/services/list_products/list_products';
import { validationCart } from '@/services/validation_cart/validation_cart';

interface ProdutosProps {
    
}

const Produtos: React.FC<ProdutosProps> = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await listProductsAPI();
            setProducts(response);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProducts();
    }, []);

    function addCarrinho(name: string, brand: string, price: number, validity: string, descricao: string) {
        // Vai ter q chamar função para enviar produtos para a API

        // Verifica se existe carrinho pro usur se não tiver cria
        const userId = localStorage.getItem('userId');
        const id = userId ? parseInt(userId, 10) : 0;        
        const resultCreateCart = validationCart(id);
    }

    function formatValidityDate(dateString: string) {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString('pt-BR');
    }

    return (
        <>
            <Navbar/>
            <section className={styles.sectionProdutos}>
                <div className={styles.divH1}>
                    <h1>Produtos</h1>
                </div>
                <div className={styles.divProdutos}>
                    {products.map((product: any) => (
                        <div key={product.id} className={styles.divProduto}>
                            <div className={styles.produto}>
                                <p style={{ fontWeight: 'bold'}}>Produto:</p>
                                <p style={{ marginLeft: '10px' }}>{product.nome}</p>
                            </div>
                            <div className={styles.produto}>
                                <p style={{ fontWeight: 'bold' }}>Marca:</p>
                                <p style={{ marginLeft: '10px' }}>{product.marca}</p>
                            </div>
                            <div className={styles.produto}>
                                <p style={{ fontWeight: 'bold' }}>Preço:</p>
                                <p style={{ marginLeft: '10px' }}>{product.preco}</p>
                            </div>
                            <div className={styles.produto}>
                                <p style={{ fontWeight: 'bold' }}>Validade:</p>
                                <p style={{ marginLeft: '10px' }}>{formatValidityDate(product.data_validade)}</p>
                            </div>
                            <div className={styles.produto}>
                                <p style={{ fontWeight: 'bold' }}>Descrição:</p>
                                <p style={{ marginLeft: '10px' }}>{product.descricao}</p>
                            </div>
                            <button className={styles.button} onClick={() => addCarrinho(product.nome, product.marca, product.preco, product.data_validade, product.descricao)}>Add</button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Produtos;
