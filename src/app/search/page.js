'use client'
import { useState } from "react";
import { search } from "@/lib/db/search";

export default function SearchPage() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [service, setService] = useState("");
    const [rating, setRating] = useState("");
    const [results, setResults] = useState([]);

    const clientSearch = () => {
        search(title, genre, service, rating).then(setResults);
    }

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={e => setGenre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Service"
                value={service}
                onChange={e => setService(e.target.value)}
            />
            <input
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={e => setRating(e.target.value)}
            />
            <button onClick={clientSearch}>Search</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.title} - {result.genre} - {result.service}</li>
                ))}
            </ul>
        </div>
    );
}