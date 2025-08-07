import { prisma } from "@/prisma/client";
import ClientPaymentForm from "../../_components/PaymentForm";
import { notFound } from "next/navigation";
import { Flex, Heading, Table, Text } from "@radix-ui/themes";
import { addMonths, differenceInMonths, format } from "date-fns";
import PaymentBadge from "@/app/components/PaymentBadge";
import PaymentButton from "@/app/components/PaymentButton";

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

  const joined = new Date(client.joinedAt);
  const today = new Date();

  // 1) How many *full* months have passed since joined?
  const fullMonths = differenceInMonths(today, joined);

  // 2) Should we include the *current* partial month?
  const includeCurrent = today.getDate() >= joined.getDate();

  // 3) Span = fullMonths + maybe the current
  let spanMonths = fullMonths + (includeCurrent ? 1 : 0);

  // 4) But at minimum, always show 1 cycle
  spanMonths = Math.max(1, spanMonths);

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
