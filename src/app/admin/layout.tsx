"use client";
import { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import HomeIcon from "@mui/icons-material/Home";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const onToggleMenu = () => {
    setOpenSidebar(true);
  };
  return (
    <div className="min-h-screen min-w-screen relative">
      <Header
        icon={<HomeIcon className="text-white" />}
        pageTitle="Dashboard"
        onToggleMenu={onToggleMenu}
      />
      {openSidebar ? <Sidebar /> : <></>}
      {children}
    </div>
  );
}
