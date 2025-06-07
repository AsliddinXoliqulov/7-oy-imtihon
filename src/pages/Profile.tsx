import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import { useAuth } from "../context/AuthContext"; 
import { Button, Input } from "antd";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const { user, token, login } = useAuth();

  const [loading, setLoading] = useState(true);
  const [loadingToken, setLoadingToken] = useState(true);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    joined_at: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editValues, setEditValues] = useState({ first_name: "", last_name: "" });


  useEffect(() => {
    if (token) {
      setLoadingToken(false);
    }
  }, [token]);

  useEffect(() => {
    if (!user) {
      toast.error("Foydalanuvchi ma'lumotlari topilmadi");
      setLoading(false);
      return;
    }

    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      joined_at: new Date(user.createdAt).toLocaleDateString("uz-UZ"),
    });
    setLoading(false);
  }, [user]);

  if (loading || loadingToken) return <p>Yuklanmoqda...</p>;

  const handleSubmit = () => {
    
    if (!token) {
      toast.error("Token topilmadi. Iltimos login qiling.");
      return;
    }

    if (!API) {
      toast.error("API manzili topilmadi. Iltimos .env faylini tekshiring.");
      return;
    }

    axios
      .put(
        `${API}/api/auth/edit-profile`,
        {
          first_name: editValues.first_name,
          last_name: editValues.last_name,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Profil yangilandi");
        console.log("✅ Serverdan javob:", res.data);

        if (!user) {
          toast.error("Foydalanuvchi topilmadi");
          return;
        }

        const updatedUser = {
          ...user,
          first_name: editValues.first_name,
          last_name: editValues.last_name,
          _id: user._id!,
        };

        login(updatedUser);

        setForm({ ...form, ...editValues });
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        toast.error("Xatolik yuz berdi");
      });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between border p-6 rounded-xl shadow bg-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
            <RiAccountPinCircleLine size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold capitalize">
              {form.first_name} {form.last_name}
            </h2>
            <p className="text-sm text-muted-foreground">{form.email}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
              <IoCalendarNumberOutline />
              Qo‘shilgan: {form.joined_at}
            </div>
          </div>
        </div>
        <span className="bg-red-600 text-white px-2 py-1 rounded">{form.role}</span>
      </div>

      <div className="border p-6 rounded-xl shadow bg-white space-y-4">
        <h3 className="text-lg font-semibold">Profil ma'lumotlari</h3>
        <p className="text-sm text-muted-foreground">Shaxsiy ma'lumotlaringizni ko‘rishingiz mumkin.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input disabled value={form.first_name} className="border p-2 rounded w-full bg-gray-100 capitalize" />
          <input disabled value={form.last_name} className="border p-2 rounded w-full bg-gray-100 capitalize" />
          <input disabled value={form.email} className="border p-2 rounded w-full bg-gray-100" />
          <input disabled value={form.role} className="border p-2 rounded w-full bg-gray-100" />
        </div>

        <div className="flex items-center justify-end gap-5">
          <button className="bg-black text-white px-3 py-1 rounded-xl text-sm active:bg-gray-600">
            Parol ni O'zgartirish
          </button>
          <button
            onClick={() => {
              setEditValues({ first_name: form.first_name, last_name: form.last_name });
              setIsOpen(true);
            }}
            className="bg-black text-white px-3 py-1 rounded-xl text-sm active:bg-gray-600"
          >
            O'zgartirish
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4 text-center">Ma'lumotlarni tahrirlash</Dialog.Title>

            <div className="flex gap-5 flex-col">
              <Input
                name="first_name"
                value={editValues.first_name}
                onChange={(e) => setEditValues({ ...editValues, first_name: e.target.value })}
              />
              <Input
                name="last_name"
                value={editValues.last_name}
                onChange={(e) => setEditValues({ ...editValues, last_name: e.target.value })}
              />
              <Input disabled value={form.email} />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded">
                Bekor qilish
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Saqlash
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
