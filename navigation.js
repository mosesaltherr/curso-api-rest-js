searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trending';
});

arrowBtn.addEventListener('click', () => {
    history.back();
    location.hash = '#home'
});

window.addEventListener('DomContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

function navigation() {
    console.log({location});

    if (location.hash.startsWith('#trending')) {
        trendingPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

function trendingPage() {
    console.log('trending');

    headerSection.classList.remove('header-container--long');
    headerSection.styles.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
}

function searchPage() {
    console.log('search');

    headerSection.classList.remove('header-container--long');
    headerSection.styles.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const query = location.hash.replace('#search=', '');
    getMoviesBySearch(query);
}

function moviePage() {
    console.log('movie');

    headerSection.classList.remove('header-container--long');
    headerSection.styles.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');
    const movie = movies.find((movie) => movie.id == movieId);

    getMovieById(movieId);

}

function categoryPage() {
    console.log('category');

    headerSection.classList.remove('header-container--long');
    headerSection.styles.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

}

function homePage() {
    console.log('home');

    headerSection.classList.remove('header-container--long');
    headerSection.styles.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}