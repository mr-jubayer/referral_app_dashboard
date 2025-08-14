import axios from "axios";
import { Check, CheckCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Th } from "../../components/table-item";
import useAuth from "../../hooks/useAuth";

interface WithdrawType {
  _id: string;
  userId: string; // Make sure backend sends this
  amount: number;
  phone: string;
  method: string;
  status: "pending" | "approved" | "declined";
}

function Withdrawn() {
  const [withdrawn, setWithdrawn] = useState<WithdrawType[]>([]);
  const { token } = useAuth();

  const getWithdrawn = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/withdraw/review`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setWithdrawn(response.data.data.withdrawn || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWithdrawn();
  }, []);

  const handleApprove = async (userId: string, withdrawId: string) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/withdraw/approve`,
        { userId, withdrawId },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh list after approval
      getWithdrawn();
    } catch (err) {
      console.error(err);
    }
  };

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
                  onApprove={handleApprove}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Withdrawn;

const Tr = ({
  withdraw,
  onApprove,
}: {
  withdraw: WithdrawType;
  onApprove: (userId: string, withdrawId: string) => void;
}) => {
  if (!withdraw) return null;

  return (
    <tr
      key={withdraw._id}
      className="hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {withdraw.amount}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{withdraw.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{withdraw.method}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{withdraw.status}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {withdraw.status === "pending" && (
          <div className="flex gap-6">
            <button
              className="text-green-500 text-xl cursor-pointer"
              onClick={() => onApprove(withdraw.userId, withdraw._id)}
            >
              <Check size={22} />
            </button>
          </div>
        )}

        {withdraw.status === "approved" && (
          <div className="flex gap-6">
            <button disabled className="text-green-800 text-xl">
              <CheckCheckIcon size={22} />
            </button>
            {/* <button className="text-red-500 text-xl cursor-pointer">
              <Trash size={18} />
            </button> */}
          </div>
        )}

        {withdraw.status === "declined" && (
          <div className="flex gap-6">
            {/* <button className="text-red-500 text-xl cursor-pointer">
              <Trash size={18} />
            </button> */}
          </div>
        )}
      </td>
    </tr>
  );
};
