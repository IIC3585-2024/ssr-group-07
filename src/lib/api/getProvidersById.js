export default async function getProviders(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers`;
    const token = import.meta.env.PUBLIC_TMDB_TOKEN
    const options = {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results.CL.flatrate;
  }