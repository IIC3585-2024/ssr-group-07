'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchSeries, fetchComments, addComment } from '@/lib/db/series';
import { useAuth } from '../../context/auth';

export default function SeriesPage() {
    const { currentUser } = useAuth();
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSeries(id).then((series) => {
            if (series.length === 0) {
                setLoading(false);
                return;
            }
            setSeries(series[0]);
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        fetchComments(id).then(setComments);
    }, [id]);

    const createComment = async () => {
        await addComment(id, comment, rating, currentUser.name, currentUser.email);
        setComment("");
        setRating(0);
        fetchComments(id).then(setComments);
        
        fetchSeries(id).then((series) => {
            if (series.length === 0) {
                setLoading(false);
                return;
            }
            setSeries(series[0]);
            setLoading(false);
        });
    }

    return (
        <main>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {series.length === 0 ? (
                        <p>Series not found</p>
                    ) : (
                        <div>
                            <h1>{series.title}</h1>
                            <p>{series.description}</p>
                            <p>Rating: {series.rating}</p>
                            <p>Rating Count: {series.rating_count}</p>
                            <p>Genres: {series.genres}</p>
                            <h2>Comments</h2>
                            <ul>
                                {comments && comments.map((comment, index) => (
                                    <li key={index}>
                                        <p>{comment.comment}</p>
                                        <p>Rating: {comment.rating}</p>
                                        <p>By: {comment.username}</p>
                                    </li>
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
                        </div>
                    )}
                </>
            )}
        </main>
    );
}