import { prisma } from "@/prisma/client";
import { Card, Heading, Table } from "@radix-ui/themes";
import { formatMoney } from "./libs/formatMoney";

const RecentPayments = async () => {
  const payments = await prisma.payment.findMany({
    orderBy: { paidAt: "desc" },
    include: { client: { select: { id: true, name: true } } },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="3">
        Recent Payments
      </Heading>
      <Table.Root>
        <Table.Body>
          {payments.map((payment) => (
            <Table.Row key={payment.id}>
              <Table.Cell>{payment.client.name}</Table.Cell>
              <Table.Cell>{formatMoney(payment.amount)}</Table.Cell>
              <Table.Cell>{payment.paidAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default RecentPayments;
