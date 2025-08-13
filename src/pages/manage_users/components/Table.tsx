const StatusBadge = ({ status }) => {
  const color =
    status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}
    >
      {status}
    </span>
  );
};

interface DataProps {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

function Table({ data }: { data: DataProps[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr
            key={item.id}
            className="hover:bg-gray-50 transition duration-150 ease-in-out"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{item.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{item.role}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={item.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </a>
              <a href="#" className="text-red-600 hover:text-red-900">
                Delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
