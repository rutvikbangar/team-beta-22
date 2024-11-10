import React, { useState } from "react";
import { LogOutIcon, UserIcon, StoreIcon } from "lucide-react";
import './Sidebar-dashboard.css';

const sidebarItems = [
  { href: "/profile", icon: UserIcon, label: "Profile" },
  { href: "/store", icon: StoreIcon, label: "Store" },
];

const Sidebar = () => {
  const [user, setUser] = useState({
    imageUrl: "https://via.placeholder.com/150", // Example user image
    username: "JohnDoe",
    email: "johndoe@example.com",
  });

  const handleSignOut = () => {
    // Handle sign out logic here (e.g., clear session, tokens, etc.)
    console.log("Signing out...");
  };

  return (
    <div className="drawer">
     

      {/* Sidebar */}
      <div className="drawer-side">
        <aside className="sidebar">
          <ul className="sidebar-items">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="sidebar-item">
                  <item.icon className="sidebar-item-icon" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {user && (
            <div className="sign-out-section">
              <button onClick={handleSignOut} className="sign-out-btn">
                <LogOutIcon />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
