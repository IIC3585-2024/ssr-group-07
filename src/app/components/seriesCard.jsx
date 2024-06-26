import Image from 'next/image';
import styles from './seriesCard.module.css'

export default function SeriesCard({ series, onClick }) {
    return (
        <div className={styles["series-card"]} onClick={onClick} style={{ cursor: "pointer" }}>
            <Image className={styles["cover"]} src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} width={240} height={360} alt={`${series.title} cover`} />
            <h3 className='margin-5'>{series.title}</h3>
            <p>{series.genres}</p>
            {series.rating_count > 0 && (
                <div className='margin-5'>
                    <p>Rating: {series.rating.toFixed(1)}</p>
                    <p>Rating Count: {series.rating_count}</p>
                </div>
            )}
        </div>
    );
}