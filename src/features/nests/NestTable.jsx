import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import NestRow from "./NestRow";
import { useNest } from "./useNest";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function NestTable() {
  const { isLoading, nests } = useNest();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Nest</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={nests}
          render={(nest) => <NestRow nest={nest} key={nest.id} />}
        />
      </Table>
    </Menus>
  );
}

export default NestTable;
