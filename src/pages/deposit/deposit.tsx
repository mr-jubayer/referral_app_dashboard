/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, CheckCheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Th } from "../../components/table-item";
import useAuth from "../../hooks/useAuth";

interface DepositType {
  _id: string;
  userId: string;
  amount: number;
  transitionId: string;
  method: string;
  status: "pending" | "declined" | "approved";
}

function Deposits() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // items per page

  // ✅ Fetch deposits with pagination
  const { data, isLoading, isError } = useQuery<{
    deposits: DepositType[];
    total: number;
  }>({
    queryKey: ["deposits", page],
    queryFn: async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/deposit/review?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        deposits: response.data.data.deposits || [],
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
    keepPreviousData: true, // ✅ avoids flicker when changing pages
  });

  // ✅ Mutation for updating status
  const mutation = useMutation({
    mutationFn: async ({
      transitionId,
      status,
    }: {
      transitionId: string;
      status: string;
    }) => {
      return axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/deposit/update-status`,
        { transitionId, status },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits", page] });
    },
    onError: (err: any) => {
      console.log(err?.response);

      if (!err?.response?.data?.success) {
        localStorage.clear();
        // navigate("/login");
      }
    },
  });

  const handleChangeStatus = (transitionId: string, status: string) => {
    mutation.mutate({ transitionId, status });
  };

  const tableColumns = [
    "Amount",
    "Transition Id",
    "Method",
    "Status",
    "Actions",
  ];

  if (isLoading) return <h2 className="p-4">Loading deposits...</h2>;
  if (isError)
    return <h2 className="p-4 text-red-500">Failed to load deposits</h2>;

  const deposits = data?.deposits || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

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
              {deposits?.map((deposit) => (
                <Tr
                  key={deposit._id}
                  deposit={deposit}
                  onStatusChange={handleChangeStatus}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination Controls */}
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

export default Deposits;

const Tr = ({
  deposit,
  onStatusChange,
}: {
  deposit: DepositType;
  onStatusChange: (transitionId: string, status: string) => void;
}) => {
  if (!deposit) return null;

  return (
    <tr
      key={deposit._id}
      className="hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {deposit.amount}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{deposit.transitionId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{deposit.method}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{deposit.status}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {deposit.status === "pending" && (
          <div className="flex gap-6">
            <button
              className="text-green-500 text-xl cursor-pointer"
              onClick={() => onStatusChange(deposit.transitionId, "approved")}
            >
              <Check size={22} />
            </button>
            <button
              className="text-red-500 text-xl cursor-pointer"
              onClick={() => onStatusChange(deposit.transitionId, "declined")}
            >
              <XIcon size={22} />
            </button>
          </div>
        )}

        {deposit.status === "approved" && (
          <div className="flex gap-6">
            <button disabled className="text-green-800 text-xl">
              <CheckCheckIcon size={22} />
            </button>
          </div>
        )}

        {deposit.status === "declined" && (
          <div className="flex gap-6">
            <span className="text-red-500 text-sm font-semibold">Declined</span>
          </div>
        )}
      </td>
    </tr>
  );
};
