import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MemoryMap from "./pages/MemoryMap"
import Toilets from "./pages/Toilets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>}/>
        <Route path="/toilets" element={<Toilets />}/>
        <Route path="/memory-map" element={<MemoryMap />}/>
      </Routes>
    </Router>
  );
}

export default App;
