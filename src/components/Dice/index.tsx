import React from "react";
import {Die} from "./Die";
import "./index.css";

type DiceProps = {
    dice: number[];
    onRoll: () => void;
}

export function Dice({dice, onRoll}: DiceProps) {
    return (
        <button className="dice-container" onClick={onRoll}>
            <Die value={dice[0]} />
            <Die value={dice[1]} />
        </button>
    );
}