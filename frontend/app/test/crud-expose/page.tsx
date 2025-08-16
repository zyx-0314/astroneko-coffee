"use client";

import { MenuCrudTable } from "@/components/Menu/CrudTableTestExpose/menuCrudTable";


const MenuCrudPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Menu CRUD Operations</h1>
      <MenuCrudTable />
    </div>
  );
};

export default MenuCrudPage;
