import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.Header}>
        <a href="/" className={styles.HeaderLogo}><img src='/src/assets/logo-icon.svg' /></a>
        <div className={styles.HeaderActions}>
            <a href="/register" className={styles.HeaderActionsBtn}>Register</a>
            <a href="/login" className={styles.HeaderActionsBtn}>Login</a>
        </div>
    </header>
  );
};

export default Header;