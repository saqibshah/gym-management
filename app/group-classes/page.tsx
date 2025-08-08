import { prisma } from "@/prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import React from "react";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import Actions from "../components/Actions";
import { GenderBadge } from "../components";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

const TrainersPage = async () => {
  const groupClasses = await prisma.groupClass.findMany({
    include: {
      trainer: { select: { id: true, name: true } },
    },
    orderBy: { id: "asc" },
  });

  const session = await getServerSession(authOptions);

  const TableHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Sr#</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Trainer</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Days</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
          {session && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
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
            {session && (
              <Table.Cell>
                <Flex direction="column" gap="4">
                  <Button>
                    <Link href={`/group-classes/${groupClass.id}/clients`}>
                      View Clients
                    </Link>
                  </Button>
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
            )}
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

export const dynamic = "force-dynamic";

export default TrainersPage;
