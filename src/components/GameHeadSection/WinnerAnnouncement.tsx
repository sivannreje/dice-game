import React from 'react';

export function WinnerAnnouncement({ winner }: { winner?: number }) {
    return (
        <div className="winner-announcement">
            {winner !== undefined && <h1>Player {winner} wins!</h1>}
        </div>
    );
}