// Page Todos pour Xamaflix
import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); 

  const handleAdd = async (title) => {
    const newTodo = await addTodo(title);

    if (newTodo) {
      // Générer un ID unique local (pour éviter les conflits avec JSONPlaceholder)
      const uniqueId = Date.now() + Math.random();
      const todoWithUniqueId = { ...newTodo, id: uniqueId };

      // Ajouter au début de la liste
      setTodos([todoWithUniqueId, ...todos]);
    }
  };

  // Basculer le statut d'un todo
  const handleToggle = async (id) => {
    
    const todo = todos.find(t => t.id === id);

    // Mettre à jour via l'API
    await updateTodo(id, !todo.completed);

    // Mettre à jour le state local
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Supprimer un todo
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      const success = await deleteTodo(id);

      if (success) {
        setTodos(todos.filter(t => t.id !== id));
      }
    }
  };

  // Filtrer les todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; 
  });

  // Statistiques
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  if (loading) {
    return (
      <div style={{ backgroundColor: '#141414', minHeight: '100vh', paddingTop: '50px' }}>
        <div className="text-center mt-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', paddingTop: '20px' }}>
      <div className="container">
        <h1 className="mb-4 text-white">✅ Mes Tâches</h1>

        {/* Statistiques */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center bg-dark text-white border-secondary">
              <div className="card-body">
                <h5 className="card-title display-4">{totalTodos}</h5>
                <p className="card-text text-muted">Total</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title display-4">{activeTodos}</h5>
                <p className="card-text">En cours</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center bg-success text-white">
              <div className="card-body">
                <h5 className="card-title display-4">{completedTodos}</h5>
                <p className="card-text">Terminées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <TodoForm onAdd={handleAdd} />

        {/* Filtres */}
        <div className="btn-group mb-3" role="group">
          <button
            className={`btn ${filter === 'all' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('all')}
          >
            Toutes ({totalTodos})
          </button>
          <button
            className={`btn ${filter === 'active' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('active')}
          >
            En cours ({activeTodos})
          </button>
          <button
            className={`btn ${filter === 'completed' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('completed')}
          >
            Terminées ({completedTodos})
          </button>
        </div>

        {/* Liste des todos */}
        {filteredTodos.length === 0 ? (
          <div className="alert alert-info">
            Aucune tâche à afficher. {filter !== 'all' && 'Essayez un autre filtre.'}
          </div>
        ) : (
          <ul className="list-group">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todos;
