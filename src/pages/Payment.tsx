import { useState } from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const paymentMethods = [
  {
    id: 1,
    name: "Visa",
    icon: <FaCcVisa size={48} className="text-blue-600" />,
    description: "Tez va xavfsiz Visa kartasi orqali to‘lov.",
  },
  {
    id: 2,
    name: "Mastercard",
    icon: <FaCcMastercard size={48} className="text-red-600" />,
    description: "Mastercard yordamida osongina to‘lov qiling.",
  },
  {
    id: 3,
    name: "PayPal",
    icon: <FaCcPaypal size={48} className="text-blue-500" />,
    description: "PayPal bilan global miqyosda to‘lov.",
  },
  {
    id: 4,
    name: "Apple Pay",
    icon: <FaApplePay size={48} className="text-black" />,
    description: "Apple qurilmalaringiz orqali tez to‘lov.",
  },
  {
    id: 5,
    name: "Google Pay",
    icon: <FaGooglePay size={48} className="text-green-600" />,
    description: "Google Pay bilan qulay va tez to‘lov.",
  },
];

const stats = [
  {
    title: "Jami o‘quvchilar",
    value: 120,
    icon: <FaUsers className="text-blue-500 w-6 h-6" />,
  },
  {
    title: "To‘langan to‘lovlar",
    value: "65,000,000 so‘m",
    icon: <FaCheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: "To‘lanmagan to‘lovlar",
    value: "35,000,000 so‘m",
    icon: <FaTimesCircle className="text-red-500 w-6 h-6" />,
  },
  {
    title: "Jami to‘lovlar",
    value: "100,000,000 so‘m",
    icon: <FaMoneyBillWave className="text-yellow-500 w-6 h-6" />,
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border shadow flex items-center gap-4 bg-white"
          >
            <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
            <div>
              <div className="text-sm text-gray-500">{item.title}</div>
              <div className="text-xl font-semibold">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          To‘lov usullari
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {paymentMethods.map(({ id, name, icon, description }) => (
            <div
              key={id}
              className="flex flex-col items-center bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {name}
              </h3>
              <p className="text-center text-gray-600 text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
