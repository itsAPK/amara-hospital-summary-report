/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React from "react";
import { api } from "@/trpc/react";
import {
    AmbulanceIcon,
  BriefcaseMedicalIcon,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEmergency } from "./add-emergency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditEmergency } from "./edit-emergency";
import { DeleteEmergency } from "./delete-emergency";
import { doctor } from '../../../server/db/schema';

export const Emergency = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, refetch } = api.emergency.getAll.useQuery();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <AmbulanceIcon
            className="mr-2 size-4 shrink-0"
            aria-hidden="true"
          />
          Manage Emergency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[805px]">
        <DialogHeader>
          <DialogTitle>Emergency </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-end">
            <AddEmergency refetchFn={refetch} />
          </div>
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-4 rounded-xl border text-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="rounded-tl-xl bg-primary text-center text-xs text-white">
                      Consultant
                    </TableHead>
                    <TableHead className=" bg-primary text-center text-xs text-white">Contact Number</TableHead>
                    <TableHead className="bg-primary text-center text-xs text-white">
                      Designation
                    </TableHead>
                    <TableHead className="bg-primary text-center text-xs text-white">
                      Status
                    </TableHead>
                    <TableHead className="rounded-tr-xl bg-primary text-center text-xs text-white">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((doctor : any) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="text-center text-xs">
                        {doctor.doctor.name}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        {doctor.doctor.mobile}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        {doctor.designation}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        {doctor.status}
                      </TableCell>
                      <TableCell className="flex justify-center items-center gap-5 ">
                        <EditEmergency data={{
                            id: doctor.id,
                            doctor: doctor.doctor.id,
                            status: doctor.status,
                            designation: doctor.designation,
                        }} refetchFn={refetch} />
                        <DeleteEmergency id={doctor.id} refetchFn={refetch} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
