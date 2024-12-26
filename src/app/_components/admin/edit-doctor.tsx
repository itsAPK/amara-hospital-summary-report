/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { AddDoctorSchema, addDoctorSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader, PencilIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export const EditDoctor = ({
  refetchFn,
  data,
}: {
  refetchFn: () => void;
  data: any;
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isupdatePending, startupdateTransition] = React.useTransition();
  const form = useForm<AddDoctorSchema>({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: {
      name: data.name,
      mobile: data.mobile,
    },
  });

  const updateDoctor = api.doctor.update.useMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      refetchFn();
      toast.success("Doctor updated Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

 async function onSubmit(input: AddDoctorSchema) {
      await updateDoctor.mutateAsync({ ...input, id: data.id });

  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="xs"
          className="gap-2 text-center text-xs"
          onClick={() => {
            setOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[405px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor </DialogTitle>
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
                  <FormLabel>Doctor Name</FormLabel>
                  <FormControl>
                    <Input className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input className="resize-none" {...field} />
                  </FormControl>
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
                {form.formState.isSubmitting && updateDoctor.isPending && (
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
