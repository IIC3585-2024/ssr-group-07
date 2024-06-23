'use client'
import { useState } from "react";
import { search } from "@/lib/db/search";

export default function SearchPage() {
    const [text, setText] = useState("");
    const [queryField, setQueryField] = useState("title");
    const [rating, setRating] = useState("");
    const [order, setOrder] = useState("desc");
    const [errorMessage, setErrorMessage] = useState("");
    const [results, setResults] = useState([]);

    const clientSearch = () => {
        if (!text && !rating && !order) {
            setErrorMessage("Please enter a search term");
            return;
        }
        search(text, queryField, rating, order).then((res) => {
            if (res.length === 0) {
                setResults([]);
                setErrorMessage("No results found");
            } else {
                setResults(res);
                setErrorMessage("");
            }
        });
    }

    return (
        <main>
            <h1>Search</h1>
            <input
                className="input-text-field margin-5"
                type="text"
                placeholder="Search"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <select className="input-dropdown" onChange={e => setQueryField(e.target.value)}>
                <option value="title">Title</option>
                <option value="genre">Genre</option>
                <option value="service">Service</option>
            </select>
            <input
                className="input-text-field margin-5"
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={e => setRating(e.target.value)}
            />
            <select className="input-dropdown" onChange={e => setOrder(e.target.value)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
            <button className="btn margin-5" onClick={clientSearch}>Search</button>
            {errorMessage && <p>{errorMessage}</p>}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <h2>{result.title}</h2>
                        {result.rating_count > 0 && (
                            <>
                            <p>Rating: {result.rating}</p>
                            <p>Rating Count: {result.rating_count} </p>
                            </>
                        )}
                        <p>Genres: {result.genres}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}