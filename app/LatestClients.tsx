import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import PaymentStatus from "./clients/_components/PaymentStatus";

const LatestClients = async () => {
  const clients = await prisma.client.findMany({
    orderBy: { joinedAt: "desc" },
    take: 5,
    include: {
      _count: {
        select: {
          payments: true,
        },
      },
    },
  });

  return (
    <Card>
      <Heading size="4" mb="3">
        Latest Clients
      </Heading>
      <Table.Root>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>
                <Flex direction="column" gap="2" align="start">
                  {client.name}
                  <PaymentStatus
                    joinedAt={client.joinedAt}
                    payments={client._count.payments}
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestClients;
