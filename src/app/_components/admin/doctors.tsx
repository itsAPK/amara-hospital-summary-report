/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React from "react";
import { api } from "@/trpc/react";
import {
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
import { AddDoctor } from "./add-doctors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditDoctor } from "./edit-doctor";
import { DeleteDoctor } from "./delete-doctor";

export const Doctors = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, refetch } = api.doctor.getAll.useQuery();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <BriefcaseMedicalIcon
            className="mr-2 size-4 shrink-0"
            aria-hidden="true"
          />
          Manage Doctors
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[805px]">
        <DialogHeader>
          <DialogTitle>Doctors </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-end">
            <AddDoctor refetchFn={refetch} />
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
                      Name
                    </TableHead>
                    <TableHead className="bg-primary text-center text-xs text-white">
                      Mobile
                    </TableHead>
                    <TableHead className="rounded-tr-xl bg-primary text-center text-xs text-white">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="text-center text-xs">
                        {doctor.name}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        {doctor.mobile}
                      </TableCell>
                      <TableCell className="flex justify-center items-center gap-5 ">
                        <EditDoctor data={doctor} refetchFn={refetch} />
                        <DeleteDoctor id={doctor.id} refetchFn={refetch} />
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
