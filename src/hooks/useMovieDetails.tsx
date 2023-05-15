import React, { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetailsProps {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];

}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetailsProps>({
        isLoading: true,
        movieFull: undefined,
        cast:[]
    })




    const getMoviesDetails = async () => {
        const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = await movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        //console.log(resp.data.overview);
       const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise])

       setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
       })

    }

    useEffect(() => {
        getMoviesDetails();
    }, [])

    return {
        ...state
    }

}
