import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, LogOut, Play } from "lucide-react";
import { GameButton } from "@/components/GameButton";
import { PlayerCard } from "@/components/PlayerCard";
import { ChatBox } from "@/components/ChatBox";
import { toast } from "sonner";

const MOCK_PLAYERS = [
  { id: "1", name: "Player 1", isReady: true },
  { id: "2", name: "Player 2", isReady: true },
  { id: "3", name: "Player 3", isReady: false },
  { id: "4", name: "Player 4", isReady: false },
];

const MOCK_MESSAGES = [
  { id: "1", player: "System", text: "Welcome to the room!", isSystem: true },
  { id: "2", player: "Player 1", text: "Let's play!" },
  { id: "3", player: "Player 2", text: "Ready when you are!" },
];

const Lobby = () => {
  const navigate = useNavigate();
  const [roomCode] = useState("GAME-1234");
  const [rounds, setRounds] = useState(3);
  const [drawTime, setDrawTime] = useState(60);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Room code copied!");
  };

  const handleSendMessage = (message: string) => {
    setMessages([
      ...messages,
      { id: Date.now().toString(), player: "You", text: message },
    ]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="game-card mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Room Code:</h2>
            <code className="bg-primary/20 px-4 py-2 rounded-xl font-mono font-bold text-lg">
              {roomCode}
            </code>
            <button
              onClick={copyRoomCode}
              className="p-2 hover:bg-muted rounded-xl transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-3">
            <GameButton
              variant="success"
              size="md"
              onClick={() => navigate("/game")}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </GameButton>
            <GameButton
              variant="danger"
              size="md"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Leave
            </GameButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Players Grid */}
            <div>
              <h3 className="text-xl font-bold mb-4">Players</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_PLAYERS.map((player) => (
                  <PlayerCard key={player.id} {...player} />
                ))}
              </div>
            </div>

            {/* Game Settings */}
            <div className="game-card">
              <h3 className="text-xl font-bold mb-4">Game Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">
                    Topic
                  </label>
                  <select className="input-rounded w-full">
                    <option>Animals</option>
                    <option>Food</option>
                    <option>Objects</option>
                    <option>Random</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Rounds: {rounds}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={rounds}
                    onChange={(e) => setRounds(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Draw Time: {drawTime}s
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    step="10"
                    value={drawTime}
                    onChange={(e) => setDrawTime(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="lg:col-span-1">
            <div className="h-[600px]">
              <ChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                placeholder="Chat with players..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
