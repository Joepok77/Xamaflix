function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <div className="input-group input-group-lg">
        <span className="input-group-text bg-dark text-white border-secondary">🔍</span>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Rechercher des films, séries..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            '::placeholder': {
              color: '#6c757d'
            }
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
