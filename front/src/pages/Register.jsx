import { useState } from 'react';
import axios from '../axios';
import styles from '../styles/Register.module.scss';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firtName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/register', formData);
      navigate('/login');
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.Register}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className={styles.RegisterForm}>
          <label htmlFor="firstname">Firstname</label>
          <input type="text" name="firstName" onChange={handleChange} />
          
          <label htmlFor="lastname">Lastname</label>
          <input type="text" name="lastName" onChange={handleChange} />
          
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
          
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} />
          
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;