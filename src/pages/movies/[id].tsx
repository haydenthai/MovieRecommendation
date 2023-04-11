import { useRouter } from "next/router";
import * as React from "react";
import Image from "next/image";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovieRecommendationPageProps {
  movies: Movie[]
}
// create the interface based on this:
// {
//   "adult": false,
//   "backdrop_path": "/axSaeKvV5xF3zGYwXaSF8rUxaO1.jpg",
//   "id": 183392,
//   "title": "Capturing Avatar",
//   "original_language": "en",
//   "original_title": "Capturing Avatar",
//   "overview": "Capturing Avatar is a feature length behind-the-scenes documentary about the making of Avatar. It uses footage from the film's development, as well as stock footage from as far back as the production of Titanic in 1995. Also included are numerous interviews with cast, artists, and other crew members. The documentary was released as a bonus feature on the extended collector's edition of Avatar.",
//   "poster_path": "/26SMEXJl3978dn2svWBSqHbLl5U.jpg",
//   "media_type": "movie",
//   "genre_ids": [
//       99
//   ],
//   "popularity": 80.933,
//   "release_date": "2010-11-16",
//   "video": false,
//   "vote_average": 7.848,
//   "vote_count": 56
// }

const MovieCard = ({ movie }:{movie:Movie}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
      <div className="relative h-80">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="absolute h-full w-full object-cover"
          alt={movie.title}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-700 mb-4">{movie.overview}</p>
        <p className="text-sm font-bold text-gray-700">
          Release date: {movie.release_date}
        </p>
      </div>
    </div>
  );
};

const MovieRecommendationPage: React.FunctionComponent<
  IMovieRecommendationPageProps
> = ({movies}) => {
  console.log(movies)

  return (
    <>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    </>
  );
};

export default MovieRecommendationPage;

const MOVIE_API = "https://api.themoviedb.org/3";
export const getServerSideProps = async (context: { params: { id: any; }; }) => {
  const movieID = context.params.id; 
  const res = await fetch(
    `${MOVIE_API}/movie/${movieID}/recommendations?api_key=14fad36255235038af5b7ed6d9e50a2d&language=en-US&page=1`
  );
  
// https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
  const data = await res.json();
  return {
    props: {
      movies: data.results,
    },
  };
};
