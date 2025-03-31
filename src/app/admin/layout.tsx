"use client";
import { useState } from "react";
import Header from "./component/header";
import Sidebar from "./component/sidebar";
import HomeIcon from "@mui/icons-material/Home";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const onToggleMenu = () => {
    console.log("seen toggle menu");
    setOpenSidebar(true);
  };
  return (
    <div className="h-screen w-screen relative">
      <Header
        icon={<HomeIcon className="text-white" />}
        pageTitle="Dashboard"
        onToggleMenu={onToggleMenu}
      />
      {/* {openSidebar ? <Sidebar /> : <></>} */}
      {children}
    </div>
  );
}
