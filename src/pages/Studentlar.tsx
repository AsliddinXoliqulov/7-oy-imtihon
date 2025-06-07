import { useState } from "react";

const studentsData = [
  { id: 1, name: "Jasur Xolmurodov", group: "213-21", email: "jasur@example.com" },
  { id: 2, name: "Dilnoza Tursunova", group: "F85", email: "dilnoza@example.com" },
  { id: 3, name: "Sardor Yo‘ldoshev", group: "X78", email: "sardor@example.com" },
  { id: 4, name: "Malika Karimova", group: "213-21", email: "malika@example.com" },
  { id: 5, name: "Oybek Qodirov", group: "F85", email: "oybek@example.com" },
  { id: 6, name: "Nilufar Ergasheva", group: "X78", email: "nilufar@example.com" },
  { id: 7, name: "Jahon Zokirov", group: "213-21", email: "jahon@example.com" },
  { id: 8, name: "Zarina Soliyeva", group: "F85", email: "zarina@example.com" },
  { id: 9, name: "Anvar Usmonov", group: "X78", email: "anvar@example.com" },
  { id: 10, name: "Saodat Yusupova", group: "213-21", email: "saodat@example.com" },
  { id: 11, name: "Bekzod Islomov", group: "F85", email: "bekzod@example.com" },
  { id: 12, name: "Gulnoza Rustamova", group: "X78", email: "gulnoza@example.com" },
  { id: 13, name: "Shahzod To‘xtasinov", group: "213-21", email: "shahzod@example.com" },
  { id: 14, name: "Malika Sobirova", group: "F85", email: "malika2@example.com" },
  { id: 15, name: "Rustam Xolmatov", group: "X78", email: "rustam@example.com" },
  { id: 16, name: "Dilbar Egamberdiyeva", group: "213-21", email: "dilbar@example.com" },
  { id: 17, name: "Azizbek Mirzaev", group: "F85", email: "azizbek@example.com" },
  { id: 18, name: "Nilufar Xudoyberdiyeva", group: "X78", email: "nilufar2@example.com" },
  { id: 19, name: "Jasur Yo‘ldoshev", group: "213-21", email: "jasur2@example.com" },
  { id: 20, name: "Nozima Karimova", group: "F85", email: "nozima@example.com" },
  { id: 21, name: "Oybek Rahmatov", group: "X78", email: "oybek2@example.com" },
  { id: 22, name: "Zilola Abduvalieva", group: "213-21", email: "zilola@example.com" },
  { id: 23, name: "Shahnoza Tursunova", group: "F85", email: "shahnoza@example.com" },
  { id: 24, name: "Bekzod Oripov", group: "X78", email: "bekzod2@example.com" },
  { id: 25, name: "Dildora Islomova", group: "213-21", email: "dildora@example.com" },
  { id: 26, name: "Shohrux Qodirov", group: "F85", email: "shohrux@example.com" },
  { id: 27, name: "Gulbahor Mirzaeva", group: "X78", email: "gulbahor@example.com" },
  { id: 28, name: "Javlon Sobirov", group: "213-21", email: "javlon@example.com" },
  { id: 29, name: "Mavluda Tursunova", group: "F85", email: "mavluda@example.com" },
  { id: 30, name: "Rustambek Ergashev", group: "X78", email: "rustambek@example.com" },
  { id: 31, name: "Zarina Akbarova", group: "213-21", email: "zarina2@example.com" },
  { id: 32, name: "Sardor Murodov", group: "F85", email: "sardor2@example.com" },
  { id: 33, name: "Nilufar Rasulova", group: "X78", email: "nilufar3@example.com" },
  { id: 34, name: "Azizbek Rahmonov", group: "213-21", email: "azizbek2@example.com" },
  { id: 35, name: "Malika Toshpulatova", group: "F85", email: "malika3@example.com" },
  { id: 36, name: "Oybek Karimov", group: "X78", email: "oybek3@example.com" },
  { id: 37, name: "Gulnoza Rustamova", group: "213-21", email: "gulnoza2@example.com" },
  { id: 38, name: "Jahon Yo‘ldoshev", group: "F85", email: "jahon2@example.com" },
  { id: 39, name: "Nilufar Tursunova", group: "X78", email: "nilufar4@example.com" },
  { id: 40, name: "Zilola Karimova", group: "213-21", email: "zilola2@example.com" },
  { id: 41, name: "Shahzod Ergashev", group: "F85", email: "shahzod2@example.com" },
  { id: 42, name: "Malika Qodirova", group: "X78", email: "malika4@example.com" },
  { id: 43, name: "Rustam Tursunov", group: "213-21", email: "rustam2@example.com" },
  { id: 44, name: "Dilnoza Sobirova", group: "F85", email: "dilnoza2@example.com" },
  { id: 45, name: "Jasur Murodov", group: "X78", email: "jasur3@example.com" },
  { id: 46, name: "Oybek Mirzaev", group: "213-21", email: "oybek4@example.com" },
  { id: 47, name: "Zarina Rahmonova", group: "F85", email: "zarina3@example.com" },
  { id: 48, name: "Sardor Karimov", group: "X78", email: "sardor3@example.com" },
  { id: 49, name: "Nilufar Qodirova", group: "213-21", email: "nilufar5@example.com" },
  { id: 50, name: "Jahon Sobirov", group: "F85", email: "jahon3@example.com" },
];


export default function Students() {
  const [search, setSearch] = useState("");

  // Qidirish so'ziga mos keladigan talaba ro'yxati
  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.group.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Talabalar ro'yxati</h1>

      {/* Qidirish inputi */}
      <input
        type="text"
        placeholder="Ism, guruh yoki email bo'yicha qidirish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">ID</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Ism</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Guruh</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="py-3 px-4 text-gray-800">{student.id}</td>
                  <td className="py-3 px-4 text-gray-800">{student.name}</td>
                  <td className="py-3 px-4 text-gray-600">{student.group}</td>
                  <td className="py-3 px-4 text-gray-600">{student.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Hech qanday talabalar topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
