const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': 'es-ES',
    }
});

// Utils

function createMovies (movies, container) {
    container.innerHTML = '';

    movies.forEach((movie) => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path
        );

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
};

function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach((category) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id'+  category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//Lamados a la API

async function getTrendingMoviesPreview() {
    const res = await api(
        `trending/movie/week`
    );

    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
};

async function getMoviesByCategory() {
    const res = await api(
        `genres/movie/list?`
    );

    const movies = data.results;

    createCategories(categories, categoriesPreviewList);
};

async function getMoviesBySearch(query) {
    const res = await api(
        `search/movie`
    );

    const movies = data.results;

    createMovies(movies, genericSection);
};

async function getTrendingMovies() {
    const res = await api(
        `trending/movie/week`
    );

    const movies = data.results;

    createMovies(movies, genericSection);
};

async function getMovieById(id) {
    const {data: movie} = await api(
        `movie/${id}`
    );

    const movieImgUrl = 'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path;
    headerSection.styles.backgroundImage = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.71) 100%)
    ,url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
};

async function getRelatedMoviesId(id) {
    const {data} = await api(
        `movie/${id}/recommendations`
    );

    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
};