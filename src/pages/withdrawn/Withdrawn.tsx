/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, CheckCheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Th } from "../../components/table-item";
import useAuth from "../../hooks/useAuth";

interface WithdrawType {
  _id: string;
  userId: string;
  amount: number;
  phone: string;
  method: string;
  status: "pending" | "approved" | "declined";
}

function Withdrawn() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ Fetch withdrawn with pagination
  const { data, isLoading, isError } = useQuery<{
    withdrawn: WithdrawType[];
    total: number;
  }>({
    queryKey: ["withdrawn", page],
    queryFn: async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/withdraw/review?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        withdrawn: response.data.data.withdrawn || [],
        total: response.data.data.total || 0,
      };
    },
    retry: false,
    onError: (err: any) => {
      if (!err?.response?.data?.success) {
        localStorage.clear();
        navigate("/login");
      }
    },
    keepPreviousData: true,
  });

  // ✅ Mutation for approving withdraw
  const mutation = useMutation({
    mutationFn: async ({
      userId,
      withdrawId,
      status,
    }: {
      userId: string;
      withdrawId: string;
      status: string;
    }) => {
      return axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/withdraw/update-status`,
        { userId, withdrawId, status },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawn", page] });
    },
    onError: (err: any) => {
      if (!err?.response?.data?.success) {
        localStorage.clear();
        navigate("/login");
      }
    },
  });

  const handleChangeStatus = (userId: string, withdrawId: string, status) => {
    mutation.mutate({ userId, withdrawId, status });
  };

  if (isLoading) return <h2 className="p-4">Loading withdrawn...</h2>;
  if (isError)
    return <h2 className="p-4 text-red-500">Failed to load withdrawn</h2>;

  const withdrawn = data?.withdrawn || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const tableColumns = ["Amount", "Phone", "Method", "Status", "Actions"];

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
              {withdrawn.map((withdraw) => (
                <Tr
                  key={withdraw._id}
                  withdraw={withdraw}
                  onStatusChange={handleChangeStatus}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination Controls if total > 15 */}
        {total > 15 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Withdrawn;

const Tr = ({
  withdraw,
  onStatusChange,
}: {
  withdraw: WithdrawType;
  onStatusChange: (userId: string, withdrawId: string) => void;
}) => {
  if (!withdraw) return null;

  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="px-6 py-4 whitespace-nowrap">{withdraw.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap">{withdraw.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">{withdraw.method}</td>
      <td className="px-6 py-4 whitespace-nowrap">{withdraw.status}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {withdraw.status === "pending" && (
          <div className="flex gap-6">
            <button
              className="text-green-500 text-xl cursor-pointer"
              onClick={() =>
                onStatusChange(withdraw.userId, withdraw._id, "approved")
              }
            >
              <Check size={22} />
            </button>

            <button
              className="text-red-500 text-xl cursor-pointer"
              onClick={() =>
                onStatusChange(withdraw.userId, withdraw._id, "declined")
              }
            >
              <XIcon size={22} />
            </button>
          </div>
        )}

        {withdraw.status === "approved" && (
          <button disabled className="text-green-800 text-xl">
            <CheckCheckIcon size={22} />
          </button>
        )}

        {withdraw.status === "declined" && (
          <span className="text-red-500 text-sm font-semibold">Declined</span>
        )}
      </td>
    </tr>
  );
};
