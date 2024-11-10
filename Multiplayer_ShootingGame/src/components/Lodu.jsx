import React, { useEffect, useState } from 'react';
import { dryrun } from "@permaweb/aoconnect";

const Lodu = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  const getLeaderBoard = async () => {
    try {
      const result = await dryrun({
        process: 'E79553cfortLrAzKv122LDUt-1YfVtSUw76kdi8FEjA',
        data: '',
        tags: [{ name: 'Action', value: 'LeaderBoard' }]
      });

      const leaderboardData = JSON.parse(result.Messages[0].Data);

      const leaderboardArray = Object.keys(leaderboardData).map(playerId => {
        const playerStats = leaderboardData[playerId];
        const kdRatio = playerStats.deaths === 0 ? playerStats.kills : (playerStats.kills / playerStats.deaths).toFixed(2);
        return { playerId, ...playerStats, kdRatio };
      });

      const sortedLeaderboard = leaderboardArray.sort((a, b) => b.kdRatio - a.kdRatio);

      setLeaderBoard(sortedLeaderboard);
      console.log('Sorted LeaderBoard:', sortedLeaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div>
      {leaderBoard.length > 0 ? (
        <div>
          <h3>Leaderboard</h3>
          <ul>
            {leaderBoard.map(player => (
              <li key={player.playerId}>
                <strong>Player ID:</strong> {player.playerId}<br />
                <strong>Kills:</strong> {player.kills}<br />
                <strong>Deaths:</strong> {player.deaths}<br />
                <strong>KD Ratio:</strong> {player.kdRatio}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading Leaderboard...</p>
      )}
    </div>
  );
};

export default Lodu;
