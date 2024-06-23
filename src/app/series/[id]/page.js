'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchSeries, fetchComments, addComment } from '@/lib/db/series';

export default function SeriesPage() {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSeries(id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchComments(id).then(setComments);
    }, [id]);

    const addComment = async () => {
        await addComment(id, comment, rating);
        setComment("");
        setRating(0);
        fetchComments(id).then(setComments);
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>{series.title}</h1>
                    <p>{series.description}</p>
                    <h2>Comments</h2>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment.content}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Rating"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    />
                    <button onClick={createComment}>Add Comment</button>
                </>
            )}
        </div>
    );
}