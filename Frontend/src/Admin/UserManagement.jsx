import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function UserMangement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "/api/v1/admin/users",
        { withCredentials: true }
      );
      setUsers(res.data.data);
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await axios.put(
        `/api/v1/admin/user/${id}`,
        {},
        { withCredentials: true }
      );

      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = users.filter(user =>
    (user.fullName.toLowerCase().includes(search.toLowerCase()) ||
     user.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter ? user.role === roleFilter : true)
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar title="User Management" />

      <div className="mt-20 flex-1 overflow-y-auto p-10 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-gray-500 mt-2">
            Search, filter and control user access
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-xl w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-xl w-full md:w-48 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="customer">Customer</option>
          </select>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left p-5">Name</th>
                <th className="text-left p-5">Email</th>
                <th className="text-left p-5">Role</th>
                <th className="text-left p-5">Status</th>
                <th className="text-left p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(user => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-5 font-medium text-gray-800">
                    {user.fullName}
                  </td>

                  <td className="p-5 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-5 capitalize">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-5">
                    {user.isBlocked ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() => toggleStatus(user._id)}
                      className={`px-4 py-2 rounded-xl text-white text-xs font-medium transition ${
                        user.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default UserMangement;