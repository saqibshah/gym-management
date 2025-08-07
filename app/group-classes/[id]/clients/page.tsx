import PaymentStatus from "@/app/clients/_components/PaymentStatus";
import { GenderBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Callout, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const GroupClassClients = async ({ params }: Props) => {
  const groupClass = await prisma.groupClass.findUnique({
    where: { id: parseInt((await params).id) },
    include: {
      clients: {
        include: {
          _count: {
            select: {
              payments: true,
            },
          },
        },
      },
      trainer: { select: { name: true } },
    },
  });

  if (!groupClass) notFound();

  return (
    <div>
      <Flex direction="column" gap="3" mb="5">
        <Heading>{groupClass.name}</Heading>
        <Text>Trainer: {groupClass.trainer.name}</Text>
        <Text>Shift: {groupClass.shift}</Text>
        <Text>Time: {groupClass.time}</Text>
        <Text>Days: {groupClass.days.join(", ")}</Text>
      </Flex>

      {groupClass.clients.length ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Sr #</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Client Details</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {groupClass.clients.map((client) => (
              <Table.Row key={client.id}>
                <Table.Cell>{client.id}</Table.Cell>
                <Table.Cell>
                  <Flex direction="column" gap="2">
                    <Text>{client.name}</Text>
                    <Text>
                      <GenderBadge gender={client.gender} />
                    </Text>
                    <Text>{client.contact}</Text>
                    <Text>
                      Joined: {format(new Date(client.joinedAt), "do MMM yyyy")}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell>{client.fee}</Table.Cell>
                <Table.Cell>
                  <PaymentStatus
                    joinedAt={client.joinedAt}
                    payments={client._count.payments}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Callout.Root color="yellow">
          <Callout.Text>No Clients Found.</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};

export default GroupClassClients;
