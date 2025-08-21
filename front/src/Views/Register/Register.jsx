import styles from './Register.module.css';
import Logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {

    const  navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setNewUser({
        ...newUser,
        [e.target.name]: e.target.value
        });
    };

  const handleSubmit = (event) => {
        event.preventDefault();
        const fetchRegister = (async () => {
            try {
                axios.post("http://localhost:3000/users/register", newUser);
                navigate("/");
            } catch (error) {
                console.error("Error al registrar usuario:", error);
            }
        })();
    };

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
        <div className={styles.header}>
                <h2 className={styles.text}>Crea tu cuenta</h2>
                <p className={styles.subtext}>Registrate para continuar</p>
                <img src={Logo} alt="Logo" className={styles.Logo} />
            </div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="text"
                    name='username'
                    placeholder=" "
                    onChange={handleChange}
                    required
                />
                <label className={styles.floatingLabel}>Nombre de usuario</label>
            </div>

            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="password"
                    name='password'
                    placeholder=" "
                    onChange={handleChange}
                    required
                />
                <label className={styles.floatingLabel}>Contraseña</label>
            </div>   
            <div className={styles.buttons}>
                <Link to="/" type="button" className={styles.Login}>Iniciar sesion</Link>
                <button type="submit" className={styles.register}>Crear cuenta</button>
            </div>
        </form>
        </div>
    </div>
  );
}

export default Register;    