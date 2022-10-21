import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import NumberContainer from '../components/game/NumberContainer'
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Boundaries from '../constants/boundaries'

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) return generateRandomBetween(min, max, exclude)
    else return rndNum
}

const GameScreen = ({ userNumber, onGameOver }) => {
    let { minBoundary, maxBoundary } = Boundaries
    const initialGuess = generateRandomBetween(
        minBoundary,
        maxBoundary,
        userNumber,
    );
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    useEffect(() => {
        if (currentGuess === userNumber) onGameOver()
    }, [currentGuess, userNumber, onGameOver]);

    const nextGuessHandler = (direction) => {
        // direction => 'lower', 'greater'
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' },
            ])
            return
        }

        if (direction === 'lower') maxBoundary = currentGuess
        else minBoundary = currentGuess + 1

        const newRndNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );
        setCurrentGuess(newRndNumber)
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    )
}
export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
})