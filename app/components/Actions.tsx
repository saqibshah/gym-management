import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

interface Props {
  title: string;
  href: string;
}

const Actions = async ({ title, href }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  return (
    <div className="mb-4">
      <Button>
        <Link href={href}>{title}</Link>
      </Button>
    </div>
  );
};

export default Actions;
