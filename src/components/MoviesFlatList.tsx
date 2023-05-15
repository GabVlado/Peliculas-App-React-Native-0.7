import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, ActivityIndicator, Dimensions} from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { MovieCardFlatList } from './MovieCardFlatList';
import { Movie } from '../interfaces/movieInterface';


interface Props {
	title?: string;
	movies: Movie[];
}

const { width, height } = Dimensions.get('window');
const ANCHO_CONTENEDOR = width * 0.7;


export const MoviesFlatList = ({ title, movies }: Props) => {

    const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<View style={[styles.container, { height: (title) ? 260 : 210 }]}>

			{
				title && <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10, marginLeft: 7 }}>{title}</Text>
			}
			<Animated.FlatList
				removeClippedSubviews={false}
				data={movies}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
				renderItem={({ item, index }) => {



                    return (
                        <MovieCardFlatList
                            movie={item}
                            height={200}
                            width={140}

                        />
                    )

				}}

                //initialNumToRender={5}
 				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				decelerationRate={0}
				scrollEventThrottle={16}
				bounces={false}

			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		//backgroundColor: '#ce1e1e',
		height: 260
	}
})

