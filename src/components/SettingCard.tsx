import React from "react";
import type { ReactNode } from "react";


interface SettingCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

const SettingCard: React.FC<SettingCardProps> = ({
  icon,
  title,
  children,
  onClick,
  clickable = false,
}) => {
  return (
    <div
      onClick={clickable ? onClick : undefined}
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
};

export default SettingCard;
