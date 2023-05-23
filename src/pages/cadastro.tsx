import React, { useState } from 'react';
import styles from '../styles/pages/cadastro.module.scss';
import { registerUserAPI } from '@/services/register_user/register_user_api';
import { useRouter } from 'next/router';

interface CadastroProps {
    
}

const Cadastro: React.FC<CadastroProps> = () => {
    const [spanError, setSpanError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const router = useRouter();

    function definingName(name: string) {
        setName(name);
    }
    function definingEmail(email: string) {
        setEmail(email);
    }
    function definingUser(user: string) {
        setUser(user);
    }
    function definingPassword1(password1: string) {
        setPassword1(password1);
    }
    function definingPassword2(password2: string) {
        setPassword2(password2);
    }

    async function registerUser(name: string, email: string, user: string, password1: string, password2: string) {
        if (name === '') {
            setSpanError('Informe um nome');
        }else if (email === '') {
            setSpanError('Informe um email');
        }else if(user === '') {
            setSpanError('Informe um usuário');
        }else if (password1 === '') {
            setSpanError('Informe uma senha');
        }else if (password2 === '') {
            setSpanError('Confirme sua senha');
        }else if (password1 != password2) {
            setSpanError('As senhas devem ser iguais');
        } else {
            setSpanError('');
            const userAPI = {
                nome: name,
                email: email,
                usuario: user,
                senha: password1
            };
            try {
                const response = await registerUserAPI(userAPI);
                if (response.length !== 0) {
                    alert('Usuário cadastrado com sucesso!')
                    router.push('/login');
                }else {
                    setSpanError('Erro ao cadastrar'); 
                }
            } catch {
                setSpanError('Erro ao cadastrar');
            }
        }

    }
    
    return (
        <section className={styles.sectionCadastro}>
            <div className={styles.divCadastro}>
                <div className={styles.divH1}>
                    <h1>Cadastro</h1>
                </div>
                <div className={styles.divInputs}>
                    <p>Nome</p>
                    <input onChange={(event) => definingName(event.target.value)}></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Email</p>
                    <input onChange={(event) => definingEmail(event.target.value)}></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Usuário</p>
                    <input onChange={(event) => definingUser(event.target.value)}></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Senha</p>
                    <input onChange={(event) => definingPassword1(event.target.value)} type='password'></input>
                </div>
                <div className={styles.divInputs}>
                    <p>Confirme sua senha</p>
                    <input onChange={(event) => definingPassword2(event.target.value)} type='password'></input>
                </div>
                <p className={styles.error}>{spanError}</p>
                <button className={styles.button} onClick={() => registerUser(name, email, user, password1, password2)}>Enviar</button>
            </div>
        </section>
    );
};

export default Cadastro;