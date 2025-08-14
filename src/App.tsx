// App.tsx
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import BetHistory from "./pages/bet_history/BetHistory";
import Deposits from "./pages/deposit/deposit";
import LoginPage from "./pages/login/Login";
import ManageGame from "./pages/manage_game/ManageGame";
import ManageUsers from "./pages/manage_users/ManageUsers";
import Overview from "./pages/overview/Overview";
import ReferralTree from "./pages/referral_tree/ReferralTree";
import RoundHistory from "./pages/round_history/RoundHistory";
import Withdrawn from "./pages/withdrawn/Withdrawn";
import AdminRoute from "./PrivetRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route element={<AdminRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="withdrawn" element={<Withdrawn />} />
            <Route path="referral-tree" element={<ReferralTree />} />
            <Route path="deposits" element={<Deposits />} />
            <Route path="manage-game" element={<ManageGame />} />
            <Route path="bet-history" element={<BetHistory />} />
            <Route path="round-history" element={<RoundHistory />} />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h2 className="text-7xl">Not Found!</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
