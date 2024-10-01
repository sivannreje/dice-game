import React from "react";

export function Die({ value }: {value: number}) {
    return (
        <div className={`die face-${value}`}>
            {Array(value).fill(0).map((_, i) => (
                <div key={i} className="dot" />
            ))}
        </div>
    );
};