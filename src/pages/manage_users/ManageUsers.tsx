import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Designer",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Peter Jones",
    email: "peter.jones@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 4,
    name: "Mary Johnson",
    email: "mary.j@example.com",
    role: "QA",
    status: "Active",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.b@example.com",
    role: "Developer",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Susan Davis",
    email: "susan.d@example.com",
    role: "Product Manager",
    status: "Active",
  },
];

export default function ManageUsers() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
        // {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODljMjNjMjIzY2FmMzk2ZjI0YzMzYjEiLCJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlhdCI6MTc1NTA2MzIzNSwiZXhwIjoxNzU1MTQ5NjM1fQ.Se8R4obGN5B3KL5sy_LpgkRC2VGtZfKviwBjU0htCcw",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    };

    getUsers();
  }, []);

  return (
    <div className="min-h-screen  p-2">
      <SearchBox />

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}
