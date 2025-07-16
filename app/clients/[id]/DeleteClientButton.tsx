"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteClientButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteClient = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/clients/" + id);
      router.push("/clients");
      router.refresh();
    } catch (catch_error) {
      console.log(catch_error);
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Client
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this client? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteClient}>
                Delete Client
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This client cannot be deleted.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              OK
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteClientButton;
