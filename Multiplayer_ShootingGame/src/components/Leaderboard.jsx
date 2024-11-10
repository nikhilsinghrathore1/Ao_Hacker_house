import React, { useEffect, useRef } from 'react';
import { usePlayersList } from "playroomkit";
import { message, createDataItemSigner } from "@permaweb/aoconnect";

export const Leaderboard = () => {
  const players = usePlayersList(true);
  const prevPlayersRef = useRef([]);

  useEffect(() => {
    const prevPlayers = prevPlayersRef.current;

    players.forEach((player) => {
      const prevPlayer = prevPlayers.find(p => p.id === player.id);

      if (prevPlayer) {
        if (player.state.kills !== prevPlayer.state.kills) {
          Killed();
        }
        if (player.state.deaths !== prevPlayer.state.deaths) {
          Death();
        }
      }
    });

    // Update the ref with the current players
    prevPlayersRef.current = players;
  }, [players]);

  const Killed = async () => {
    // The only 2 mandatory parameters here are process and signer
    await message({
      process: "E79553cfortLrAzKv122LDUt-1YfVtSUw76kdi8FEjA",
      tags: [
        { name: "Action", value: "Kill" },
      ],
      signer: createDataItemSigner(globalThis.arweaveWallet),
    })
      .then(console.log)
      .catch(console.error);
  }

  const Death = async () => {
    await message({
      process: "E79553cfortLrAzKv122LDUt-1YfVtSUw76kdi8FEjA",
      tags: [
        { name: "Action", value: "Death" },
      ],
      signer: createDataItemSigner(globalThis.arweaveWallet),
    })
      .then(console.log)
      .catch(console.error);
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 p-4 flex z-10 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className={`bg-white bg-opacity-60 backdrop-blur-sm flex items-center rounded-lg gap-2 p-2 min-w-[140px]`}
          >
            <img
              src={player.state.profile?.photo || ""}
              className="w-10 h-10 border-2 rounded-full"
              style={{
                borderColor: player.state.profile?.color,
              }}
            />
            <div className="flex-grow">
              <h2 className={`font-bold text-sm`}>
                {player.state.profile?.name}
              </h2>
              <div className="flex text-sm items-center gap-4">
                <p>🔫 {player.state.kills}</p>
                <p>💀 {player.state.deaths}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="fixed top-4 right-4 z-10 text-white"
        onClick={() => {
          // toggle fullscreen
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </>
  );
};
