import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClock,
  FaPlus,
  FaPencilAlt,
  FaRegTrashAlt,
  FaSnowflake,
} from "react-icons/fa";
import { Button } from "antd";

interface Course {
  _id: string;
  name: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  description: string;
  price: number;
  duration: string;
  is_freeze: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  token: string;
}

interface NewCourse {
  name: string;
  price: number;
  duration: string;
  description: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState<NewCourse>({
    name: "",
    price: 0,
    duration: "",
    description: "",
  });
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // API base URL to'g'ridan-to'g'ri shu yerda
  const API = "https://admin-crm.onrender.com";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user: User = JSON.parse(userData);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (token) fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/api/course/get-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.data || []);
      setError(null);
    } catch (err) {
      setError("Kurslarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await axios.post(`${API}/api/course/create-course`, newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
      setShowModal(false);
      setNewCourse({ name: "", price: 0, duration: "", description: "" });
      setError(null);
    } catch (err) {
      setError("Kurs yaratishda xatolik yuz berdi");
    }
  };

  const handleEditClick = (course: Course) => {
    setEditCourse(course);
    setShowModal(true);
    setNewCourse({
      name: course.name.name,
      price: course.price,
      duration: course.duration,
      description: course.description,
    });
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editCourse) return;
    try {
      await axios.put(
        `${API}/api/course/edit-course`,
        {
          course_id: editCourse._id,
          ...newCourse,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCourses();
      setEditCourse(null);
      setShowModal(false);
      setNewCourse({ name: "", price: 0, duration: "", description: "" });
      setError(null);
    } catch (err) {
      setError("Kursni yangilashda xatolik yuz berdi");
    }
  };

  const handleFreezeUnfreeze = async (courseId: string, isFreeze: boolean) => {
    if (!token) return;
    try {
      const endpoint = isFreeze
        ? `${API}/api/course/unfreeze-course`
        : `${API}/api/course/freeze-course`;
      await axios.put(
        endpoint,
        { course_id: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCourses();
      setError(null);
    } catch (err) {
      setError("Muzlatish funksiyasida xatolik yuz berdi");
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!token) return;
    try {
      await axios.delete(`${API}/api/course/delete-course`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { course_id: courseId },
      });
      fetchCourses();
      setError(null);
    } catch (err) {
      setError("Kursni o‘chirishda xatolik yuz berdi");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">Yuklanmoqda...</div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">{error}</div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">KURSLAR</h1>
        <Button
          onClick={() => {
            setShowModal(true);
            setEditCourse(null);
            setNewCourse({ name: "", price: 0, duration: "", description: "" });
          }}
          className="flex items-center gap-2 px-4 py-2 rounded"
        >
          <FaPlus /> Kurs Qo‘shish
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap justify-around">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-lg shadow-md xl:w-96 w-full"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold">{course.name.name}</h2>
              <span className="text-gray-600">
                {course.price.toLocaleString()} UZS
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{course.description}</p>
            <div className="flex items-center text-gray-500 mb-4">
              <FaClock className="mr-1" /> {course.duration}
            </div>
            <div className="flex justify-between items-center gap-2">
              <Button
                icon={<FaPencilAlt />}
                className="text-gray-700"
                onClick={() => handleEditClick(course)}
              >
                Tahrirlash
              </Button>
              <Button
                danger
                icon={<FaRegTrashAlt />}
                onClick={() => handleDelete(course._id)}
              >
                O‘chirish
              </Button>
              <Button
                icon={<FaSnowflake />}
                onClick={() => handleFreezeUnfreeze(course._id, course.is_freeze)}
              >
                {course.is_freeze ? "Eritish" : "Muzlatish"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo‘shish"}
            </h2>
            <form
              onSubmit={editCourse ? handleUpdateCourse : handleCreateCourse}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Kurs Nomi"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Narxi (UZS)"
                value={newCourse.price}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, price: Number(e.target.value) })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Davomiyligi"
                value={newCourse.duration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, duration: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Tavsifi"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <Button type="submit">
                  {editCourse ? "Yangilash" : "Qo‘shish"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditCourse(null);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
