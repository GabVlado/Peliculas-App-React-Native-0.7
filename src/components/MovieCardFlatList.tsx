import React, { useId } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, View, Animated } from 'react-native'
import { Movie } from '../interfaces/movieInterface';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigtaion/Navigation';




interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}


export const MovieCardFlatList = ({ movie, height = 420, width = 300 }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();


    return (

        <Pressable
            onPress={() => navigation.navigate('DetailsScreen', movie)}
            //activeOpacity={0.8}
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}

        >
            <Animated.View style={[
                styles.imageContainer,

            ]}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
            </Animated.View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
        resizeMode: "cover",
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    }
});
