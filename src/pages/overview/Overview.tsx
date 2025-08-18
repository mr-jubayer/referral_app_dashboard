import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

function Overview() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/states`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data.data);
        // console.log(res);
      } catch (err) {
        console.log(err?.response);

        if (!err?.response?.data?.success) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Statistics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Deposits" value={stats.totalDeposits} />
        <StatCard title="Total Withdrawals" value={stats.totalWithdrawals} />
        <StatCard
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Overview;
