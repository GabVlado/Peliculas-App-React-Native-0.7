import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import movieDB from '../api/movieDB';
import { MovieDBNowPlaying } from '../interfaces/movieInterface';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { MoviesCarousel } from '../components/MoviesCarousel';

const HomeScreen = () => {

    const { peliculasEnCine , isLoading } = useMovies()

    //console.log(peliculasEnCine);

    // if(isLoading){
    //     return(
    //         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //             <ActivityIndicator size={100} color="red" />
    //         </View>
    //     )
    // }

    return (
        <View  style={{flex:1}}>
            {/* <MovieCard
                movie={peliculasEnCine[0]}
            /> */}
            <MoviesCarousel />

        </View>
    )
}

export default HomeScreen
