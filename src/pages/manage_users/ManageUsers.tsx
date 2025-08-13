import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODljMjNjMjIzY2FmMzk2ZjI0YzMzYjEiLCJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlhdCI6MTc1NTA2MzIzNSwiZXhwIjoxNzU1MTQ5NjM1fQ.Se8R4obGN5B3KL5sy_LpgkRC2VGtZfKviwBjU0htCcw",
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data.data.users);
    };

    getUsers();
  }, []);

  console.log(users);

  return (
    <div className="min-h-screen  p-2">
      <SearchBox />

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table users={users} />
        </div>
      </div>
    </div>
  );
}
