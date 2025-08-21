import styles from './Task.module.css';

function Task() {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.taskContent}>
            <h2 className={styles.taskTitle}>Tarea</h2>
            <p className={styles.taskDescription}>Descripción de la tarea aquí.</p>
      </div>
            <button className={styles.taskButton}>✓</button>
    </div>
  );
}

export default Task;