export default async function getSeriesByGenre(genre) {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    }
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre}&language=en-US`, options)
    const data = await response.json()

    // get genres
    const genres = await fetch(`https://api.themoviedb.org/3/genre/tv/list`, options)
    const genreList = await genres.json()

    // add genre names to series
    data.results.forEach(series => {
        series.genre_names = series.genre_ids.map(id => {
            const genre = genreList.genres.find(genre => genre.id === id)
            return genre.name
        }).join(", ")
    })
    
    return data.results
}