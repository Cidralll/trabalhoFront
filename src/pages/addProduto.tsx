import React, { useState } from 'react';
import styles from '../styles/pages/addProduto.module.scss';
import { registerProductAPI } from '@/services/register_product/register_product';
import { useRouter } from 'next/router';

interface AddProdutoProps {
    
}

const AddProduto: React.FC<AddProdutoProps> = () => {
    const [spanError, setSpanError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [validity, setvalidity] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const router = useRouter();

    function definingName(name: string) {
        setName(name);
    }
    function definingBrand(brand: string) {
        setBrand(brand);
    }
    function definingPrice(price: string) {
        setPrice(price);
    }
    function definingValidity(validity: string) {
        setvalidity(validity);
    }

    async function registerProduct(name: string, brand: string, price: string, validity: string, description: string) {
        if (name === '') {
            setSpanError('Informe o nome');
        }else if (brand === '') {
            setSpanError('Informe a marca');
        }else if(price === '') {
            setSpanError('Informe o preço');
        }else if (validity === '') {
            setSpanError('Informe a validade');
        }else if (description === '') {
            setSpanError('Informe a descrição');
        }else {
            setSpanError('');
            const userAPI = {
                nome: name,
                marca: brand,
                preco: parseFloat(price),
                data_validade: validity,
                descricao: description
            };
            try {
                const response = await registerProductAPI(userAPI);
                if (response.length !== 0) {
                    alert('Produto cadastrado com sucesso!')
                    router.push('/produtos');
                }else {
                    setSpanError('Erro ao cadastrar'); 
                }
            } catch {
                setSpanError('Erro ao cadastrar');
            }
        }
    }

    return (
        <section className={styles.sectionAddProduto}>
            <div className={styles.divAddProduto}>
                <div className={styles.divH1}>
                    <h1>Cadastro de produto</h1>
                </div>
                <div className={styles.divInputs}>
                    <p>Nome</p>
                    <input onChange={(event) => definingName(event.target.value)}></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Marca</p>
                    <input onChange={(event) => definingBrand(event.target.value)}></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Preço</p>
                    <input onChange={(event) => definingPrice(event.target.value)} type='number'></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Validade</p>
                    <input onChange={(event) => definingValidity(event.target.value)} type='date'></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Descrição</p>
                    <input onChange={(event) => setDescription(event.target.value)} type='text'></input>
                </div>
                <p className={styles.error}>{spanError}</p>
                <button onClick={() => registerProduct(name, brand, price, validity, description)} className={styles.button} >Enviar</button>
            </div>
        </section>
    );
};

export default AddProduto;