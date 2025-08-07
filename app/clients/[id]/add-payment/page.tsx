import { prisma } from "@/prisma/client";
import ClientPaymentForm from "../../_components/PaymentForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const NewPaymentPage = async ({ params }: Props) => {
  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!client) notFound();

  return (
    <ClientPaymentForm
      clientId={parseInt((await params).id)}
      fee={client.fee}
    />
  );
};

export default NewPaymentPage;
