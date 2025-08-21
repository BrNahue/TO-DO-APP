import Task from '../../Components/Task/Task';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';

function Home() {

  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { disconnectUser } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const logOut = ()=> {
    disconnectUser();
    navigate("/");
  }

  return (
    <>
    <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.Tasks}>
                    <h2 className={styles.text}>Tareas</h2>
                    {/* Aquí podrías mapear tus tareas */}
                    
                </div>
                <div className={styles.buttons}>
                    <button className={styles.addTask}>Añadir Tarea</button>
                    <button className={styles.Logout} onClick={logOut}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home;