export default async function getSeriesByName(name) {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    }
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${name}&language=en-US`, options)
    const data = await response.json()

    // get genres
    const genres = await fetch(`https://api.themoviedb.org/3/genre/tv/list`, options)
    const genreList = await genres.json()

    // add genre names to series
    data.results.forEach(series => {
        if (series.genre_names) {
        series.genre_names = series.genre_ids.map(id => {
            const genre = genreList.genres.find(genre => genre.id === id);
            return genre.name;
        }).join(", ")
        } else if (series.genre_ids.length > 0) {
            series.genre_ids = series.genre_ids.map(id => {
                const genre = genreList.genres.find(genre => genre.id === id);
                if (genre){
                    return genre.name;
                }
            }).join(", ")
        } else if (series.genre_ids.length === 0) {
            series.genre_names = [];
        }
    })
    
    return data.results
}
