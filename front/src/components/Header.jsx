import { useContext } from 'react';
import { AuthContext } from '../contexts/api/AuthContext';
import styles from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className={styles.Header}>
        <a href="/" className={styles.HeaderLogo}><img src='/src/assets/logo-icon.svg' /></a>
        <div className={styles.HeaderActions}>
            {!isAuthenticated && (
              <>
                <a href="/register" className={styles.HeaderActionsBtn}>Register</a>
                <a href="/login" className={styles.HeaderActionsBtn}>Login</a>
              </>
            )}
            {isAuthenticated && (
              <button onClick={logout} className={styles.HeaderActionsBtn}>Logout</button>
            )}
        </div>
    </header>
  );
};

export default Header;