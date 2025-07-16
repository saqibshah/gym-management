import { prisma } from "@/prisma/client";
import ClientForm from "../../_components/ClientForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditClientPage = async ({ params }: Props) => {
  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!client) notFound();

  return <ClientForm client={client} />;
};

export default EditClientPage;
