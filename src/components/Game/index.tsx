import React, { useState } from 'react';
import {Player} from "../Player";
import {GameHeadSection} from "../GameHeadSection";
import {Dice} from "../Dice";
import './index.css';

export function Game() {

        const [targetScore, setTargetScore] = useState<number | undefined>();
        const [player1Score, setPlayer1Score] = useState(0);
        const [player2Score, setPlayer2Score] = useState(0);
        const [currentPlayer, setCurrentPlayer] = useState(1);
        const [dice, setDice] = useState([1, 1]);
        const [isGameActive, setIsGameActive] = useState(false);
        const [winner, setWinner] = useState<number | undefined>();

        const rollDice = () => {
            if (!isGameActive) return;

            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            setDice([dice1, dice2]);

            let newScore = dice1 + dice2;
            if (dice1 === 6 && dice2 === 6) {
                newScore = 0;
            }

            if (currentPlayer === 1) {
                const updatedScore = dice1 === 6 && dice2 === 6 ? 0 : player1Score + newScore;
                if (updatedScore >= Number(targetScore)) {
                    setIsGameActive(false);
                   setWinner(1)
                }
                setPlayer1Score(updatedScore);
            } else {
                const updatedScore = dice1 === 6 && dice2 === 6 ? 0 : player2Score + newScore;
                if (updatedScore >= Number(targetScore)) {
                   setIsGameActive(false);
                    alert('Player 2 wins!');
                }
                setPlayer2Score(updatedScore);
            }
        };

        const passTurn = () => {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        };

        const resetGame = () => {
            setPlayer1Score(0);
            setPlayer2Score(0);
            setCurrentPlayer(1);
            setDice([1,1])
        };

        const startGame = () => {
            if (targetScore) {
                setIsGameActive(true);
            } else {
                alert('Please set a target score before starting the game.');
            }
            resetGame()
        };

        return (
            <div className="game-container">
            <GameHeadSection
                targetScore={targetScore}
                setTargetScore={setTargetScore}
                onStartGame={startGame}
                winner={winner}
                isGameActive={isGameActive}/>

                    <div className="game-area">
                        <Player
                            playerNumber={1}
                            isGameActive={isGameActive}
                            isCurrentPlayer={currentPlayer === 1}
                            totalScore={player1Score}
                            dice={dice} />

                        <div className="control-area">
                            <Dice dice={dice} onRoll={rollDice} />
                            <button className="button" onClick={passTurn}>Pass Turn</button>
                        </div>

                        <Player
                            playerNumber={2}
                            isGameActive={isGameActive}
                            isCurrentPlayer={currentPlayer === 2}
                            totalScore={player2Score}
                            dice={dice} />
                    </div>
            </div>
        );
    }