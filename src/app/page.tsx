import MediaCard from "@/components/card-media";
import MovieCarousel from "@/components/carousel-movie";
import CardGrid from "@/components/card-grid";
import { movieDb } from "@/lib/utils";
import {
  PopularMoviesResponse,
  MovieResult,
  PopularMoviesRequest,
  MovieNowPlayingResponse,
  TopRatedMoviesResponse,
} from "moviedb-promise";
import { AxiosRequestConfig } from "axios";

export default async function Home() {
  const params: PopularMoviesRequest = {
    page: 1,
    language: "en",
    region: "US",
  };

  const axiosConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const popularMovies: PopularMoviesResponse = await movieDb.moviePopular(
    params,
    axiosConfig
  );
  const nowPlaying: MovieNowPlayingResponse = await movieDb.movieNowPlaying(
    params,
    axiosConfig
  );
  const topRated: TopRatedMoviesResponse = await movieDb.movieTopRated(
    params,
    axiosConfig
  );

  const allMovies: { title: string; collection: MovieResult[] }[] = [
    {
      title: "Popular Movies",
      collection: popularMovies.results ?? [],
    },
    {
      title: "Now Playing Movies",
      collection: nowPlaying.results ?? [],
    },
    {
      title: "Top Rated Movies",
      collection: topRated.results ?? [],
    },
  ];

  return (
    <main className="space-y-10">
      <MovieCarousel />
      {allMovies.map((movieCollection) => {
        return (
          <CardGrid title={movieCollection.title} key={movieCollection.title}>
            {movieCollection?.collection?.length > 0 ? (
              movieCollection?.collection?.map((movie: MovieResult) => (
                <MediaCard
                  id={movie.id ?? 0}
                  key={movie.id ?? 0}
                  title={movie.title ?? "Untitled"}
                  posterPath={movie.poster_path ?? ""}
                  releaseDate={movie.release_date ?? "Unknown"}
                  voteAverage={movie.vote_average ?? 0}
                  mediaType="movie"
                />
              ))
            ) : (
              <h1
                className="text-center py-10 text-muted-foreground"
                key={movieCollection.title}
              >
                {movieCollection.title} is not available!
              </h1>
            )}
          </CardGrid>
        );
      })}
    </main>
  );
}
