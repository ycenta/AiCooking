import { useState, useContext } from 'react';
import styles from '../styles/Login.module.scss';
import Header from '../components/Header';
import { AuthContext } from '../contexts/api/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const { login } = useContext(AuthContext);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData.email+"///"+formData.password);
      try {
        await login(formData.email, formData.password);
        window.location.replace("/");
      } catch (error) {
          console.error(error);
      }
    };

  
    return (
      <>
        <Header />
        <div className={styles.Login}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className={styles.LoginForm}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} />
            
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} />
            
            <button type="submit">Login</button>
          </form>
        </div>
      </>
    );
  };

export default Login;
