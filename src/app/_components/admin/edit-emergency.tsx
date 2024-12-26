/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";
import { AddEmergencySchema, addEmergencySchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const EditEmergency = ({
  data,
  refetchFn,
}: {
  data: any;
  refetchFn: any;
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const doctors = api.doctor.getAll.useQuery();

  const form = useForm<AddEmergencySchema>({
    resolver: zodResolver(addEmergencySchema),
defaultValues: {
      doctor: data.doctor,
      status: data.status,
      designation: data.designation,
    },
  });

  const updateEmergency = api.emergency.update.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Emergency Updated Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

 async function onSubmit(input: AddEmergencySchema) {
 
      await updateEmergency.mutateAsync({
        doctor: input.doctor,
        id: data.id,
        status: input.status,
        designation: input.designation,
      });
      refetchFn();

    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs" variant={"ghost"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[405px]">
        <DialogHeader>
          <DialogTitle>Edit Emergency Consultant </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultant</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {doctors.data &&
                          doctors.data?.map((doctor) => (
                            <SelectItem
                              key={doctor.id}
                              value={doctor.id}
                              className="capitalize"
                            >
                              {doctor.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {["On Duty", "Unavailable"].map((i) => (
                          <SelectItem key={i} value={i} className="capitalize">
                            {i}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                variant={"default"}
                className="flex gap-2 px-10"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && updateEmergency.isPending && (
                  <Loader className="h-4 w-4 animate-spin" />
                )}
                <span>Submit</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>{" "}
      </DialogContent>
    </Dialog>
  );
};