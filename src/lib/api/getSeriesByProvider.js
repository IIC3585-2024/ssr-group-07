export default async function getSeriesByProvider(provider) {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_watch_providers=${provider}&watch_region=CL&language=en-US`, options)
    const data = await response.json()
    return data.results
}