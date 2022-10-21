import { useState } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import { StatusBar } from 'expo-status-bar'
import Colors from './constants/colors'
import GameOverScreen from './screens/GameOverScreen'

const App = () => {
  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  const gameOverHandler = () => setGameIsOver(true)

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />

  if (gameIsOver && userNumber) screen = <GameOverScreen />
  
  return (
    <>
      <StatusBar style='light' />
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  )
}
export default App

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
})