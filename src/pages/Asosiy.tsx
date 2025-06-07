import { MdOutlineMoreHoriz } from "react-icons/md";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { BsArrowClockwise } from "react-icons/bs";

const payments = [
  { id: 1, name: "Aliyev Sardor", group: "Frontend 101", amount: 500000, status: "paid", date: "2025-06-01" },
  { id: 2, name: "Karimova Laylo", group: "Backend Pro", amount: 700000, status: "unpaid", date: "2025-06-01" },
  { id: 3, name: "Toirov Jasur", group: "Design UI", amount: 450000, status: "paid", date: "2025-05-28" },
  { id: 4, name: "Normurodova Anora", group: "React Advance", amount: 600000, status: "unpaid", date: "2025-05-25" },
  { id: 5, name: "Rahmatov Shohruh", group: "Frontend 101", amount: 550000, status: "paid", date: "2025-06-01" },
  { id: 6, name: "Xolmatova Shaxnoza", group: "Backend Pro", amount: 700000, status: "unpaid", date: "2025-05-29" },
  { id: 7, name: "Ergashev Aziz", group: "Design UI", amount: 480000, status: "paid", date: "2025-06-03" },
  { id: 8, name: "Ismoilova Nodira", group: "React Advance", amount: 620000, status: "unpaid", date: "2025-06-04" },
  { id: 9, name: "Usmonov Diyor", group: "Frontend 101", amount: 500000, status: "paid", date: "2025-06-01" },
  { id: 10, name: "G‘ulomova Muxlisa", group: "Backend Pro", amount: 700000, status: "unpaid", date: "2025-06-01" },
  { id: 11, name: "Bekzodov Ilhom", group: "Design UI", amount: 470000, status: "paid", date: "2025-06-02" },
  { id: 12, name: "Qodirova Zilola", group: "React Advance", amount: 610000, status: "unpaid", date: "2025-06-05" },
  { id: 13, name: "Saidov Murod", group: "Frontend 101", amount: 510000, status: "paid", date: "2025-05-30" },
  { id: 14, name: "Davlatova Dilnoza", group: "Backend Pro", amount: 690000, status: "unpaid", date: "2025-06-01" },
  { id: 15, name: "Narzullayev Jasur", group: "Design UI", amount: 450000, status: "paid", date: "2025-06-01" },
  { id: 16, name: "Yuldasheva Mohira", group: "React Advance", amount: 600000, status: "unpaid", date: "2025-05-27" },
  { id: 17, name: "Shukurov Farrux", group: "Frontend 101", amount: 500000, status: "paid", date: "2025-06-01" },
  { id: 18, name: "Olimova Zarnigor", group: "Backend Pro", amount: 700000, status: "unpaid", date: "2025-06-01" },
  { id: 19, name: "Hasanov Javohir", group: "Design UI", amount: 455000, status: "paid", date: "2025-05-30" },
  { id: 20, name: "Boboyeva Shaxzoda", group: "React Advance", amount: 605000, status: "unpaid", date: "2025-06-01" },
];

export default function Payment() {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);

  const filtered = payments.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and search */}
      <div className="flex items-center gap-4 flex-wrap bg-white">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LuClock className="w-6 h-6" />
          Oxirgi Amallar
        </h1>
        <input
          placeholder="Ism bo‘yicha qidiring..."
          className="max-w-[280px] w-full outline-none py-1 px-3 border border-gray-300 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="border rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">F.I.Sh</th>
              <th className="p-3">Guruh</th>
              <th className="p-3">To‘lov sanasi</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-start">Harakat</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 relative">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.group}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  {item.status === "paid" ? (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 border border-green-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      <FaCheckCircle className="w-4 h-4" />
                      To‘liq to‘langan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-600 border border-yellow-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      <BsArrowClockwise className="w-4 h-4" />
                      Qisman to‘langan
                    </span>
                  )}
                </td>
                <td className="p-3 text-start">
                  <button
                    onClick={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                    className="text-2xl"
                  >
                    <MdOutlineMoreHoriz />
                  </button>
                  {openId === item.id && (
                    <div className="absolute right-4 -top-20 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          setOpenId(null);
                          alert(`O‘chirish: ${item.name}`);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        O‘chirish
                      </button>
                      <button
                        onClick={() => {
                          setOpenId(null);
                          alert(`Bloklash: ${item.name}`);
                        }}
                        className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100"
                      >
                        Bloklash
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  Hech qanday natija topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
