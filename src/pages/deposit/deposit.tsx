import { token } from "@/constant";
import axios from "axios";
import { Check, CheckCheckIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Th } from "../../components/table-item";

interface DepositType {
  _id: string;
  amount: number;
  transitionId: string;
  method: string;
  status: "pending" | "declined" | "approved";
}

function Deposits() {
  const [deposits, setDeposits] = useState<DepositType[]>([]);

  useEffect(() => {
    const getDeposits = async () => {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/deposit/review`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);

      setDeposits(response.data.data.deposits);
    };

    getDeposits();
  }, []);

  const tableColumns = [
    "Amount",
    "Transition Id",
    "Method",
    "Status",
    "Actions",
  ];

  return (
    <div className="min-h-screen  p-2">
      <div className="bg-white shadow-sm rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableColumns.map((col) => {
                  return <Th label={col} key={col} />;
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deposits?.map((deposit) => (
                <Tr deposit={deposit} key={deposit._id} />
              ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Deposits;

const Tr = ({ deposit }: { deposit: DepositType }) => {
  if (!deposit) {
    return null;
  }

  const handleApprove = async (userId: string, depositId: string) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/deposit/approve`,
      {
        userId,
        depositId,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  };

  return (
    <tr
      key={deposit._id}
      className="hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {deposit.amount}
            </div>
          </div>
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
              onClick={() => handleApprove("USER_ID", deposit._id)}
            >
              <Check size={22} />
            </button>
          </div>
        )}

        {deposit.status === "approved" && (
          <div className="flex gap-6">
            <button disabled className="text-green-800 text-xl">
              <CheckCheckIcon size={22} />
            </button>
            <button className="text-red-500 text-xl cursor-pointer">
              <Trash size={18} />
            </button>
          </div>
        )}

        {deposit.status === "declined" && (
          <div className="flex gap-6">
            <button className="text-red-500 text-xl cursor-pointer">
              <Trash size={18} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
