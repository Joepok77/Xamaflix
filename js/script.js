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

    // Créer et ajouter dans le footer comme demandé par Marc
    const countElement = document.createElement('p');
    countElement.textContent = `Catalogue : ${movieCount} films disponibles`;
    countElement.className = 'text-center text-white my-3';

    // Ajouter dans le footer
    const footer = document.querySelector('footer .container');
    if (footer) {
        footer.appendChild(countElement);
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
// EXERCICE 4 : Recherche
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#search');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const articles = document.querySelectorAll('.card.movie-card');

        articles.forEach(article => {
            // Chercher h5 ou h6 pour le titre selon la structure HTML
            const titleElement = article.querySelector('h5') || article.querySelector('h6');
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';

            if (title.includes(searchTerm)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    });
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