import React from 'react';
import { View, Text, Image, StyleSheet , Animated, Dimensions, TouchableOpacity } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigtaion/Navigation';


interface Props {
    movie: Movie;
    scrollY?: Animated.AnimatedInterpolation<string | number>;

}


const { width, height } = Dimensions.get('window');
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO = 10;


export const MovieCard = ({ movie , scrollY  }: Props) => {


    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    return (
        <TouchableOpacity
            style={{ width: ANCHO_CONTENEDOR }}
            onPress={ () => navigation.navigate('DetailsScreen' , movie) }

        >
            <Animated.View
                style={[
                    styles.imageContainer,
                    scrollY && {transform: [{ translateY: scrollY }]}

                ]}
            >
                <Image
                    source={{ uri }}
                    style={styles.posterImage}
                />
            </Animated.View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    posterImage: {
        width:  "100%",
        height: ANCHO_CONTENEDOR * 1.2,
        resizeMode: "cover",
        borderRadius: 34,
        margin: 0,
        marginBottom: 10,
    },
    imageContainer: {
        marginHorizontal: ESPACIO,
        padding: 5,
        borderRadius: 34,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    }


})
