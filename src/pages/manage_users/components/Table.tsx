import { Th } from "../../../components/table-item";
import type { User } from "../ManageUsers";

const tableColumns = [
  "Username",
  "Main Balance",
  "Total Withdrawn",
  "Referral Income",
  "Created At",
];

function Table({ users }: { data: User[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {tableColumns.map((col) => {
            return <Th label={col} key={col} />;
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <Tr user={user} key={user._id} />
        ))}
      </tbody>
    </table>
  );
}
export default Table;

const Tr = ({ user }: { user: User }) => {
  if (!user) {
    return;
  }

  const createDate = user?.createdAt?.slice(0, 10);
  return (
    <tr
      key={user._id}
      className="hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.username}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.wallet.mainBalance}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {user.wallet.totalWithdrawn}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {user.wallet.referralIncome}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {createDate}
      </td>
    </tr>
  );
};
