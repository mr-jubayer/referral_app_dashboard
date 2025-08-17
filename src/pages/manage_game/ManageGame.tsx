import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function ManageGame() {
  const { token } = useAuth();
  const [isGameRunning, setIsGameRunning] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // Fetch current game status (optional, if your backend provides a status route)
  useEffect(() => {
    const fetchGameStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/status`,
          {
            headers: { Authorization: token },
          }
        );
        setIsGameRunning(res.data.data.isRunning);
      } catch (err) {
        console.error("Error fetching game status:", err);

        // if (!err?.response?.data?.success) {
        //   localStorage.clear();
        //   navigate("/login");
        // }
        setIsGameRunning(false); // fallback
      }
    };
    fetchGameStatus();
  }, [token]);

  // Start / Stop game
  const toggleGame = async () => {
    setLoading(true);
    try {
      const endpoint = isGameRunning ? "stop" : "start"; // choose route
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/${endpoint}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      setIsGameRunning(res.data.data.isRunning); // assume backend returns { isRunning: boolean }
    } catch (err) {
      console.error("Error updating game state:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isGameRunning === null) {
    return <p className="p-4">Loading game status...</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Manage Game</h2>
      <p>
        Current Status:{" "}
        <span className={isGameRunning ? "text-green-600" : "text-red-600"}>
          {isGameRunning ? "Running" : "Stopped"}
        </span>
      </p>
      <button
        onClick={toggleGame}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          isGameRunning
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Processing..." : isGameRunning ? "Stop Game" : "Start Game"}
      </button>
    </div>
  );
}

export default ManageGame;
