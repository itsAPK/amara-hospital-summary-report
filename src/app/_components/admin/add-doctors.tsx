"use client";
import { AddDoctorSchema, addDoctorSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader, PlusIcon } from "lucide-react";
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
import { useQueryClient } from "@tanstack/react-query";

export const AddDoctor = ({ refetchFn }: { refetchFn: () => void }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const form = useForm<AddDoctorSchema>({
    resolver: zodResolver(addDoctorSchema),
  });

  const createDoctor = api.doctor.create.useMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      refetchFn();
      toast.success("Doctor Created Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

 async function onSubmit(input: AddDoctorSchema) {
   
      await createDoctor.mutateAsync(input);
   
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 size-4 shrink-0" aria-hidden="true" />
          Add Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[405px]">
        <DialogHeader>
          <DialogTitle>Add Doctor </DialogTitle>
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
                {form.formState.isSubmitting && createDoctor.isPending && (
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
