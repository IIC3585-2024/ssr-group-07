'use client';
import { addSeries } from "@/lib/db/series";
import { useState } from "react";
import getSeriesByName from "@/lib/api/getSeriesByName";
import SeriesCard from "./seriesCard";

export default function AddSeriesPage() {
    const [title, setTitle] = useState("");
    const [ series, setSeries ] = useState([]);
    const [ selectedSeries, setSelectedSeries ] = useState(null);

    // search for series in API, then add to database
    const addSeriesDB = async () => {
        const rating = 0;
        const rating_count = 0;
        await addSeries(
            selectedSeries.id,
            selectedSeries.name,
            rating,
            rating_count,
            selectedSeries.genre_names,
            selectedSeries.poster_path
        );
    }

    // search for series in API
    const searchSeries = async () => {
        const series = await getSeriesByName(title);
        setSeries(series);
    }

    return (
        <div>
            <h1>Add Series</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button onClick={searchSeries}>Search</button>
            {selectedSeries && (
                <div>
                    <h2>{selectedSeries.title}</h2>
                    <p>{selectedSeries.description}</p>
                    <button onClick={addSeriesDB}>Add Series</button>
                </div>
            )}
            <div>
                {series.map((series, index) => (
                    <SeriesCard key={index} series={series} id={series.id} onClick={() => setSelectedSeries(series)} />
                ))}
            </div>
        </div>
    );
}
