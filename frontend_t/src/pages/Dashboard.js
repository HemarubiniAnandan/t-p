import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";

    axios
      .get("http://localhost:5000/api/teachers/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTeacher(res.data.teacher);
        setClasses(res.data.classes);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleClassClick = (cls) => {
    // For now just redirect to a placeholder page
    window.location.href = `/class/${cls.id}`;
  };

  if (!teacher) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#0f1a0f] p-4 shadow-md">
        <h2 className="text-green-400 text-lg font-bold">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Teacher Greeting */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-green-300">
          Hello, {teacher.name}
        </h2>
      </div>

      {/* Classes */}
      <h2 className="px-6 text-green-400 text-xl font-semibold">My Classes</h2>
      <div className="flex flex-col gap-3 px-6 mt-3">
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => handleClassClick(cls)}
            className="bg-[#1c2b1c] hover:bg-[#263c26] p-4 rounded-xl cursor-pointer transition"
          >
            <p className="text-white text-lg font-medium">
              {cls.department} - {cls.section}
            </p>
            <p className="text-green-300 text-sm">Year {cls.year}</p>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex gap-2 border-t border-green-700 bg-[#0f1a0f] px-4 py-3 mt-auto">
        <p className="flex-1 text-center text-green-400 font-bold">Dashboard</p>
        <p className="flex-1 text-center text-gray-400">Classes</p>
        <p className="flex-1 text-center text-gray-400">Students</p>
        <p className="flex-1 text-center text-gray-400">Settings</p>
      </div>
    </div>
  );
}
