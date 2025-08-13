import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import { SectionCards } from "./components/section-cards";
import Deposits from "./pages/deposit/deposit";
import ManageUsers from "./pages/manage_users/ManageUsers";
import ReferralTree from "./pages/referral_tree/ReferralTree";
import Withdrawn from "./pages/withdrawn/Withdrawn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SectionCards />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/withdrawn" element={<Withdrawn />} />
          <Route path="/referral-tree" element={<ReferralTree />} />
          <Route path="/deposits" element={<Deposits />} />

          <Route path="*" element={<h2 className="text-7xl">Not Found!</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
