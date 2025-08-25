import styles from './Task.module.css';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

function Task({ task, onTaskUpdated }) {

  const { token } = useContext(UserContext);

  const handleTaskCompletion = async (taskId) => {
    console.log(`Completing task ${taskId}`);
    try {
      await axios.put(`http://localhost:3000/tasks/update/${taskId}`,{
        title: task.title,
        description: task.description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onTaskUpdated && onTaskUpdated();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  let borderColor = 'white';

  if (task.completed) {
    borderColor = 'green';
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onTaskUpdated && onTaskUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.taskContainer} style={{ borderColor }}>
      <div className={styles.taskContent}>
            <h2 className={styles.taskTitle}>{task.title}</h2>
            <p className={styles.taskDescription}>{task.description}</p>
      </div>
            <button className={styles.taskButton} onClick={() => handleTaskDelete(task.id)}>x</button>
            <button className={styles.taskButton} onClick={() => handleTaskCompletion(task.id)}>✓</button>
    </div>
  );
}

export default Task;