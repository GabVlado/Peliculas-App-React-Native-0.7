import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigtaion/Navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';



const screenHeight = Dimensions.get('screen').height


interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> { }

const DetailsScreen = ({ navigation, route }: Props) => {



    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;


    const { isLoading, cast, movieFull } = useMovieDetails(movie.id)

    console.log({ movieFull });


    return (
        <ScrollView>

            <View style={styles.ImageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.posterImage}
                />
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            {
                isLoading
                    ? <ActivityIndicator size={35} color="#ec0505" style={{ marginTop: 20 }} />
                    : <MovieDetails  movieFull={movieFull!} cast={cast} />
            }

            {/* Boton Para Cerrar */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.pop()}
            >

                <Icon
                    name='arrow-back-outline'
                    color='#ffffff'
                    size={50}

                />

            </TouchableOpacity>

        </ScrollView>
    )
}

export default DetailsScreen;


const styles = StyleSheet.create({
    ImageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    },
    posterImage: {
        flex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20
    }
})
