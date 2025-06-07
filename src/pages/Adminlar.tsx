import React, { useState, useEffect } from "react";
interface Manager {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: "faol" | "ta'tilda" | "ishdan bo'shatilgan";
  image: string;
  work_date: string;
}

const ManagersPage = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userString = localStorage.getItem("user");
    const token = userString ? JSON.parse(userString).token : null;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff/all-admins`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Xatolik yuz berdi");
        return res.json();
      })
      .then(data => {
        setManagers(data.data || []);
      })
      .catch(err => {
        console.error(err);
        setManagers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredManagers = managers.filter(manager => {
    const fullName = (manager.first_name + " " + manager.last_name).toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? manager.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Ism yoki familiya bo‘yicha qidirish..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-0"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-0"
        >
          <option value="">Barcha holatlar</option>
          <option value="faol">Faol</option>
          <option value="ta'tilda">Ta'tilda</option>
          <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
        </select>
      </div>

      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="text-black">
              <tr>
                <th className="p-3">Rasm</th>
                <th className="p-3">Ism Familiya</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Holat</th>
                <th className="p-3">Ish boshlagan</th>
              </tr>
            </thead>
            <tbody>
              {filteredManagers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Manager topilmadi
                  </td>
                </tr>
              ) : (
                filteredManagers.map(manager => (
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