import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Cast } from '../interfaces/creditsInterface';

interface CastItemProps {
    actor: Cast;

}

export const CastItem = ({ actor }: CastItemProps) => {

    const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

    return (
        <View style={styles.container}>
            {
                actor.profile_path &&
                (
                    <Image
                        source={{ uri }}
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                )
            }

            <View style={styles.actorInfo}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {actor.name}
                </Text>
                <Text style={{ fontSize: 18, }}>
                    {actor.character}
                </Text>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
        marginRight: 20,
        paddingRight: 15,
        marginHorizontal: 20


    },
    actorInfo: {
        marginLeft: 10,
        marginTop: 2,
    }
})
