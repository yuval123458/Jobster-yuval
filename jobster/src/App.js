import Landing from "./pages/Landing";
import Register from "./components/Register";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./dashboard/SharedLayout";
import AddJob from "./dashboard/AddJob";
import AllJobs from "./dashboard/AllJobs";
import Profile from "./dashboard/Profile";
import Stats from "./dashboard/Stats";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Stats />} />
        <Route path="all-jobs" element={<AllJobs />} />
        <Route path="add-jobs" element={<AddJob />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/landing" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
