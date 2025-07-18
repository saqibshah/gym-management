import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const EditButton = ({ title, href }: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={href}>{title}</Link>
    </Button>
  );
};

export default EditButton;
