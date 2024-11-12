import NestTable from "../features/nests/NestTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddNest from "../features/nests/AddNest";
import NestTableOperations from "../features/nests/NestTableOperations";

function Nests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All nests</Heading>
        <NestTableOperations />
      </Row>

      <Row>
        <NestTable />
        <AddNest />
      </Row>
    </>
  );
}

export default Nests;
