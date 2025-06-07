import { useState } from "react";
import {
  FaGlobe,
  FaMoon,
  FaSun,
  FaBell,
  FaShieldAlt,
  FaQuestionCircle,
  FaPalette,
  FaLink,
  FaLock,
  FaDatabase,
  FaDownload,
  FaPaperPlane,
} from "react-icons/fa";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("uz");


  
  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
      <SettingCard icon={<FaGlobe className="text-blue-500" />} title="Til sozlamasi">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 rounded border px-2 py-1 text-sm outline-none border-none w-40"
        >
          <option value="uz">O'zbekcha</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </SettingCard>

      <SettingCard
        icon={darkMode ? <FaMoon className="text-purple-600" /> : <FaSun className="text-yellow-500" />}
        title="Tungi rejim"
        onClick={() => setDarkMode(!darkMode)}
        clickable
      >
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {darkMode ? "Faol" : "O‘chirilgan"}
        </p>
      </SettingCard>

      <SettingCard icon={<FaBell className="text-green-500" />} title="Bildirishnomalar">
        <p className="text-sm text-gray-500 dark:text-gray-300">Bildirishnomalarni boshqarish</p>
      </SettingCard>

      <SettingCard icon={<FaShieldAlt className="text-red-500" />} title="Maxfiylik">
        <p className="text-sm text-gray-500 dark:text-gray-300">Ma’lumotlaringiz xavfsizligi</p>
      </SettingCard>

      <SettingCard icon={<FaQuestionCircle className="text-indigo-500" />} title="Yordam">
        <p className="text-sm text-gray-500 dark:text-gray-300">Yordam markaziga murojaat qiling</p>
      </SettingCard>

      <SettingCard icon={<FaPalette className="text-pink-500" />} title="Mavzu ranglari">
        <p className="text-sm text-gray-500 dark:text-gray-300">Sayt ranglarini sozlang</p>
      </SettingCard>

      <SettingCard icon={<FaLink className="text-cyan-600" />} title="Xavfsiz ulanishlar">
        <p className="text-sm text-gray-500 dark:text-gray-300">SSL, HTTPS va token sozlamalari</p>
      </SettingCard>

      <SettingCard icon={<FaLock className="text-amber-600" />} title="Parol boshqaruvi">
        <p className="text-sm text-gray-500 dark:text-gray-300">Parollarni yangilash va sozlash</p>
      </SettingCard>

      <SettingCard icon={<FaDatabase className="text-fuchsia-600" />} title="Ma'lumot zaxirasi">
        <p className="text-sm text-gray-500 dark:text-gray-300">Zaxira qilish va tiklash sozlamalari</p>
      </SettingCard>

      <SettingCard icon={<FaPaperPlane className="text-teal-500" />} title="Fikr-mulohaza yuborish">
        <p className="text-sm text-gray-500 dark:text-gray-300">Sayt haqida fikr bildiring</p>
      </SettingCard>

      <SettingCard icon={<FaDownload className="text-gray-700" />} title="Yuklab olishlar">
        <p className="text-sm text-gray-500 dark:text-gray-300">Yuklangan fayllar boshqaruvi</p>
      </SettingCard>
    </div>
  );
}

function SettingCard({ icon, title, children, onClick, clickable = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-100 rounded-xl shadow p-4 flex flex-col gap-2 transition hover:shadow-md ${
        clickable ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <p className="font-medium text-lg">{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
