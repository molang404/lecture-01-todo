function MovieCard({ poster, title, actors }) {
    return <div>
        <img src={poster} alt={"POSTER"} style={{ width: 300 }} />
        <h2>{title}</h2>
        <h6>{actors}</h6>
    </div>
}

export default MovieCard;