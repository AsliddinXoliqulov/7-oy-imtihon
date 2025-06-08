import React, { useState, useEffect } from "react";
import API from "../api";

interface Manager {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  work_date: string;
  work_end?: string;
  active: boolean;
  image: string;
}

const ManagersPage: React.FC = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const userString = localStorage.getItem("user");
    const token = userString ? JSON.parse(userString).token : null;

    API.get("/api/staff/all-managers", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        setManagers(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
        setManagers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredManagers = managers.filter((manager) =>
    (manager.first_name + " " + manager.last_name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <input
        type="text"
        placeholder="Ism yoki familiya bo‘yicha qidirish..."
        className="mb-6 w-full max-w-md px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">Rasm</th>
                <th className="p-3">Ism Familiya</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Ish boshlash</th>
                <th className="p-3">Ish tugash</th>
                <th className="p-3">Faol</th>
              </tr>
            </thead>
            <tbody>
              {filteredManagers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    Manager topilmadi
                  </td>
                </tr>
              ) : (
                filteredManagers.map((manager) => (
                  <tr
                    key={manager._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">
                      <img
                        src={manager.image}
                        alt={`${manager.first_name} ${manager.last_name}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium">
                      {manager.first_name} {manager.last_name}
                    </td>
                    <td className="p-3">{manager.email}</td>
                    <td className="p-3">{manager.role}</td>
                    <td className="p-3 capitalize">{manager.status}</td>
                    <td className="p-3">
                      {new Date(manager.work_date).toLocaleDateString("uz-UZ")}
                    </td>
                    <td className="p-3">
                      {manager.work_end
                        ? new Date(manager.work_end).toLocaleDateString("uz-UZ")
                        : "—"}
                    </td>
                    <td className="p-3">{manager.active ? "Ha" : "Yo‘q"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagersPage;
