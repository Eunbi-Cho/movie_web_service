import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../components/Movie.module.css";
import style from "./Home.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setDetails(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <img src={details.large_cover_image} className={styles.detail_img} />
          <div className={styles.details}>
            <h2 className={styles.detail_title}>{details.title_long}</h2>
            <h4>
              Rating: {details.rating} / Runtime: {details.runtime} minutes
            </h4>
            <hr></hr>
            <p className={styles.detail_summary}>{details.description_full}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
