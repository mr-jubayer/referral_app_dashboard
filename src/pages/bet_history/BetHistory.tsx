import axios from "axios";
import { useEffect, useState } from "react";
import { Th } from "../../components/table-item";
import useAuth from "../../hooks/useAuth";

interface UserType {
  _id: string;
  username: string;
}

interface BetType {
  _id: string;
  roundId: number;
  userId: UserType | null;
  amount: number;
  team: "red" | "green";
  type: "demo" | "real";
  createdAt: string;
}

function BetHistory() {
  const { token } = useAuth();
  const [bets, setBets] = useState<BetType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchBets = async (pageNumber: number) => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/game/bet-history`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: pageNumber, pageSize },
        }
      );

      setBets(res.data.data.bets);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error("Error fetching bet history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets(page);
  }, [page, token]);

  const tableColumns = [
    "Round ID",
    "User",
    "Amount",
    "Team",
    "Type",
    "Created At",
  ];

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

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
                    {bet.userId?.username ?? "Unknown"}
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

        {/* Pagination Controls */}
        <div className="flex justify-between p-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
