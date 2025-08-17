/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";

export interface User {
  _id: string;
  username: string;
  emails: { email: string }[];
  wallet: object;
  createdAt: string;
}

async function fetchUsers(
  search: string,
  page: number,
  limit: number,
  token: string,
  navigate: any
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
      {
        params: { search, page, limit },
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    // Ensure we always return both fields
    return {
      users: res.data?.data?.users || [],
      totalPages: res.data?.data?.totalPages || 1,
    };
  } catch (error) {
    if (!error?.response?.data?.success) {
      localStorage.clear();
      navigate("/login");
    }
    return { users: [], totalPages: 1 };
  }
}

export default function ManageUsers() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const { token } = useAuth();
  const limit = 10;

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const { data = { users: [], totalPages: 1 }, isError } = useQuery({
    queryKey: ["users", debouncedSearch, page],
    queryFn: () => fetchUsers(debouncedSearch, page, limit, token, navigate),
    keepPreviousData: true,
  });

  if (isError) {
    return <p className="p-4 text-red-500">Failed to load users.</p>;
  }

  return (
    <div className="min-h-screen p-2">
      <SearchBox
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {data.users.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No users found.</p>
      ) : (
        <>
          <div className="bg-white shadow-sm rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table users={data.users} />
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {data.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, data.totalPages))}
              disabled={page >= data.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
