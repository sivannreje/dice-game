import React, { useEffect } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import {Player} from "../Player";
import {GameHeadSection} from "../GameHeadSection";
import {Dice} from "../Dice";
import './index.css';

export function Game() {

        const [targetScore, setTargetScore] = useLocalStorage<number | undefined>("targetScore");
        const [player1Score, setPlayer1Score] = useLocalStorage<number>("player1Score", 0);
        const [player2Score, setPlayer2Score] = useLocalStorage<number>("player2Score", 0);
        const [currentPlayer, setCurrentPlayer] = useLocalStorage<number>("currentPlayer", 1);
        const [dice, setDice] = useLocalStorage<number[]>("dice", [1, 1]);
        const [isGameActive, setIsGameActive] = useLocalStorage<boolean>("isGameActive", false);
        const [winner, setWinner] = useLocalStorage<number | undefined>("winner");

        useEffect(() => {
            if(isGameActive) {
                if (player1Score >= Number(targetScore)) {
                    setIsGameActive(false);
                    setWinner(1)
                }
                if (player2Score >= Number(targetScore)) {
                    setIsGameActive(false);
                    setWinner(2)
                }
            }
        }, [player1Score, player2Score, isGameActive]);

        const rollDice = () => {
            if (!isGameActive) return;

            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            setDice([dice1, dice2]);
            updatePlayerScore(dice1, dice2,
                currentPlayer === 1 ? player1Score: player2Score,
                currentPlayer === 1 ? setPlayer1Score : setPlayer2Score);
        };

        const updatePlayerScore = (dice1: number,
                                   dice2: number,
                                   playerScore: number,
                                   setPlayerScore: (score: number)=> void) => {
            if (dice1 === 6 && dice2 === 6) {
                setPlayerScore(0);
                passTurn();
                return;
            }
            const newScore = dice1 + dice2;
            setPlayerScore(playerScore + newScore);
        }

        const passTurn = () => {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        };

        const resetGame = () => {
            setPlayer1Score(0);
            setPlayer2Score(0);
            setCurrentPlayer(1);
            setDice([1,1])
            setWinner(undefined);
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
            />
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