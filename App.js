import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  // Controle do quadro atual da animação do personagem
  const [frame, setFrame] = useState(0);

  // Referências de animação para cada camada do background
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateX3 = useRef(new Animated.Value(0)).current;
  const translateX4 = useRef(new Animated.Value(0)).current;
  const translateX5 = useRef(new Animated.Value(0)).current;
  const translateX6 = useRef(new Animated.Value(0)).current;
  const translateX7 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Função para animar cada camada do background duplicada para suavidade
    const animateLayer = (animation, speed) => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: -width, // Move a imagem até a largura negativa da tela
          duration: speed,
          useNativeDriver: true,
        })
      ).start();
    };

    // Velocidades diferentes para cada camada do fundo para criar o efeito parallax
    animateLayer(translateX1, 20000);
    animateLayer(translateX2, 18000);
    animateLayer(translateX3, 16000);
    animateLayer(translateX4, 14000);
    animateLayer(translateX5, 12000);
    animateLayer(translateX6, 10000);
    animateLayer(translateX7, 8000);

    // Animação do personagem
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % 10); // 10 frames na spritesheet do personagem
    }, 100); // Ajuste o tempo para controlar a velocidade da animação do personagem
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Camadas do fundo em parallax (duplicadas para suavizar a transição) */}
      <Animated.Image
        source={require('./assets/1.png')}
        style={[styles.layer, { transform: [{ translateX: translateX1 }] }]}
      />
      <Animated.Image
        source={require('./assets/1.png')}
        style={[styles.layer, { transform: [{ translateX: translateX1.interpolate({
            inputRange: [-width, 0],
            outputRange: [0, width]
          }) }] }]}
      />

      <Animated.Image
        source={require('./assets/2.png')}
        style={[styles.layer, { transform: [{ translateX: translateX2 }] }]}
      />
      <Animated.Image
        source={require('./assets/2.png')}
        style={[styles.layer, { transform: [{ translateX: translateX2.interpolate({
            inputRange: [-width, 0],
            outputRange: [0, width]
          }) }] }]}
      />

      {/* Repita o padrão acima para as camadas restantes */}
      {/* Camada 3 */}
      <Animated.Image
        source={require('./assets/3.png')}
        style={[styles.layer, { transform: [{ translateX: translateX3 }] }]}
      />
      <Animated.Image
        source={require('./assets/3.png')}
        style={[styles.layer, { transform: [{ translateX: translateX3.interpolate({
            inputRange: [-width, 0],
            outputRange: [0, width]
          }) }] }]}
      />

      {/* Camada 4 */}
      <Animated.Image
        source={require('./assets/4.png')}
        style={[styles.layer, { transform: [{ translateX: translateX4 }] }]}
      />
      <Animated.Image
        source={require('./assets/4.png')}
        style={[styles.layer, { transform: [{ translateX: translateX4.interpolate({
            inputRange: [-width, 0],
            outputRange: [0, width]
          }) }] }]}
      />

      {/* Continue para as outras camadas */}
      <Animated.Image
        source={require('./assets/5.png')}
        style={[styles.layer, { transform: [{ translateX: translateX5 }] }]}
      />
      <Animated.Image
        source={require('./assets/5.png')}
        style={[styles.layer, { transform: [{ translateX: translateX5.interpolate({
            inputRange: [-width, 0],
            outputRange: [0, width]
          }) }] }]}
      />

      {/* Personagem animado */}
      <View style={styles.characterFrame}>
        <Image
          source={require('./assets/Walk.png')}
          style={{
            width: 1000, // Largura total da spritesheet (10 frames * 100px)
            height: 100, // Altura do quadro
            transform: [{ translateX: -frame * 100 }], // Muda para o próximo quadro
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fundo preto para combinar com o cenário
  },
  layer: {
    position: 'absolute',
    width: width, // Largura igual à tela, para não repetir
    height: '100%',
  },
  characterFrame: {
    position: 'absolute',
    bottom: 50,    // Posição do personagem na tela (ajuste conforme necessário)
    left: 50,      // Posição horizontal do personagem
    width: 100,    // Largura de um quadro do personagem
    height: 100,   // Altura de um quadro do personagem
    overflow: 'hidden',
  },
});
