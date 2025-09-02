import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import Actions from "../components/Actions";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

const TrainersPage = async () => {
  const trainers = await prisma.trainer.findMany({
    orderBy: { id: "asc" },
  });

  const session = await getServerSession(authOptions);

  const TableHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Sr#</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Specialization</Table.ColumnHeaderCell>
          {session && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>
    );
  };

  const TableBody = () => {
    return (
      <Table.Body>
        {trainers.map((trainer) => (
          <Table.Row key={trainer.id}>
            <Table.Cell>{trainer.id}</Table.Cell>
            <Table.Cell>{trainer.name}</Table.Cell>
            <Table.Cell>{trainer.shift}</Table.Cell>
            <Table.Cell>{trainer.specialization || "-"}</Table.Cell>
            {session && (
              <Table.Cell>
                <Flex direction="column" gap="4">
                  {
                    <EditButton
                      title="Edit Trainer"
                      href={`/trainers/${trainer.id}/edit`}
                    />
                  }
                  {
                    <DeleteButton
                      id={trainer.id}
                      path="trainers"
                      title="Delete Trainer"
                    />
                  }
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
      <Actions href="/trainers/new" title="Add New Trainer" />

      <Table.Root variant="surface">
        <TableHeader />
        <TableBody />
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TrainersPage;
