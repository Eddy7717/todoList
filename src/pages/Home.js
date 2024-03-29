import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil } from "@mdi/js";

import PopupConfirm from "../components/popupConfirm";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  useEffect(() => {
    // Effectué une seule fois lors du montage du composant
    axios
      .get("/api/todoList") // Assurez-vous que le chemin correspond à votre API
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des todos :", error);
      });
  }, []); // Le tableau vide en tant que deuxième paramètre signifie que cet effet ne dépend d'aucune valeur, il s'exécute une seule fois

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: newTodo,
    };
    // Effectuer une requête pour ajouter le nouveau todo à la base de données
    axios
      .post("/api/todoList", payload)
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo(""); // Effacer le champ après l'ajout
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du todo :", error);
      });
  };

  const handleDelete = (id) => {
    setDeleteTodoId(id);
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setDeleteTodoId(null);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`/api/todoList/${deleteTodoId}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== deleteTodoId);
        setTodos(updatedTodos);
        setShowPopup(false);
        setDeleteTodoId(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du todo :", error);
      });
  };

  const handleEdit = (id, text) => {
    setEditingTodoId(id);
    setUpdatedTodoText(text);
  };

  const handleUpdate = (id) => {
    const payload = {
      title: updatedTodoText,
    };
    axios
      .put(`/api/todoList/${id}`, payload)
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTodoText } : todo
        );
        setTodos(updatedTodos);
        setEditingTodoId(null);
        setUpdatedTodoText("");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du todo :", error);
      });
  };

  return (
    <>
      <div className="homepage">
        <div className="container">
          <h4>Todo list</h4>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={updatedTodoText}
                      onChange={(e) => setUpdatedTodoText(e.target.value)}
                    />
                    <button type="button" onClick={() => handleUpdate(todo.id)}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    {todo.title}
                    <button type="button" onClick={() => handleDelete(todo.id)}>
                      <Icon path={mdiDelete} size={1} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(todo.id, todo.title)}
                    >
                      <Icon path={mdiPencil} size={1} />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTodo}
              onChange={handleInputChange}
              placeholder="Ajouter un nouveau todo"
            />
            <button type="submit">Ajouter</button>
          </form>
          {showPopup && (
            <PopupConfirm
              message="Êtes-vous sûr de vouloir supprimer ce todo ?"
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
