import styles from './seriesCard.module.css'

export default function SeriesCard({ series, onClick }) {
    return (
        <div className={styles["series-card"]} onClick={onClick} style={{ cursor: "pointer" }}>
            <img className={styles["cover"]} src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} />
            <h3 className='margin-5'>{series.title}</h3>
            <p>{series.genres}</p>
            {series.rating_count > 0 && (
                <div className='margin-5'>
                    <p>Rating: {series.rating}</p>
                    <p>Rating Count: {series.rating_count}</p>
                </div>
            )}
        </div>
    );
}