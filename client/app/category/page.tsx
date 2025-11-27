"use client";

import React from "react";
import Image from "next/image";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";

interface Row {
  id: number;
  name: string;
  image: string;
  status: string;
}

const Category = () => {
  const [loading, setLoading] = React.useState(true);
  const data: Row[] = [
    { id: 123, name: "Mobile", image: "/images/user.png", status: "Active" },
    { id: 124, name: "Laptop", image: "/images/user.png", status: "Inactive" },
    { id: 125, name: "Grocery", image: "/images/user.png", status: "Inactive" },
  ];

  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Category Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: (info) => (
        <div className="flex justify-center">
          <Image
            src={info.getValue() as string}
            alt=""
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const value = info.getValue() as string;
        return (
          <span
            className={`font-semibold ${value === "Active" ? "text-green-600" : "text-red-500"
              }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-4">
          <button className="text-gray-700 hover:text-black">
            <FiEdit size={20} />
          </button>
          <button className="text-gray-700 hover:text-red-500">
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  React.useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row  md:justify-between items-center mb-10 gap-3">
        <h2 className="text-2xl font-semibold">Category List</h2>
        <Link href="/category/add"><button className="rounded-lg bg-primary px-6 py-2 cursor-pointer font-semibold text-white hover:bg-primary/90">Add New</button></Link>
      </div>
      {
        loading ? <div className="flex justify-center m-auto">Loading...</div> :
          <div className="border border-gray-200 bg-white">
            <div className="overflow-x-auto max-w-full">
              <table className="min-w-max border-collapse w-full">
                <thead className="bg-[#FFF8B7]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="h-14 mb-2">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left px-5 font-semibold text-gray-700"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="bg-[#F5F5F5] my-3 h-16 rounded-lg"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-5 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      }
    </div>
  );
};

export default Category;
