'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";
import { search } from "@/lib/db/search";
import SeriesCard from "./seriesCard";

export default function Page() {
    const [text, setText] = useState("");
    const [queryField, setQueryField] = useState("title");
    const [rating, setRating] = useState("");
    const [order, setOrder] = useState("desc");
    const [errorMessage, setErrorMessage] = useState("");
    const [results, setResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const [providers, setProviders] = useState([]);

    const clientSearch = () => {
        if (!text && !rating && !order) {
            setErrorMessage("Please enter a search term");
            return;
        }
        search(text, queryField, rating, order, genres, providers).then(res => {
            if (res.length === 0) {
                setResults([]);
                setErrorMessage("No results found");
            } else {
                setResults(res);
                setErrorMessage("");
            }
        });
    }

    useEffect(() => {
        fetch("/api/genres")
            .then(res => res.json())
            .then(data => setGenres(data));
        fetch("/api/providers")
            .then(res => res.json())
            .then(data => setProviders(data));
    }, []);

    function showSpecificSearch() {
        if (queryField === 'title') {
            return (
                <input
                className="input-text-field margin-5"
                type="text"
                placeholder="Search"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            )
        } else if (queryField === 'genre' && genres.length > 0) {
            return (
                <select className="input-dropdown" onChange={e => setText(e.target.value)}>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            )
        } else if (queryField === 'service' && providers.length > 0) {
            return (
                <select className="input-dropdown" onChange={e => setText(e.target.value)}>
                    {providers.map((provider, index) => (
                        <option key={index} value={provider.provider_id}>{provider.provider_name}</option>
                    ))}
                </select>
            )
        }
    }


    return (
        <main>
            <h1>Series Recomendation App</h1>
            <h2>Search</h2>
            {showSpecificSearch()}
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
            <div className="results-container">
                <div className="gallery">
                {results.map((result, index) => (
                    <Link href={`/series/${result.id}`}>
                        <SeriesCard 
                            key={index}
                            series={result}
                            id={result.id}
                        />
                    </Link>
                    
                ))}
                </div>
            </div>
        </main>
    );
}