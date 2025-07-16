import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditClientButton = ({ id }: { id: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/clients/${id}/edit`}>Edit Client</Link>
    </Button>
  );
};

export default EditClientButton;
