interface DataProps {
  _id: string;
  username: string;
  wallet: object;
  cratedAt: Date;
}

const tableColumns = [
  "Username",
  "Main Balance",
  "Total Withdrawn",
  "Referral Income",
  "Created At",
];

function Table({ users }: { data: DataProps[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {tableColumns.map((col) => {
            return <Th label={col} />;
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <Tr user={user} />
        ))}
      </tbody>
    </table>
  );
}
export default Table;

const Tr = ({ user }) => {
  const createData = user.createdAt.slice(0, 10);
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
        {createData}
      </td>
    </tr>
  );
};

const Th = ({ label }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {label}
    </th>
  );
};
