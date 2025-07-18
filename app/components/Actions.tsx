import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const Actions = ({ title, href }: Props) => {
  return (
    <div className="mb-4">
      <Button>
        <Link href={href}>{title}</Link>
      </Button>
    </div>
  );
};

export default Actions;
