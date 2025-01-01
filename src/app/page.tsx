/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";
import Link from "next/link";

import { auth } from "@/server/auth";
import { api } from "@/trpc/react";
import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import DateTime from "@/components/datetime";

export default function Home() {
  const emergency = api.emergency.getAll.useQuery();
  const department = api.department.getAll.useQuery();
  return (
    <div className="grid grid-cols-12 gap-4 p-10">
      <div className="col-span-12 flex flex-col gap-4">
        {department.isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <Loader className="h-4 w-4 animate-spin" />
            </div>
          </div>
        ) : (
          <>
            <div className="col-span-12 mt-5 flex flex-col gap-4 rounded-xl border py-5">
              <div className="flex justify-between gap-4 px-6 py-10">
                <div>
                  <img
                    className="w-36"
                    src="https://xewnjhdnjxlaadjthrex.supabase.co/storage/v1/object/public/amarahospital/amaralogo.png?t=2024-12-26T20%3A48%3A03.068Z"
                  />
                </div>
                <DateTime />
                <div>
                  <img
                    className="w-56"
                    src="https://xewnjhdnjxlaadjthrex.supabase.co/storage/v1/object/public/amarahospital/ats1.png"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 px-6 py-0">
                <h2 className="text-center text-xl font-bold">
                  Emergency Consultant
                </h2>
                <div className="rounded-xl border shadow">
                  <Table className="">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="rounded-tl-xl bg-primary text-center text-sm text-white">
                          Consultant
                        </TableHead>
                        <TableHead className="bg-primary text-center text-sm text-white">
                          Designation
                        </TableHead>
                        <TableHead className="bg-primary text-center text-sm text-white">
                          Status
                        </TableHead>
                        <TableHead className="rounded-tr-xl bg-primary text-center text-sm text-white">
                          Contact Number
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emergency.data &&
                        emergency.data?.map((d) => (
                          <TableRow key={d.id}>
                            <TableCell className="text-center text-sm">
                              {d.doctor?.name}
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {d.designation}
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {d.status}
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {d.doctor?.mobile}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
       
              <h2 className=" text-center text-xl font-bold pt-10">
                Summary of Available Doctors
              </h2>
              <div className="rounded-xl border shadow mx-4">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="rounded-tl-xl bg-primary text-center text-sm text-white">
                        Department
                      </TableHead>
                      <TableHead className="bg-primary text-center text-sm text-white">
                        On-Duty Doctor
                      </TableHead>
                      <TableHead className="bg-primary text-center text-sm text-white">
                        Backup Doctor
                      </TableHead>
                  
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {department.data &&
                      department.data?.map((d) => (
                        <TableRow key={d.id}>
                          <TableCell className="text-center text-sm">
                            {d.name}
                          </TableCell>
                          <TableCell className="text-center text-sm">
                            <div className="flex flex-col gap-1">
                             
                              <span>
                                {/* @ts-ignore */}
                                {d.onDutyDoctor ? d.onDutyDoctor.name : "---"}
                              </span>
                        
                              <span className="text-gray-600">
                                      {/* @ts-ignore */}
                                {d.onDutyDoctor ? d.onDutyDoctor.mobile : "---"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-sm">
                          <div className="flex flex-col gap-1">
                             
                             <span>
                               {/* @ts-ignore */}
                               {d.unavailableDoctor ? d.unavailableDoctor.name : "---"}
                             </span>
                       
                             <span className="text-gray-600">
                                     {/* @ts-ignore */}
                               {d.unavailableDoctor ? d.unavailableDoctor.mobile : "---"}
                             </span>
                           </div>
                          </TableCell>
                         
                         
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              </div>
          </>
        )}
      </div>
    </div>
  );
}
