'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchSeries, fetchComments, addComment } from '@/lib/db/series';
import { useAuth } from '../../context/auth';
import getProvidersById from '@/lib/api/getProvidersById';


import styles from './page.module.css';

export default function SeriesPage() {
    const { currentUser } = useAuth();
    const { id } = useParams();
    const [series, setSeries] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        fetchSeries(id).then((series) => {
            if (!series) {
                setLoading(false);
                return;
            }
            setSeries(series);
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        fetchComments(id).then(setComments);
    }, [id]);

    useEffect(() => {
        getProvidersById(id).then(setProviders);
    }, [id]);

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating);
        const emptyStars = 5 - filledStars;
        return (
            <div>
                {Array.from({ length: filledStars }).map((_, index) => (
                    <span key={`filled-${index}`} className={styles["star"]}>★</span>
                ))}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <span key={`empty-${index}`} className={styles["star"]}>☆</span>
                ))}
            </div>
        );
    }

    const createComment = async () => {
        await addComment(id, comment, rating, currentUser.name, currentUser.email);
        setComment("");
        setRating(0);
        fetchComments(id).then(setComments);
        
        fetchSeries(id).then((series) => {
            if (!series) {
                setLoading(false);
                return;
            }
            setSeries(series);
            setLoading(false);
        });
    }

    return (
        <main>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {!series || !series.title ? (
                        <p>Series not found</p>
                    ) : (
<div className={styles["serie-detail-container"]}>
    <div className={styles.container}>
        <img className={styles.cover} src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt="book"/>
        <div>
            <h1 className={styles.title} >{series.title}</h1>
            <p>Genres: {series.genres.join(', ')}</p>
            <div className={styles["ratings-container"]}>
            <ul className={styles["ratings"]}>
                <li className={styles["rating-avg"]}>
                {renderStars(series.rating)} <span className={styles["average"]}>{series.rating.toFixed(1)}</span>
                </li>
            </ul>
            <p>{series.rating_count} Ratings</p>
            </div>
            <div className={styles["providers-section"]}>
                <h4>Watch Providers</h4>
                {providers.length > 0 ? (
                    <ul className={styles["providers-list"]}>
                        {providers.map((provider, index) => (
                            <li key={index} className={styles["provider-item"]}>
                                <img className={styles["providers-img"]} src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} alt={provider.provider_name} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No providers available</p>
                )}
            </div>
            <p className={styles["description"]}>{series.description}</p>
        </div>
    </div>
    <div className={styles["comments-section"]}>
        <h2 className={styles.title}>Comments</h2>
        
        <div className={styles["comment-form"]}>
            <input
                type="number"
                className="input-text-field margin-5"
                placeholder="Rating"
                value={rating}
                onChange={e => setRating(parseInt(e.target.value))}
            />
            <textarea
                type="text"
                className={`input-text-field margin-5 ${styles["textarea"]}`}
                placeholder="Comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button className="btn margin-5" onClick={createComment}>Add Comment</button>
        </div>

        <div className={styles["comments-container"]}>
            {comments && comments.map((comment, index) => (
                <div key={index} className={styles["comment-item"]}>
                    <div className={styles["comment-content"]}>
                        <div className={styles["comment-meta"]}>
                            <h3 className={styles["comment-by"]}>{comment.username}</h3>
                            <span className={styles["comment-rating"]}>{renderStars(comment.rating)}</span>
                        </div>
                        <p className={styles["comment-text"]}>{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
</div>

                    )}
                </>
            )}
        </main>
    );
}
