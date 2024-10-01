import React, {useEffect} from "react";
import './index.css';

type PlayerProps = {
    playerNumber: number;
    isGameActive: boolean;
    isCurrentPlayer: boolean;
    totalScore: number;
    dice: number[];
}
export function Player({isGameActive, playerNumber, isCurrentPlayer, totalScore, dice}: PlayerProps) {
    const [currentScore, setCurrentScore] = React.useState(0);

    useEffect(() => {
        if (isGameActive && isCurrentPlayer && dice.length === 2) {
            setCurrentScore(dice[0] + dice[1]);
        }
    }, [isGameActive, isCurrentPlayer, dice]);

    return (<div className={`player-box ${isGameActive && isCurrentPlayer ? 'active' : ''}`}>
        <h2>Player {playerNumber}</h2>
        <p>Score: {totalScore}</p>
        {<p>Current: {currentScore}</p>}
    </div>)
}


