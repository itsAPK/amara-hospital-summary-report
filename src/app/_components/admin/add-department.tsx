/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";
import { AddDepartmentSchema, addDepartmentSchema } from "@/lib/schema";
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

export const AddDepartment = ({ refetchFn }: { refetchFn: any }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const doctors = api.doctor.getAll.useQuery();

  const form = useForm<AddDepartmentSchema>({
    resolver: zodResolver(addDepartmentSchema),
  });

  const createDepartment = api.department.create.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Department Created Successfully");
      setOpen(false);
      refetchFn();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function onSubmit(input: AddDepartmentSchema) {
    await createDepartment.mutateAsync(input);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 size-4 shrink-0" aria-hidden="true" />
          Add Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[405px]">
        <DialogHeader>
          <DialogTitle>Add Department </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="onDutyDoctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>On Duty Doctor</FormLabel>
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
              name="unavailableDoctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unavailable Doctor</FormLabel>
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
            <DialogFooter>
              <Button
                type="submit"
                variant={"default"}
                className="flex gap-2 px-10"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && isCreatePending && (
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
