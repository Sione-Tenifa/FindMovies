console.log('yooooo')
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
  
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
  
    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
};

const tmdbKey = '68f0a5ec6283faa6b40761776891d250';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list'
  console.log(tmdbKey)
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`
    try {
    const response = await fetch(urlToFetch, {cache: 'no-cache'});
    if(response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres
      return genres
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  console.log('yoooooo in get movies')
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = `/discover/movie`
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  const urlToFetch =`${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
  try {
    const response = await fetch(urlToFetch, {cache: 'no-cache'});
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results
      console.log(movies)
      return movies
    }
  } catch (error) {
    console.log(error);
  }

  
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id
  const movieEndpoint = `/movie/${movieId}`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`
  try {
  const response = await fetch(urlToFetch, {cache: 'no-cache'});
  if(response.ok){
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse.results
      console.log(movieInfo)
      return movieInfo
    }
  }catch(error) {
    console.log(error);
  }
};

const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies()
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
displayMovie(info); 
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;