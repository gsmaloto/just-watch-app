import BadgeGenre from "@/components/badge-genre";
import { AXIOS_CONFIG } from "@/constant/request";
import { movieDb } from "@/lib/utils";
import { CreditsResponse, MovieResponse } from "moviedb-promise";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PlayIcon, StarIcon } from "lucide-react";
import BtnAction from "./components/btn-action";

type Params = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params;

  const movie: MovieResponse = await movieDb.movieInfo(id, AXIOS_CONFIG);
  const casts: CreditsResponse = await movieDb.movieCredits(id, AXIOS_CONFIG);

  return (
    <main className="relative">
      <div className="fixed top-0 left-0 w-full h-screen">
        <Image
          className="w-screen h-screen object-cover"
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title ?? "untitle"}
          width={500}
          height={750}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-2/5">
        <div className=" bg-gradient-to-t from-background/80 to-transparent  rounded-t-2xl md:rounded-t-[150px] backdrop-blur-lg mt-[66vh]">
          <div className="container relative py-6">
            {/* Movie Actions */}
            <div className="absolute -top-6 flex flex-wrap gap-2 w-full justify-center md:justify-end">
              <Button variant="outline">
                <ArrowLeftIcon className="w-4 h-4" />
                Trailer
              </Button>
              <BtnAction
                id={id}
                title={movie.title ?? ""}
                src={`https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true`}
              >
                <Button>
                  <PlayIcon fill="white" />
                  Watch Now
                </Button>
              </BtnAction>
            </div>
            {/* Movie Actions */}

            {/* Movie Info */}
            <div className="p-2 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 ">
                <h1 className="text-white text-4xl font-bold md:max-w-[50%]">
                  {movie.title}
                </h1>
                <p className="text-white text-sm">{movie.release_date}</p>
                <p className="text-white text-sm">{movie.runtime} mins</p>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon fill="yellow" className="w-4 h-4" />
                <p className="text-white text-sm">
                  {movie.vote_average?.toFixed(1)}
                </p>
                <p className="text-white text-sm">{movie.vote_count} votes</p>
              </div>
              <p className="text-white text-sm lg:max-w-[50%]">
                {movie.overview}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {movie.genres?.map((genre) => (
                  <BadgeGenre
                    key={genre.id}
                    genreId={genre.id ?? 0}
                    genreName={genre.name ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Movie Info */}

          {/* Casts */}
          <div className="container px-4 py-6 overflow-x-auto scrollbar-none">
            <h2 className="text-white text-2xl font-bold">Cast</h2>
            <div className="grid grid-flow-col auto-cols-[150px] gap-2">
              {casts.cast?.map((cast) => (
                <div key={cast.id} className="bg-secondary rounded-lg">
                  <div className="w-full h-[200px]">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      alt={cast.name ?? "untitled"}
                      width={100}
                      height={300}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-white text-sm font-semibold truncate">
                      {cast.name}
                    </p>
                    <p className="text-gray-300 text-sm">{cast.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Casts */}
        </div>
      </div>
    </main>
  );
}
