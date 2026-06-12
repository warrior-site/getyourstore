import React, { useEffect, useState } from "react";

const roles = ["admin", "customer", "retailer"];

export default function UserRoleManager() {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://getyourstore.onrender.com/admin/users", {
        credentials: "include", // important if using auth cookies
      });

      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Update role
  const handleChange = async (userId, newRole) => {
    try {
      setLoadingId(userId);

      // Optimistic UI
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole } : u
        )
      );

      const res = await fetch(`https://getyourstore.onrender.com/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

    } catch (err) {
      console.error(err);

      // rollback if failed
      fetchUsers();
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-base-200 p-4 rounded-xl shadow-md h-[40vh] flex flex-col">
      
      {/* Header */}
      <h2 className="text-lg font-semibold mb-3 text-success">
        User Role Manager
      </h2>

      {/* Loading */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-spinner text-success"></span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          
          {users.length === 0 && (
            <p className="text-sm text-gray-400">No users found</p>
          )}

          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-base-100 p-3 rounded-lg border border-base-300"
            >
              {/* User Info */}
              <div>
                <p className="font-medium text-sm">{user.name || "Unnamed"}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

              {/* Role Dropdown */}
              <select
                className="select select-sm select-success"
                value={user.role}
                onChange={(e) =>
                  handleChange(user.id, e.target.value)
                }
                disabled={loadingId === user.id}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}