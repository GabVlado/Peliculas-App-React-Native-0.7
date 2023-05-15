import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { MoviesCarousel } from '../components/MoviesCarousel';
import { MoviesFlatList } from '../components/MoviesFlatList';

const HomeScreen = () => {

    const { nowPlaying,top_rated, popular, upcoming,  isLoading } = useMovies()

    if(isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={100} color="red" />
            </View>
        )
    }

    return (
        <ScrollView>
            <View  style={{flex:1}}>

                <MoviesCarousel />

                <MoviesFlatList title='Populares'movies={popular}/>
                <MoviesFlatList title='Top Rated'movies={top_rated}/>
                <MoviesFlatList title='Upcomingq'movies={upcoming}/>


            </View>
        </ScrollView>
    )
}

export default HomeScreen
