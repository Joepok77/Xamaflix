import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Validation
    if (title.trim() === '') {
      alert('Veuillez entrer une tâche');
      return;
    }

    setIsSubmitting(true);
    await onAdd(title);
    setTitle(''); // Réinitialiser le champ
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Ajouter une nouvelle tâche..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          className="btn btn-danger"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? '...' : '+ Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
