import React,{useRef} from 'react';

import {
    View ,
    FlatList,
    Image,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Animated } from 'react-native';


const { width , height} = Dimensions.get('window');
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR)/2;
const ESPACIO = 10;



const imagenes = [
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
    "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
    "https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
  ];


export const MoviesCarousel = () => {

    const scrollX =  useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
                //Animated
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}

                //FlatList
                data={imagenes}
                horizontal
                showsHorizontalScrollIndicator = {false}
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: 100,
                    paddingHorizontal: ESPACIO_LATERAL,
                }}
                bounces={false}

                keyExtractor={ (item) => item }
                renderItem={ ({ item, index }) => {
                    console.log(index);

                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,  // Elemento anterior
                        index *  ANCHO_CONTENEDOR,        // Elemento actual
                        (index + 1) * ANCHO_CONTENEDOR     // Elemento siguiente
                    ]

                    const outputRange = [
                       0 , -50 , 0  // Donde estan ubicados los elementos anterior, actual, siguiente
                    ]

                    const scrollY = scrollX.interpolate({
                        inputRange,
                        outputRange,
                        //extrapolate: 'clamp'
                    })


                    return (
                        <View style={{width: ANCHO_CONTENEDOR , backgroundColor: '#fdfdfd'}}>
                            <Animated.View
                                style={{
                                    marginHorizontal: ESPACIO,
                                    padding: ESPACIO,
                                    borderRadius: 34,
                                    backgroundColor: '#ffffff',
                                    alignItems: 'center',
                                    transform: [{translateY: scrollY}]
                                }}
                            >
                                <Image
                                    source={{uri: item}}
                                    style={styles.posterImage}
                                />
                            </Animated.View>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    posterImage: {
        width: "100%",
        height: ANCHO_CONTENEDOR * 1.2,
        resizeMode: "cover",
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    }

})
