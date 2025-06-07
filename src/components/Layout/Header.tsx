import { FaChevronRight } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlinePeople } from "react-icons/md";

export default function Header() {
    const location = useLocation();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        joined_at: "",
        role: "",
    });

    const pageName = location.pathname.split("/").filter(Boolean).pop() || "Home";
    const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setForm(JSON.parse(userData));
        }
    }, []);

    return (
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold gap-3 flex items-center">
                CRM Panel <FaChevronRight className="text-sm" />
                <span className="text-base font-normal">{formattedPageName}</span>
            </h1>
            <div className="flex items-center gap-1">
                <div className="flex flex-col items-end font-medium text-sm">
                   <span className="capitalize"> {form.first_name} {form.last_name}</span>
                    <span className="flex items-center gap-2"> <MdOutlinePeople className="text-xl" />{form.role}</span>
                </div>
                <RiAccountPinCircleLine size={56} />
            </div>
        </header>
    );
}
