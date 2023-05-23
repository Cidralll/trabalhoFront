import React, { useState } from 'react';
import styles from '../styles/pages/login.module.scss';
import Link from 'next/link';
import { login } from '@/services/login/login';
import { useRouter } from 'next/router';

interface loginProps {
    
}

const Login: React.FC<loginProps> = () => {
    const [spanError, setSpanError] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    function definingUser(user: string) {
        setUser(user);
    }
    function definingPassword(password: string) {
        setPassword(password);
    }

    async function loginUser(user: string, password: string) {
        if (user === '') {
            setSpanError('Informe usuário');
        }else if (password == ''){
            setSpanError('Informe a senha')
        }else {
            setSpanError('');
            const payload = {
                usuario: user,
                senha: password,
            };
            try {
                const response = await login(payload);
                if (response.length !== 0) {
                    router.push('/produtos');
                }else {
                    setSpanError('Usuário e/ou senha errados'); 
                }
            } catch {
                setSpanError('Usuário e/ou senha errados');
            }
        }
    }
    return (
        <section className={styles.sectionLogin}>
            <div className={styles.divLogin}>
                <div className={styles.divH1}>
                    <h1>Login</h1>
                </div>
                <div className={styles.divUser}>
                    <p>Usuário</p>
                    <input onChange={(event) => definingUser(event.target.value)}></input>
                </div>
                <div className={styles.divPassword}>
                    <p>Senha</p>
                    <input onChange={(event) => definingPassword(event.target.value)} type='password'></input>
                </div>
                <p className={styles.error}>{spanError}</p>
                <button className={styles.button} onClick={() => loginUser(user, password)}>Entrar</button>
                <Link href='/cadastro'><p className={styles.link}>Fazer cadastro</p></Link>
                
            </div>
        </section>
    );
};

export default Login;