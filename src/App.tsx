import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import { SectionCards } from "./components/section-cards";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SectionCards />} />
          <Route path="/test" element={<h2>Test Page</h2>} />

          <Route path="*" element={<h2 className="text-7xl">Not Found!</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
