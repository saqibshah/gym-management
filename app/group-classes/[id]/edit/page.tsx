import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import GroupClassForm from "../../_components/GroupClassForm";

interface Props {
  params: Promise<{ id: string }>;
}

const GroupClassEditPage = async ({ params }: Props) => {
  const groupClass = await prisma.groupClass.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!groupClass) notFound();

  return <GroupClassForm groupClass={groupClass} />;
};

export default GroupClassEditPage;
