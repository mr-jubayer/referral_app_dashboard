import axios from "axios";
import { useEffect, useState } from "react";
import { Th } from "../../components/table-item";
import useAuth from "../../hooks/useAuth";

interface RoundType {
  _id: string;
  roundId: number;
  status: "open" | "closed" | "completed";
  winner: "red" | "green" | null;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
}

function RoundHistory() {
  const { token } = useAuth();
  const [rounds, setRounds] = useState<RoundType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchRounds = async (pageNumber: number) => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/game/round-history`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: pageNumber, pageSize },
        }
      );

      setRounds(res.data.data.rounds);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error("Error fetching round history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRounds(page);
  }, [page, token]);

  const tableColumns = [
    "Round ID",
    "Status",
    "Winner",
    "Started At",
    "Ended At",
  ];

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) return <p className="p-4">Loading round history...</p>;
  if (!rounds || rounds.length === 0)
    return <p className="p-4 text-gray-500 text-center">No rounds found.</p>;

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
              {rounds.map((round) => (
                <tr
                  key={round._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {round.roundId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {round.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {round.winner || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {round.startedAt
                      ? new Date(round.startedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {round.endedAt
                      ? new Date(round.endedAt).toLocaleString()
                      : "N/A"}
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

export default RoundHistory;
