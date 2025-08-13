import { token } from "@/constant";
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
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data.data.users);
    };

    getUsers();
  }, []);

  return (
    <div className="min-h-screen  p-2">
      <SearchBox />

      <div className="bg-white shadow-sm rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table users={users} />
        </div>
      </div>
    </div>
  );
}
