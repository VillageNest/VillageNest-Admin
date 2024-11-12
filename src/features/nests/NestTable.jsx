import Spinner from "../../ui/Spinner";
import NestRow from "./NestRow";
import { useNest } from "./useNest";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function NestTable() {
  const { isLoading, nests } = useNest();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!nests.length) return <Empty resourceName="nests" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredNests;
  if (filterValue === "all") filteredNests = nests;
  if (filterValue === "no-discount")
    filteredNests = nests.filter((nest) => nest.discount === 0);
  if (filterValue === "with-discount")
    filteredNests = nests.filter((nest) => nest.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedNests = filteredNests.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

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
          data={sortedNests}
          render={(nest) => <NestRow nest={nest} key={nest.id} />}
        />
      </Table>
    </Menus>
  );
}

export default NestTable;
