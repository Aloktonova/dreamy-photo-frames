import React from "react";
import UserDropdown from "./UserDropdown";

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => (
  <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
    <div className="text-xl font-bold text-gray-800">Dreamy Photo Frames</div>
    <div className="flex items-center gap-4">
      <UserDropdown
        userName={user?.user_metadata?.name || user?.email || "User"}
        userEmail={user?.email}
        avatarUrl={user?.user_metadata?.avatar_url}
        onProfile={() => {}}
        onSettings={() => {}}
        onLogout={onLogout}
      />
    </div>
  </header>
);

export default Navbar; 