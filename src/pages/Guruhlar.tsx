import { FaPlus } from "react-icons/fa";

const groups = [
{
    id: 1,
    name: "213-21",
    teacher: "Javlon Qodirov",
    students: 25,
    startDate: "2025-06-01",
    endDate: "2025-09-01",
  },
  {
    id: 2,
    name: "F85",
    teacher: "Dilshod Karimov",
    students: 18,
    startDate: "2025-05-15",
    endDate: "2025-08-15",
  },
  {
    id: 3,
    name: "X78",
    teacher: "Aziza Eshonova",
    students: 20,
    startDate: "2025-07-01",
    endDate: "2025-10-01",
  },
  {
    id: 4,
    name: "B12",
    teacher: "Shahzod Rahimov",
    students: 22,
    startDate: "2025-04-10",
    endDate: "2025-07-10",
  },
  {
    id: 5,
    name: "AI-07",
    teacher: "Ziyoda Karimova",
    students: 15,
    startDate: "2025-03-01",
    endDate: "2025-06-01",
  },
  {
    id: 6,
    name: "DS-20",
    teacher: "Murod Ismoilov",
    students: 17,
    startDate: "2025-06-20",
    endDate: "2025-09-20",
  },
  {
    id: 7,
    name: "JD-33",
    teacher: "Umid Qurbonov",
    students: 19,
    startDate: "2025-05-01",
    endDate: "2025-08-01",
  },
  {
    id: 8,
    name: "PY-99",
    teacher: "Dilfuza Abdullayeva",
    students: 23,
    startDate: "2025-07-10",
    endDate: "2025-10-10",
  },
  {
    id: 9,
    name: "CP-04",
    teacher: "Rustam G‘ulomov",
    students: 21,
    startDate: "2025-06-05",
    endDate: "2025-09-05",
  },
  {
    id: 10,
    name: "SEC-01",
    teacher: "Sardor Turg‘unov",
    students: 16,
    startDate: "2025-04-15",
    endDate: "2025-07-15",
  },
  {
    id: 11,
    name: "213-21",
    teacher: "Javlon Qodirov",
    students: 25,
    startDate: "2025-06-01",
    endDate: "2025-09-01",
  },
  {
    id: 12,
    name: "F85",
    teacher: "Dilshod Karimov",
    students: 18,
    startDate: "2025-05-15",
    endDate: "2025-08-15",
  },
  {
    id: 13,
    name: "X78",
    teacher: "Aziza Eshonova",
    students: 20,
    startDate: "2025-07-01",
    endDate: "2025-10-01",
  },
  {
    id: 14,
    name: "B12",
    teacher: "Shahzod Rahimov",
    students: 22,
    startDate: "2025-04-10",
    endDate: "2025-07-10",
  },
  {
    id: 15,
    name: "AI-07",
    teacher: "Ziyoda Karimova",
    students: 15,
    startDate: "2025-03-01",
    endDate: "2025-06-01",
  },
  {
    id: 16,
    name: "DS-20",
    teacher: "Murod Ismoilov",
    students: 17,
    startDate: "2025-06-20",
    endDate: "2025-09-20",
  },
  {
    id: 17,
    name: "JD-33",
    teacher: "Umid Qurbonov",
    students: 19,
    startDate: "2025-05-01",
    endDate: "2025-08-01",
  },
  {
    id: 18,
    name: "PY-99",
    teacher: "Dilfuza Abdullayeva",
    students: 23,
    startDate: "2025-07-10",
    endDate: "2025-10-10",
  },
  {
    id: 19,
    name: "CP-04",
    teacher: "Rustam G‘ulomov",
    students: 21,
    startDate: "2025-06-05",
    endDate: "2025-09-05",
  },
  {
    id: 20,
    name: "SEC-01",
    teacher: "Sardor Turg‘unov",
    students: 16,
    startDate: "2025-04-15",
    endDate: "2025-07-15",
  },
];

export default function Groups() {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guruhlar roʻyxati</h1>
        <button className="flex items-center gap-2 bg-black hover:bg-gray-200 text-white px-4 py-1 rounded-lg shadow transition">
          <FaPlus />Guruh Qo'shish
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">No</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Guruh nomi</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Boshlanish</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tugash</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ustoz</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">O'quvchilar soni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap">{group.id}</td>
                <td className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap">{group.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{group.startDate}</td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{group.endDate}</td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{group.teacher}</td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{group.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
