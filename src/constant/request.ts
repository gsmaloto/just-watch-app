import { AxiosRequestConfig } from "axios";
import { PopularMoviesRequest } from "moviedb-promise";

export const PARAMS: PopularMoviesRequest = {
  page: 1,
  language: "en",
  region: "US",
};

export const AXIOS_CONFIG: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};
