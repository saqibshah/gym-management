import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import TrainerForm from "../../_components/TrainerForm";

interface Props {
  params: Promise<{ id: string }>;
}

const TrainerEditPage = async ({ params }: Props) => {
  const trainer = await prisma.trainer.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!trainer) notFound();

  return <TrainerForm trainer={trainer} />;
};

export default TrainerEditPage;
