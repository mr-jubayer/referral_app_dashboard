import { token } from "@/constant";
import axios from "axios";
import { Check, CheckCheckIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Th } from "../../components/table-item";

interface withdraw {
  _id: string;
  amount: number;
  phone: string;
  method: string;
  status: "pending" | "approved" | "cancelled";
}

function Withdrawn() {
  const [withdrawn, setWithdrawn] = useState<withdraw[]>([]);

  useEffect(() => {
    const getWithdrawn = async () => {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/withdraw/review`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      setWithdrawn(response.data.data.withdrawn);
    };

    getWithdrawn();
  }, []);

  console.log(withdrawn);

  const tableColumns = ["Amount", "Phone", "Method", "Status", "Actions"];

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
              {withdrawn.map((withdraw) => (
                <Tr withdraw={withdraw} key={withdraw._id} />
              ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Withdrawn;

const Tr = ({ withdraw }: { withdraw: withdraw }) => {
  if (!withdraw) {
    return;
  }

  // const handleApprove = async (userId, withdrawId) => {
  //   const response = await axios.patch(
  //     `${import.meta.env.VITE_BACKEND_URL}/api/v1/withdraw/approve`,
  //     {
  //       userId,
  //       withdrawId,
  //     },
  //     {
  //       headers: {
  //         Authorization: token,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  // };

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
            <button className="text-green-500 text-xl cursor-pointer ">
              <Check size={22} />
            </button>
            {/* <button className="text-red-500 text-xl cursor-pointer ">
              <XIcon size={22} />
            </button> */}
          </div>
        )}

        {withdraw.status === "approved" && (
          <div className="flex gap-6">
            <button disabled className="text-green-800 text-xl  ">
              <CheckCheckIcon size={22} />
            </button>
            <button className="text-red-500 text-xl cursor-pointer ">
              <Trash size={18} />
            </button>
          </div>
        )}

        {withdraw.status === "declined" && (
          <div className="flex gap-6">
            <button className="text-red-500 text-xl cursor-pointer ">
              <Trash size={18} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

// approve icon  <CheckCheckIcon />
