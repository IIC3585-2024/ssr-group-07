'use client';
import { useState } from "react";
import { firestore } from "@/lib/firebase/config";

export default function AddSeriesPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ imageUrl, setImageUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [service, setService] = useState("");

    const addSeries = async () => {
        await firestore.collection("series").add({
            title,
            description,
            genre,
            service
        });
    }

    return (
        <div>
            <h1>Add Series</h1>
            <form onSubmit={addSeries}>    
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                />
                <button type="submit">Add Series</button>
            </form>
        </div>
    );
}
