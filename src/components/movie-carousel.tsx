"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  genres: string[];
  year: string;
  description: string;
}

const movies: Movie[] = [
  {
    id: 939243,
    title: "SILO",
    poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
    backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
    genres: ["Sci-Fi & Fantasy", "Drama"],
    year: "2023",
    description:
      "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of...",
  },
  {
    id: 539972,
    title: "Squid Game 2",
    poster_path: "/nrlfJoxP1EkBVE9pU62L287Jl4D.jpg",
    backdrop_path: "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
    genres: ["Drama", "Action & Adventure", "Mystery"],
    year: "2024",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
  },
  {
    id: 939243,
    title: "SILO",
    poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
    backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
    genres: ["Sci-Fi & Fantasy", "Drama"],
    year: "2023",
    description:
      "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of...",
  },
  {
    id: 539972,
    title: "Squid Game 2",
    poster_path: "/nrlfJoxP1EkBVE9pU62L287Jl4D.jpg",
    backdrop_path: "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
    genres: ["Drama", "Action & Adventure", "Mystery"],
    year: "2024",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
  },
  {
    id: 939243,
    title: "SILO",
    poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
    backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
    genres: ["Sci-Fi & Fantasy", "Drama"],
    year: "2023",
    description:
      "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of...",
  },
  {
    id: 539972,
    title: "Squid Game 2",
    poster_path: "/nrlfJoxP1EkBVE9pU62L287Jl4D.jpg",
    backdrop_path: "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
    genres: ["Drama", "Action & Adventure", "Mystery"],
    year: "2024",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
  },
];

export default function MovieCarousel() {
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
    <Card className="relative w-full h-[85vh] overflow-hidden bg-black">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative transition-transform duration-300"
            >
              <div className="relative h-full w-full">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient split into two parts for better control */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" /> */}
                <div className="absolute left-0 bottom-0 bg-gradient-to-t w-full h-2/3 from-black/80 to-transparent z-10" />

                <CardContent className="absolute inset-0 z-20">
                  <div className="h-full flex flex-col justify-end pl-16 pb-16 max-w-2xl">
                    <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">
                      {movie.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-6">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white"
                      >
                        4K UHD
                      </Badge>
                      {movie.genres.map((genre, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-white/80 border-white/20"
                        >
                          {genre}
                        </Badge>
                      ))}
                      <span className="text-sm text-white/60">
                        {movie.year}
                      </span>
                    </div>

                    <p className="text-lg text-white/80 mb-8 line-clamp-2">
                      {movie.description}
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
            className={`h-1 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-white"
                : "w-4 bg-white/30 hover:bg-white/50"
            }`}
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
