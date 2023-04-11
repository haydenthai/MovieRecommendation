import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "./components/Navbar";

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

const MOVIE_API = "https://api.themoviedb.org/3";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
