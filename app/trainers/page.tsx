import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import Actions from "../components/Actions";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

const TrainersPage = async () => {
  const trainers = await prisma.trainer.findMany({
    orderBy: { id: "asc" },
  });

  const TableHeader = () => {
    const columns = ["Sr#", "Name", "Shift", "Specialization", "Actions"];
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
        {trainers.map((trainer) => (
          <Table.Row key={trainer.id}>
            <Table.Cell>{trainer.id}</Table.Cell>
            <Table.Cell>{trainer.name}</Table.Cell>
            <Table.Cell>{trainer.shift}</Table.Cell>
            <Table.Cell>{trainer.specialization || "-"}</Table.Cell>
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

export default TrainersPage;
