import { useState } from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';

const Navbar = () => {
  const [cartItems, setCartItems] = useState(0);

  return (
    <nav className={styles.nav}>
        <h1 className={styles.title}>Loja Online</h1>
        <Link href={'/addProduto'} ><h1 className={styles.title}>Cadastrar produtos</h1></Link>
        <Link href='/carrinho'><img src='./carrinho.png'></img></Link>
    </nav>

  );
};

export default Navbar;