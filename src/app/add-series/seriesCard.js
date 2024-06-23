export default function SeriesCard({ series, onClick }) {
    return (
        <div className="series-card" onClick={onClick} style={{ cursor: "pointer" }}>
            <h2>{series.name}</h2>
            <p>{series.overview}</p>
            <p>{series.genre_names}</p>
        </div>
    );
}