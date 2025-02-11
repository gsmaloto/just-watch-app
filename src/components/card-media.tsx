import React from "react";
import { PlayCircle, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CardMediaProps = {
  id: number;
  title: string;
  posterPath: string;
  mediaType: "movie" | "tv";
  releaseDate: string;
  voteAverage: number;
};

const getVoteColor = (votePercentage: number) => {
  if (votePercentage >= 70) return "bg-green-500";
  if (votePercentage >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const CardMedia: React.FC<CardMediaProps> = ({
  id,
  title,
  posterPath,
  mediaType,
  releaseDate,
  voteAverage,
}) => {
  const releaseYear = new Date(releaseDate).getFullYear();
  const votePercentage = Math.round(voteAverage * 10);

  return (
    <Link href={`/${mediaType}/${id}`} className="group relative">
      <div className="relative w-[180px] rounded-xl overflow-hidden bg-neutral-900 text-white shadow-lg">
        {/* Poster with Enhanced Hover Scale */}
        <Image
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt={title}
          width={500}
          height={750}
          className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 p-2 flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex justify-between">
            <span
              className={`${getVoteColor(
                votePercentage
              )} text-white px-2 py-1 rounded-md text-xs`}
            >
              {votePercentage}%
            </span>
            <span
              className={`
              ${mediaType === "movie" ? "bg-blue-600" : "bg-purple-600"} 
              text-white px-2 py-1 rounded-md text-xs`}
            >
              {releaseYear}
            </span>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end">
            <span className="bg-black/60 text-white px-2 py-1 rounded-md text-xs uppercase">
              {mediaType}
            </span>
            <div className="bg-black/60 rounded-full p-1.5">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Animated Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle
            className="w-16 h-16 text-white/80 hover:text-primary transition-all duration-300 
            transform -translate-y-6 group-hover:translate-y-0 
            hover:scale-125"
          />
        </div>
      </div>
    </Link>
  );
};

export default CardMedia;
