import PaymentBadge from "@/app/components/PaymentBadge";
import PaymentButton from "@/app/components/PaymentButton";
import { cycleMonths } from "@/app/libs/cycleMonths";
import { prisma } from "@/prisma/client";
import { Flex, Heading, Table, Text } from "@radix-ui/themes";
import { addMonths, format } from "date-fns";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const NewPaymentPage = async ({ params }: Props) => {
  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
    include: {
      payments: {
        orderBy: { paidAt: "asc" },
      },
    },
  });

  if (!client) notFound();

  const { spanMonths, joined } = cycleMonths(client.joinedAt);

  const cycles = Array.from({ length: spanMonths })
    .map((_, i) => {
      const monthStart = addMonths(joined, i);
      const cycleMonthKey = format(monthStart, "LLLL, yyyy");
      const invoiceMonth = format(monthStart, "LLLL, yyyy");

      const payment = client.payments.find((p) => p.month === cycleMonthKey);

      return {
        amount: client.fee,
        invoiceMonth,
        status: payment ? "paid" : "pending",
        paidAt: payment ? format(new Date(payment.paidAt), "do MMMM yyyy") : "",
        method: payment?.method ?? "",
      };
    })
    .reverse();

  return (
    <>
      <Flex direction="column" gap="3" mb="5">
        <Heading>{client.name}</Heading>
        <Text>Shift: {client.shift}</Text>
        <Text>Joined: {format(new Date(client.joinedAt), "do MMM yyyy")}</Text>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Invoice Month</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Paid At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Payment Method</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cycles.map((cycle, i) => (
            <Table.Row key={i}>
              <Table.Cell>{cycle.amount}</Table.Cell>
              <Table.Cell>{cycle.invoiceMonth}</Table.Cell>
              <Table.Cell>
                <PaymentBadge
                  color={cycle.status == "paid" ? "green" : "red"}
                  label={cycle.status == "paid" ? "Paid" : "Pending"}
                />
              </Table.Cell>
              <Table.Cell>{cycle.paidAt}</Table.Cell>
              <Table.Cell>{cycle.method}</Table.Cell>
              <Table.Cell>
                {cycle.status == "paid" ? (
                  "-"
                ) : (
                  <PaymentButton
                    clientID={client.id}
                    amount={client.fee}
                    month={cycle.invoiceMonth}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* <ClientPaymentForm
        clientId={parseInt((await params).id)}
        fee={client.fee}
      /> */}
    </>
  );
};

export default NewPaymentPage;
