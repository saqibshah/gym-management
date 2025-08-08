import { Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import authOptions from "../auth/authOptions";
import Actions from "../components/Actions";

const LoadingClientsPage = async () => {
  const clients = [1, 2, 3, 4, 5];
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Actions href="/group-classes/new" title="Add New Class" />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Sr#</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Trainer</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Days</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
            {session && (
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client}>
              <Table.Cell>
                {" "}
                <Skeleton />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Skeleton />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Skeleton />{" "}
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              {session && (
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingClientsPage;
