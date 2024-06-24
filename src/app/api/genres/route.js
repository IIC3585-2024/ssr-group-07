export async function GET() {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        }
    }
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list`, options)
    const data = await response.json()
    
    return Response.json(data.genres);
}

