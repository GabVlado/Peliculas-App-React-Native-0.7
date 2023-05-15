import React, { useRef } from 'react';

import {

    Dimensions,
    SafeAreaView,
    StyleSheet,
    Animated
} from 'react-native';



import { useMovies } from '../hooks/useMovies';
import { Movie } from '../interfaces/movieInterface';
import { MovieCard } from './MovieCard';
import { BackDropCarousel } from './BackDropCarousel';


const { width, height } = Dimensions.get('window');
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;

const ALTURA_BACKDROP = height * 0.7;




export const MoviesCarousel = () => {

    const { nowPlaying } = useMovies();
    //console.log(peliculasEnCine[1].id);

    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={styles.container}>
            <BackDropCarousel scrollX={scrollX} />
            <Animated.FlatList

                //Animated
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}

                //FlatList
                data={nowPlaying}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: 100,
                    paddingHorizontal: ESPACIO_LATERAL,
                }}
                bounces={false}
                
                keyExtractor={(item: Movie) =>  item.id.toString()}
                renderItem={( {item, index} ) => {

                    //console.log(index);

                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,  // Elemento anterior
                        index * ANCHO_CONTENEDOR,        // Elemento actual
                        (index + 1) * ANCHO_CONTENEDOR     // Elemento siguiente
                    ]

                    const outputRange = [
                        0, -50, 0  // Donde estan ubicados los elementos anterior, actual, siguiente
                    ]

                    const scrollY = scrollX.interpolate({
                        inputRange,
                        outputRange,
                        //extrapolate: 'clamp'
                    })


                    return (
                        <MovieCard movie={item} scrollY={scrollY} />
                    )
                }}
            />
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //height: 1000,
        backgroundColor: '#ffffff',
        ustifyContent: 'center'
    }

})
