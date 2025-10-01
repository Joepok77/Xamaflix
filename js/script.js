// ===================================
// EXERCICE 1 : Afficher/masquer sections
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les sections avec aria-labelledby
    const sections = document.querySelectorAll('section[aria-labelledby]');

    sections.forEach(section => {
        // Créer un bouton pour chaque section
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Masquer';
        toggleButton.className = 'btn btn-outline-secondary mb-3';

        // Insérer le bouton au début de la section
        section.insertBefore(toggleButton, section.firstChild);

        // Ajouter l'événement click
        toggleButton.addEventListener('click', function() {
            // Trouver le conteneur de films
            const movieContainer = section.querySelector('.row');

            if (movieContainer) {
                // Toggle la classe hidden
                movieContainer.classList.toggle('hidden');

                // Changer le texte du bouton
                if (movieContainer.classList.contains('hidden')) {
                    toggleButton.textContent = 'Afficher';
                } else {
                    toggleButton.textContent = 'Masquer';
                }
            }
        });
    });
});

// ===================================
// EXERCICE 2 : Compteur de films
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Compter tous les films (cards movie-card comme dans les consignes)
    const articles = document.querySelectorAll('.card.movie-card');
    const movieCount = articles.length;

    // Créer l'élément de comptage
    const countElement = document.createElement('p');
    countElement.textContent = `Catalogue : ${movieCount} films disponibles`;
    countElement.className = 'text-center text-white my-3';

    // Ajouter en haut de la section "Tendances actuelles"
    const tendancesSection = document.querySelector('section[aria-labelledby="trending-title"]');
    if (tendancesSection) {
        tendancesSection.insertBefore(countElement, tendancesSection.firstChild);
    }
});

// ===================================
// EXERCICE 3 : Films vus
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les cartes de films
    const articles = document.querySelectorAll('.card.movie-card');

    articles.forEach(article => {
        article.addEventListener('click', function(event) {
            // Éviter conflit avec boutons
            if (event.target.tagName === 'BUTTON') {
                return;
            }

            // Toggle classe watched
            article.classList.toggle('watched');
        });
    });
});

// ===================================
// EXERCICE 4 : Recherche avec popup
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#search');

    // Créer la popup de recherche
    const searchPopup = document.createElement('div');
    searchPopup.className = 'search-popup';
    searchPopup.innerHTML = `
        <div class="search-popup-content">
            <div class="search-popup-header">
                <button class="search-popup-back">← Retour</button>
            </div>
            <div class="search-results" id="search-results"></div>
        </div>
    `;
    document.body.appendChild(searchPopup);

    // Récupérer tous les films une seule fois
    let allMovies = [];
    const movieCards = document.querySelectorAll('.card.movie-card');

    movieCards.forEach(card => {
        const titleElement = card.querySelector('h5') || card.querySelector('h6');
        const imageElement = card.querySelector('.card-img-top');

        if (titleElement && imageElement) {
            allMovies.push({
                title: titleElement.textContent,
                image: imageElement.src,
                element: card
            });
        }
    });

    // Ouvrir la popup quand on clique sur la barre de recherche
    searchInput.addEventListener('focus', function() {
        searchPopup.style.display = 'block';
        showAllMovies();
    });

    // Recherche en temps réel depuis la barre originale
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchPopup.style.display === 'block') {
            filterMovies(searchTerm);
        }
    });

    // Bouton de fermeture
    const backButton = searchPopup.querySelector('.search-popup-back');
    backButton.addEventListener('click', closeSearchPopup);

    // Fermer avec Escape seulement (pas de clic en dehors pour permettre l'accès à la barre)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchPopup.style.display === 'block') {
            closeSearchPopup();
        }
    });

    function showAllMovies() {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '<h4 style="margin-bottom: 20px;">Tous les films disponibles :</h4>';

        allMovies.forEach(movie => {
            const movieElement = createMovieResultElement(movie);
            resultsContainer.appendChild(movieElement);
        });
    }

    function filterMovies(searchTerm) {
        const resultsContainer = document.getElementById('search-results');

        if (searchTerm === '') {
            showAllMovies();
            return;
        }

        const filteredMovies = allMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
        );

        resultsContainer.innerHTML = '';

        if (filteredMovies.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">Aucun film trouvé pour "' + searchTerm + '"</div>';
        } else {
            resultsContainer.innerHTML = '<h4 style="margin-bottom: 20px;">Résultats de recherche :</h4>';
            filteredMovies.forEach(movie => {
                const movieElement = createMovieResultElement(movie);
                resultsContainer.appendChild(movieElement);
            });
        }
    }

    function createMovieResultElement(movie) {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'search-result-item';
        movieDiv.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h6>${movie.title}</h6>
        `;

        // Cliquer sur un film dans la popup ferme la popup et scroll vers le film
        movieDiv.addEventListener('click', function() {
            closeSearchPopup();
            movie.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            movie.element.style.border = '3px solid #e50914';
            setTimeout(() => {
                movie.element.style.border = '';
            }, 2000);
        });

        return movieDiv;
    }

    function closeSearchPopup() {
        searchPopup.style.display = 'none';
        searchInput.value = ''; // Vider la barre de recherche
    }
});

// ===================================
// EXERCICE 5 : Modal
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Créer la structure HTML de la modal (exactement comme dans les consignes)
    const modalHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id="modal-body"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Fonctions de base fournies par Marc
    function openModal(title, description = '') {
        const modal = document.querySelector('#modal');
        const modalBody = document.querySelector('#modal-body');

        modalBody.innerHTML = `
            <h2>${title}</h2>
            ${description ? `<p>${description}</p>` : ''}
        `;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.querySelector('#modal');
        modal.style.display = 'none';
    }

    // Ajouter les event listeners sur les boutons "Plus d'infos" uniquement
    const infoButtons = document.querySelectorAll('button');

    infoButtons.forEach(button => {
        const buttonText = button.textContent || button.innerText || '';

        // Vérifier si c'est un bouton "Plus d'infos"
        if (buttonText.includes('Plus d\'infos') || buttonText.includes('ℹ️') || buttonText.includes('infos')) {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Empêcher le clic sur la carte

                let title = 'Film';
                let description = '';

                // Cas 1: Cartes de films classiques (.movie-card)
                const card = button.closest('.card.movie-card');
                if (card) {
                    const titleElement = card.querySelector('h5') || card.querySelector('h6');
                    title = titleElement ? titleElement.textContent : 'Film';

                    const descriptionElement = card.querySelector('.card-text');
                    description = descriptionElement ? descriptionElement.textContent : '';
                }
                // Cas 2: Carousel
                else if (button.closest('.carousel-item')) {
                    const carouselItem = button.closest('.carousel-item');
                    const titleElement = carouselItem.querySelector('h3');
                    title = titleElement ? titleElement.textContent : 'Film';

                    const descriptionElement = carouselItem.querySelector('p.text-muted');
                    description = descriptionElement ? descriptionElement.textContent : '';
                }
                // Cas 3: Section hero/film en vedette
                else if (button.closest('.hero')) {
                    const heroSection = button.closest('.hero');
                    const titleElement = heroSection.querySelector('#hero-title');
                    title = titleElement ? titleElement.textContent : 'Film en vedette';

                    const descriptionElement = heroSection.querySelector('p.lead');
                    description = descriptionElement ? descriptionElement.textContent : '';
                }

                openModal(title, description);
            });
        }
    });

    // Ajouter l'event listener sur le bouton close
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', function(event) {
        const modal = document.querySelector('#modal');
        if (event.target === modal) {
            closeModal();
        }
    });
});

// ===================================
// EXERCICE 6 : Changement de thème (Bonus)
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Créer le bouton de changement de thème
    const themeButton = document.createElement('button');
    themeButton.textContent = 'Mode sombre';
    themeButton.className = 'btn btn-outline-light me-3';

    // Ajouter le bouton dans le header
    const navbarControls = document.querySelector('.navbar .d-flex');
    if (navbarControls) {
        navbarControls.insertBefore(themeButton, navbarControls.firstChild);
    }

    // Ajouter l'événement click
    themeButton.addEventListener('click', function() {
        // Toggle de la classe .dark-theme sur <body>
        document.body.classList.toggle('dark-theme');

        // Modification conditionnelle du texte
        if (document.body.classList.contains('dark-theme')) {
            themeButton.textContent = 'Mode clair';
        } else {
            themeButton.textContent = 'Mode sombre';
        }
    });
});