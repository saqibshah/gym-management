import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Actions from "../components/Actions";
import GenderBadge from "../components/GenderBadge";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { format } from "date-fns";
import PaymentStatus from "./_components/PaymentStatus";

const ClientsPage = async () => {
  const clients = await prisma.client.findMany({
    include: {
      assignedTrainer: { select: { id: true, name: true } },
      payments: {
        select: { month: true, method: true, paidAt: true, amount: true },
        orderBy: { month: "desc" },
        take: 1,
      },
    },
    orderBy: { id: "asc" },
  });

  const session = await getServerSession(authOptions);

  const TableHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Sr #</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Client Details</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Trainer</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
          {session && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>
    );
  };

  const TableBody = () => {
    return (
      <Table.Body>
        {clients.map((client) => (
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
            <Table.Cell>{client.category}</Table.Cell>
            <Table.Cell>{client.fee}</Table.Cell>
            <Table.Cell>{client.shift}</Table.Cell>
            <Table.Cell>
              {client.assignedTrainer ? client.assignedTrainer.name : "-"}
            </Table.Cell>
            <Table.Cell>
              <PaymentStatus
                payments={client.payments.map((p) => ({
                  paidAt: p.paidAt,
                  method: p.method,
                }))}
              />
            </Table.Cell>
            {session && (
              <Table.Cell>
                <Flex direction="column" gap="4">
                  <Button>Record Payment</Button>
                  <EditButton
                    title="Edit Client"
                    href={`/clients/${client.id}/edit`}
                  />
                  <DeleteButton
                    id={client.id}
                    title="Delete Client"
                    path="clients"
                  />
                </Flex>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    );
  };

  return (
    <div>
      <Actions href="/clients/new" title="Add New Client" />

      <Table.Root variant="surface">
        <TableHeader />
        <TableBody />
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ClientsPage;
