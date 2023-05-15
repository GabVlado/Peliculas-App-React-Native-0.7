import {
    View,
    FlatList,
    Image,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Animated,
    ActivityIndicator
} from 'react-native';

import {
    Canvas,
    Rect,
    LinearGradient,
    Skia,
    Shader,
    vec
} from "@shopify/react-native-skia";


import { useMovies } from '../hooks/useMovies';

const { width, height } = Dimensions.get('window');
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height ;

// console.log(height);
// console.log(ALTURA_BACKDROP);


export const BackDropCarousel = ({ scrollX }: any) => {

    const { nowPlaying , isLoading } = useMovies();

    if(isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={100} color="red" />
            </View>
        )
    }


    return (
        <View style={[{ height: ALTURA_BACKDROP, width: width, position: 'absolute', top: 0 }]}>

            {nowPlaying!.map((movie, index) => {

                const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

                const inputRange = [
                    (index - 1) * ANCHO_CONTENEDOR,  // Elemento anterior
                    index * ANCHO_CONTENEDOR,        // Elemento actual
                    (index + 1) * ANCHO_CONTENEDOR     // Elemento siguiente
                ]

                const outputRange = [
                    0, 1, 0  // Donde estan ubicados los elementos anterior, actual, siguiente
                ]

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange,
                    //extrapolate: 'clamp'
                })

                return (
                    <Animated.Image
                        source={{ uri }}
                        key={index}
                        style={[
                            {
                                height: ALTURA_BACKDROP ,
                                width: width,
                                position: 'absolute',
                                top: 0,
                                opacity: opacity
                            },
                            StyleSheet.absoluteFillObject,
                        ]}
                    />
                )
            })}
            <LinearGradientBackdrop />
        </View>
    )
};


const LinearGradientBackdrop = () => {
    return (
        <Canvas style={{ flex: 1 }} >
            <Rect x={0} y={0} width={width} height={ALTURA_BACKDROP}>
                <LinearGradient

                    start={vec(width, 0)}
                    end={vec(width, width)}
                    colors={["transparent", "#fafafa"]}
                />
            </Rect>
        </Canvas>
    );
};
