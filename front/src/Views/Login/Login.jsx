import styles from './Login.module.css';
import Logo from '../../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

function Login() {

    const navigate = useNavigate();

    const { connectUser, user } = useContext(UserContext);

    const [input, setInput] = useState({
            username: '',
            password: ''
        });
    
    const handleChange = (e) => {
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchLogin = (async () => {
            try {
                const response = await axios.post("http://localhost:3000/users/login", input);
                const {data} = response; 
                connectUser({ token: data.token, user: data.user });                   
                navigate("/home");
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                // Aquí podrías manejar el error, como mostrar un mensaje al usuario
            }
        })()
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.text}>Accede a tu cuenta</h2>
            <p className={styles.subtext}>Inicia sesión para continuar</p>
            <img src={Logo} alt="Logo" className={styles.Logo} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder=" "
                    name='username'
                    onChange={handleChange}
                    required
                />
                <label className={styles.floatingLabel}>Nombre de usuario</label>
            </div>

            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="password"
                    placeholder=" "
                    name='password'
                    onChange={handleChange}
                    required
                />
                <label className={styles.floatingLabel}>Contraseña</label>
            </div>   
            <div className={styles.buttons}>
                <Link to="/register" type="button" className={styles.register}>Crear cuenta</Link>
                <button type="submit" className={styles.login}>Ingresar</button>
            </div>
        </form>
        </div>
    </div>
  );
}

export default Login;