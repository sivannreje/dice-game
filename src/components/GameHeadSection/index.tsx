import React from "react";
import {WinnerAnnouncement} from "./WinnerAnnouncement";
import './index.css'

type GameConfigSectionProps = {
    targetScore: number | undefined;
    setTargetScore: (targetScore: number) => void;
    onStartGame: () => void;
    winner?: number
}

export function GameHeadSection({targetScore, setTargetScore, onStartGame, winner}: GameConfigSectionProps) {
    return (<>
        <h1>Dice Game</h1>
        <WinnerAnnouncement winner={winner}/>
        <div>
            <label>Set target score:</label>
            <input
                type="number"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                placeholder="Enter target score"
            />
            <button className='button' onClick={onStartGame}>Start A New Game</button>
        </div>
    </>)
}