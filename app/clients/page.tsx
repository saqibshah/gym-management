import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Flex, Table, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Actions from "../components/Actions";
import GenderBadge from "../components/GenderBadge";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

const ClientsPage = async () => {
  const clients = await prisma.client.findMany({
    include: {
      assignedTrainer: { select: { id: true, name: true } },
    },
    orderBy: { id: "asc" },
  });

  const session = await getServerSession(authOptions);

  return (
    <div>
      <Actions href="/clients/new" title="Add New Client" />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Sr #</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Client Details</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Trainer</Table.ColumnHeaderCell>
            {session && (
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            )}
          </Table.Row>
        </Table.Header>
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
                </Flex>
              </Table.Cell>
              <Table.Cell>{client.category}</Table.Cell>
              <Table.Cell>{client.fee}</Table.Cell>
              <Table.Cell>{client.shift}</Table.Cell>
              <Table.Cell>
                {client.assignedTrainer ? client.assignedTrainer.name : "-"}
              </Table.Cell>
              {session && (
                <Table.Cell>
                  <Flex direction="column" gap="4">
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
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ClientsPage;
