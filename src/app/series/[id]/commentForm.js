'use client'
import { useState } from 'react';

export default function CommentForm() {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (e) => {
        this.style.setProperty('--value', parseInt(e.target.value));
        setRating(parseInt(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission, e.g. send comment and rating to the server
        console.log('Comment:', comment);
        console.log('Rating:', rating);
        // Reset form fields
        setComment('');
        setRating(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="comment">Comment:</label>
                <textarea id="comment" value={comment} onChange={handleCommentChange} />
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input
                    type="range"
                    id="rating"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={handleRatingChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};