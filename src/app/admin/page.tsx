/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { api } from "@/trpc/react";
import { AddDepartment } from "../_components/admin/add-department";
import { Doctors } from "../_components/admin/doctors";
import { Header } from "../_components/header";
import { EditDepartment } from "../_components/admin/edit-department";
import { DeleteDepartment } from "../_components/admin/delete-department";
import { Emergency } from "../_components/admin/emergency";
import { useSession } from "next-auth/react";
export default function Admin() {
  const departments = api.department.getAll.useQuery();
  const doctor = api.doctor.getAll.useQuery();
 
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-4 px-10 py-4">
          <div className="col-span-12 flex flex-col gap-4 rounded-xl border border-primary/10 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Departments</h2>
              <div className="flex justify-end gap-4">
                <AddDepartment refetchFn={departments.refetch} />
                <Doctors />
                <Emergency />
              </div>
            </div>
            {departments.isLoading ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/10"></div>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-4 rounded-xl border text-sm">
                <div className="grid grid-cols-4 -4 border-b border-primary/10 p-4">
                  <div className="text-center text-xs font-semibold text-primary">
                    Department Name
                  </div>
                  <div className="text-center text-xs font-semibold text-primary">
                    On Duty Doctor
                  </div>
                  <div className="text-center text-xs font-semibold text-primary">
                    Backup Doctor
                  </div>
                
                  
                </div>
                {departments.data?.map((department) => (
                  <div
                    className="grid grid-cols-4 border-b border-primary/10 "
                    key={department.id}
                  >
                    <div className="text-center text-xs">{department.name}</div>
                
                   {/* @ts-ignore */}
                   <div className="text-center text-xs">
                      {department.onDutyDoctor
                        ? //@ts-ignore

                          department.onDutyDoctor.name
                        : "---"}

<div className="text-center text-xs text-gray-600">
                      {" "}
                      {department.onDutyDoctor
                        ? //@ts-ignore
                          department.onDutyDoctor.mobile
                        : "---"}
                    </div>
                    </div>
                    {/* @ts-ignore */}
                    <div className="text-center text-xs">
                      {department.unavailableDoctor
                        ? //@ts-ignore

                          department.unavailableDoctor.name
                        : "---"}
                      <div className="text-center text-xs text-gray-600">
                      {" "}
                      {department.unavailableDoctor
                        ? //@ts-ignore
                          department.unavailableDoctor.mobile
                        : "---"}
                    </div>
                    </div>

                 
                    {/* @ts-ignore */}
                  
                    <div className="flex justify-end items-center gap-4">
                      <EditDepartment
                        data={{
                          id: department.id,
                          name: department.name,
                          //@ts-ignore
                          onDutyDoctor: department.onDutyDoctor
                            ? //@ts-ignore

                              department.onDutyDoctor.id
                            : undefined,
                          //@ts-ignore

                          unavailableDoctor: department.unavailableDoctor
                            ? //@ts-ignore
                              department.unavailableDoctor.id
                            : undefined,
                        }}
                        refetchFn={() => departments.refetch()}
                      />
                      <DeleteDepartment
                        id={department.id}
                        refetchFn={() => departments.refetch()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
