import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from './AddTaskForm.module.css';
import axios from "axios";

function AddTaskForm ({ onClose, onTaskAdded }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/tasks/add", {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setTitle("");
    setDescription("");
    onTaskAdded && onTaskAdded();
    onClose();
  };



  return (
    <>
    <div className={styles.overlay}>
    <div className={styles.modal}>
      <h2 className={styles.title}>Agregar Nueva Tarea</h2>
      <button className={styles.close} onClick={onClose}>×</button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  </div>
  </>
)}

export default AddTaskForm;