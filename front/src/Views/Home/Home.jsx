import Task from '../../Components/Task/Task';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AddTaskForm from '../../Components/AddTaskForm';
import axios from 'axios';

function Home() {

  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { disconnectUser } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);

  const [tasks, setTasks] = useState([]);

  

  useEffect(() => {

    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, [token]);

  const logOut = () => {
    disconnectUser();
    navigate("/");
  }

  const handleTaskUpdated = async () => {
    const response = await axios.get("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setTasks(response.data);
  };

  return (
    <>
    <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.Tasks}>
                <h2 className={styles.text}>Tareas</h2>
                <div className={styles.Tasks}>
                    {tasks.map(task => (
                      <Task key={task.id} task={task} onTaskUpdated={handleTaskUpdated} />
                    ))}
                </div>
              </div>
              <div className={styles.buttons}>
                  <button onClick={() => setShowForm(true)}>Agregar tarea</button>
                    {showForm && (
                       <AddTaskForm
                        onClose={() => setShowForm(false)}
                        onTaskAdded={handleTaskUpdated}
                      />
                    )}
                  <button className={styles.Logout} onClick={logOut}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home;