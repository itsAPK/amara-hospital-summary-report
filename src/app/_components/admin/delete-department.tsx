'use client'
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export const DeleteDepartment = ({
  id,
  refetchFn,
}: {
  id: string;
  refetchFn: () => void;
}) => {
  const deleteDepartment = api.department.delete.useMutation({
    onSuccess: () => {
      refetchFn();
      toast.success("Department Deleted Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function onSubmit() {
    await deleteDepartment.mutateAsync({ id: id });
  }
  return (
    <Button
      variant={"destructive-ghost"}
      size="xs"
      className="gap-2 text-center text-xs"
      onClick={async () => {
        await onSubmit();
      }}
    >
     
     {deleteDepartment.isPending && (
          <Loader className="h-4 w-4 animate-spin" />
        )} Delete
    </Button>
  );
};
