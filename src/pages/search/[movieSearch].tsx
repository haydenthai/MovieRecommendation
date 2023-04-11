import Link from "next/link";
import * as React from "react";
import { Navbar } from "../components/Navbar";

type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface IMovieSearchProps {
  movies: Movie[];

}

const MovieSearch: React.FunctionComponent<IMovieSearchProps> = ({ movies}:IMovieSearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for movies"
            className="w-96 px-4 py-2 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-r-lg"
            href={`/search/searchTerm=${searchTerm}`}
          >
            
            Search
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                className="object-cover w-full h-64"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {movie.release_date}
                </p>
                <p className="text-sm text-gray-400 mb-4">{movie.overview}</p>
                <div className="flex justify-end">
                  <Link
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    href={`/movies/${movie.id}`}
                  >
                    Get Recommendations
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;

export async function getServerSideProps(context: any) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${context.query.movieSearch.split("=")[1]}`);
  const data = await res.json();
  const movies = data.results ? data.results : [];
  return {
    props: {
      movies: movies,
    }, // will be passed to the page component as props
  };
}
