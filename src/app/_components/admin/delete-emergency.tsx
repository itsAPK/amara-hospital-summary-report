'use client'
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export const DeleteEmergency = ({
  id,
  refetchFn,
}: {
  id: string;
  refetchFn: () => void;
}) => {
  const deleteEmergency = api.emergency.delete.useMutation({
    onSuccess: () => {
      refetchFn();
      toast.success("Emergency Deleted Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function onSubmit() {
    await deleteEmergency.mutateAsync({ id: id });
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
      {deleteEmergency.isPending && (
          <Loader className="h-4 w-4 animate-spin" />
        )}
      Delete
    </Button>
  );
};
