"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import Image from "next/image";
import { Genre, MovieResult } from "moviedb-promise";
import BadgeGenre from "./badge-genre";
import { cn } from "@/lib/utils";

type CarouselMovieProps = {
  movies: MovieResult[];
  genreMovieList: Genre[];
};

export default function CarouselMovie(props: CarouselMovieProps) {
  const { movies, genreMovieList } = props;

  const OPTIONS: EmblaOptionsType = {
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <Card className="relative w-full h-[70vh] overflow-hidden bg-black">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {movies?.map((movie, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative transition-transform duration-300"
            >
              <div className="relative h-full w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title ?? "Untitled"}
                  width={500}
                  height={750}
                  className="w-full h-full object-cover"
                />

                {/* Gradient split into two parts for better control */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" /> */}
                <div className="absolute left-0 bottom-0 bg-gradient-to-t w-full h-2/3 from-black/80 to-transparent z-10" />

                <CardContent className="absolute inset-0 z-20">
                  <div className="flex flex-col justify-end absolute bottom-4">
                    <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                      {movie.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-6">
                      {movie?.genre_ids?.map((genreId) => {
                        const genre = genreMovieList.find(
                          (genre) => genre.id === genreId
                        );
                        return (
                          <BadgeGenre
                            key={genreId}
                            genreId={genreId}
                            genreName={genre?.name ?? ""}
                          />
                        );
                      })}
                      <span className="text-sm text-white/60">
                        {movie.release_date?.split("-")[0]}
                      </span>
                    </div>

                    <p className="text-lg text-white/80 mb-8 line-clamp-2 lg:max-w-[50%] lg:line-clamp-3">
                      {movie.overview}
                    </p>

                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        onClick={() => console.log("Watch Now clicked")}
                      >
                        <Play size={18} /> Watch Now
                      </Button>
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => console.log("More Info clicked")}
                      >
                        <Info size={18} /> More Info
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 z-30">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-300 ease-in-out",
              index === selectedIndex
                ? "w-8 bg-white"
                : "w-4 bg-white/30 hover:w-6 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </Card>
  );
}
const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
} => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
} => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    );

    return () => {
      emblaApi.off("select", () =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    };
  }, [emblaApi]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};
