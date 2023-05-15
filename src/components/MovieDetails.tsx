import React from 'react';

import { View, Text, FlatList } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';




interface Props {
    movieFull: MovieFull;
    cast: Cast[];

}

export const MovieDetails = ({ cast, movieFull }: Props) => {

    return (
        <View>
            <View style={{ marginHorizontal: 20 }}>

                {/* Detalles */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Icon
                        name='star-outline'
                        color='grey'
                        size={30}
                    />

                    <Text> {movieFull.vote_average}</Text>

                    <Text style={{ marginLeft: 10 }}>
                        - {movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>

                <Text style={{ fontSize: 16 }}>
                    {movieFull.overview}
                </Text>

                {/* Presupuesto */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>

                <Text style={{ fontSize: 18 }}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movieFull.budget)}
                </Text>


                {/* Casting */}

            </View>
            <View style={{ marginTop: 10, marginBottom: 100, marginHorizontal: 0 }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginLeft: 20 }}>
                    Actores
                </Text>
                {/* <CastItem actor={cast[0]}/> */}
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <CastItem actor={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, height: 70 }}

                />
            </View>
            
        </View>
    )
}
