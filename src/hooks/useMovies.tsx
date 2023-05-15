import React from 'react';
import { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';


interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    top_rated: Movie[];
    upcoming: Movie[];
}



export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        top_rated: [],
        upcoming: [],
    })


    // const [peliculasEnCine, setPeliculasEnCine] = useState<Movie[]>([



    const getMovies = async () => {

        const now_playing = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        const popular = movieDB.get<MovieDBMoviesResponse>('/popular');
        const top_rated = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        const upcomingconst = movieDB.get<MovieDBMoviesResponse>('/upcoming');

        const response = await Promise.all([now_playing, popular, top_rated, upcomingconst]);

        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            top_rated: response[2].data.results,
            upcoming: response[3].data.results,
        })

        setIsLoading(false)

    }


    useEffect(() => {
        //Peliculas now playing
        getMovies();
    }, [])


    return {
        ...moviesState,
        isLoading
    }


}
