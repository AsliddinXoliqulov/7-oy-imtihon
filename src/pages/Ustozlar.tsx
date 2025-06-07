import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

interface Group {
    _id: string;
    name: string;
    is_deleted: boolean;
}

interface Teacher {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    groups: Group[];
}

const TeachersPage: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        course_id: "",
        field: "",
    });

    const getTeachers = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const token = user?.token;

            if (!token) return;

            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/teacher/get-all-teachers`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setTeachers(res.data.data);
        } catch (error) {
            console.error("Ustozlarni olishda xatolik:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const token = user?.token;

            if (!token) return;

            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/teacher/create-teacher`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsOpen(false);
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                password: "",
                course_id: "",
                field: "",
            });

            getTeachers();
        } catch (error) {
            console.error("Ustoz qo‘shishda xatolik:", error);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Ustozlar ro'yxati</h1>
                <button type="submit" onClick={() => setIsOpen(true)}>Ustoz qo‘shish</button>
            </div>

            {loading ? (
                <p>Yuklanmoqda...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">Ism</th>
                                <th className="px-4 py-2">Familiya</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Holat</th>
                                <th className="px-4 py-2">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher._id} className="border-b">
                                    <td className="px-4 py-2">{teacher.first_name}</td>
                                    <td className="px-4 py-2">{teacher.last_name}</td>
                                    <td className="px-4 py-2">{teacher.email}</td>
                                    <td className="px-4 py-2">{teacher.status}</td>
                                    <td className="px-4 py-2">
                                        <button className="text-xl text-gray-600 hover:text-black">
                                            <i className="bx bx-dots-horizontal-rounded"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {teachers.length === 0 && (
                        <p className="mt-4 text-gray-500">Hozircha ustozlar yo‘q.</p>
                    )}
                </div>
            )}

            {/* Modal: Yangi ustoz qo‘shish */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <Dialog.Title className="text-xl font-semibold mb-4">Yangi ustoz qo‘shish</Dialog.Title>
                        <form onSubmit={handleAddTeacher} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Ismi"
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Familiyasi"
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Telefon raqam"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Parol"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Kurs ID"
                                value={formData.course_id}
                                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Soha (masalan: Backend dasturlash)"
                                value={formData.field}
                                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                            <div className="flex justify-end space-x-2">
                                <div className="flex items-center gap-5">
                                    <button type="submit">Qo‘shish</button>
                                    <button onClick={() => setIsOpen(false)}>Bekor qilish</button>
                                </div>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default TeachersPage;
