import { Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/Landing";
import Meeting from "@/pages/Meeting";
import MeetingDetail from "@/pages/MeetingDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/meeting/:id" element={<MeetingDetail />} />
    </Routes>
  );
}
