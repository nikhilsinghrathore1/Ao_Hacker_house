import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ConnectButton, useConnection } from "arweave-wallet-kit";
import Lodu from "./components/Lodu";
import Game from './components/Game';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

const App = () => {
  const { connected } = useConnection();
  const [showGame, setShowGame] = useState(false);
  const [selectedMap, setSelectedMap] = useState('classic'); // Set 'classic' as default

  const handleEnterRoomClick = () => {
    setShowGame(true);
  };

  return (
    <>
      {!showGame ? (
        <>
          <div
            className="h-screen w-screen p-10 px-36"
            style={{
              backgroundImage: "url('/BG.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-between w-full">
              <h1 className="text-8xl text-white mt-20 -mx-10">BoomAR</h1>
              <div className="flex gap-5 items-center -mt-20">
                {connected ? (
                  <>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button className="border border-cyan-300/60 text-cyan-300 text-xl p-7">
                          Leaderboard
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="bg-black text-cyan-500 border border-cyan-300 rounded-lg shadow-lg">
                        <div className="mx-auto w-full max-w-lg">
                          <DrawerHeader>
                            <DrawerTitle className="text-3xl font-semibold">Leaderboard</DrawerTitle>
                            <DrawerDescription className="text-lg mt-2">
                              Player Scores
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 bg-gray-800 rounded-lg">
                            <Lodu />
                          </div>
                          <DrawerFooter className="flex justify-end">
                            <Button className="bg-cyan-600 text-white hover:bg-cyan-700 transition-colors">
                              Close
                            </Button>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    <Button onClick={handleEnterRoomClick} className="border border-cyan-300/60 text-cyan-300 text-xl p-7">
                      Enter the Room
                    </Button>
                    <ConnectButton
                      style={{ border: '1px solid #0891b2', padding: '7px', fontSize: "17px", borderRadius: "8px" }}
                      profileModal={true}
                      showBalance={true}
                      showAddress={true}
                      showProfilePicture={false}
                    />
                  </>
                ) : (
                  <ConnectButton
                    style={{ border: '1px solid #0891b2', padding: '7px', fontSize: "17px", borderRadius: "8px" }}
                    profileModal={true}
                    showBalance={true}
                    showAddress={true}
                    showProfilePicture={false}
                  />
                )}
              </div>
            </div>

            {/* Map Selection */}
            <div className="flex gap-20 mt-40">
              {/* Classic Map */}
              <div>
              <p className={`text-lg text-center mb-4 transition-colors duration-300 ${selectedMap === 'classic' ? 'text-cyan-300' : 'text-white'}`}>
                  Classic
              </p>
              <div
                className={`cursor-pointer ${selectedMap === 'classic' ? 'border-cyan-500 shadow-xl shadow-cyan-500' : 'border-cyan-300'} border p-5 bg-cover bg-center bg-no-repeat aspect-[4/2] w-[40%] min-w-[500px] transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500`}
                style={{
                  backgroundImage: "url('/classic.png')",
                }}
                onClick={() => setSelectedMap('classic')}
              >
              </div>
              </div>

              {/* Beta Map */}
              <div>
              <p className={`text-lg text-center mb-4 transition-colors duration-300 ${selectedMap === 'beta' ? 'text-cyan-300' : 'text-white'}`}>
                  Beta
                </p>
              <div
                className={`cursor-pointer ${selectedMap === 'beta' ? 'border-cyan-500 shadow-xl shadow-cyan-500' : 'border-cyan-300'} border p-5 bg-cover bg-center bg-no-repeat aspect-[4/2] w-[40%] min-w-[500px] transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500`}
                style={{
                  backgroundImage: "url('/beta.png')",
                }}
                onClick={() => setSelectedMap('beta')}
              >
              </div>
              </div>
            </div>
          </div>
          </div>
        </>
      ) : (
        <Game selectedMap={selectedMap} />
      )}
    </>
  );
};

export default App;
