import axios from "axios";
import { useEffect, useState } from "react";
import { Th } from "../../components/table-item";
import useAuth from "../../hooks/useAuth";

interface BetType {
  _id: string;
  roundId: number;
  userId: {
    _id: string;
    username: string;
  };
  amount: number;
  team: "red" | "green";
  type: "demo" | "real";
  createdAt: string;
}

function BetHistory() {
  const { token } = useAuth();
  const [bets, setBets] = useState<BetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/game/bets`,
          {
            headers: { Authorization: token },
          }
        );
        setBets(res.data.data.bets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBets();
  }, [token]);

  const tableColumns = [
    "Round ID",
    "User",
    "Amount",
    "Team",
    "Type",
    "Created At",
  ];

  if (loading) return <p className="p-4">Loading bet history...</p>;

  if (!bets || bets.length === 0)
    return <p className="p-4 text-gray-500 text-center">No bets found.</p>;

  return (
    <div className="min-h-screen p-2">
      <div className="bg-white shadow-sm rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableColumns.map((col) => (
                  <Th label={col} key={col} />
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bets.map((bet) => (
                <tr
                  key={bet._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{bet.roundId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bet.userId?.username || "Unknown"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{bet.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {bet.team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {bet.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(bet.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
