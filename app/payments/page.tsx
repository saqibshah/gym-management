import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";

const PaymentsPage = async () => {
  const payments = await prisma.payment.findMany({
    include: { client: { select: { id: true, name: true } } },
  });

  const TableHeader = () => {
    const columns = ["Client", "Amount", "Month", "Method"];
    return (
      <Table.Header>
        <Table.Row>
          {columns.map((column, idx) => (
            <Table.ColumnHeaderCell key={idx + 1}>
              {column}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  };

  const TableBody = () => {
    return (
      <Table.Body>
        {payments.map((payment) => (
          <Table.Row key={payment.id}>
            <Table.Cell>{payment.client.name}</Table.Cell>
            <Table.Cell>{payment.amount}</Table.Cell>
            <Table.Cell>{payment.month}</Table.Cell>
            <Table.Cell>{payment.method}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  };

  return (
    <div>
      <Table.Root variant="surface">
        <TableHeader />
        <TableBody />
      </Table.Root>
    </div>
  );
};

export default PaymentsPage;
