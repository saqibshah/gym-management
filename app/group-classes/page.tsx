import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import Actions from "../components/Actions";
import { GenderBadge } from "../components";

const TrainersPage = async () => {
  const groupClasses = await prisma.groupClass.findMany({
    include: {
      trainer: { select: { id: true, name: true } },
    },
    orderBy: { id: "asc" },
  });

  const TableHeader = () => {
    const columns = [
      "Sr#",
      "Name",
      "Trainer",
      "Time",
      "Days",
      "Shift",
      "Gender",
      "Actions",
    ];
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
        {groupClasses.map((groupClass) => (
          <Table.Row key={groupClass.id}>
            <Table.Cell>{groupClass.id}</Table.Cell>
            <Table.Cell>{groupClass.name}</Table.Cell>
            <Table.Cell>{groupClass.trainer.name}</Table.Cell>
            <Table.Cell>{groupClass.time}</Table.Cell>
            <Table.Cell>{groupClass.days.join(", ")}</Table.Cell>
            <Table.Cell>{groupClass.shift}</Table.Cell>
            <Table.Cell>
              <GenderBadge gender={groupClass.gender} />
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap="4">
                {
                  <EditButton
                    title="Edit Class"
                    href={`/group-classes/${groupClass.id}/edit`}
                  />
                }
                {
                  <DeleteButton
                    id={groupClass.id}
                    path="group-classes"
                    title="Delete Class"
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
      <Actions href="/group-classes/new" title="Add New Class" />
      <Table.Root variant="surface">
        <TableHeader />
        <TableBody />
      </Table.Root>
    </div>
  );
};

export default TrainersPage;
