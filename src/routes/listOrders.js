import request from "../common/Requestor";
import Layout from "../components/Layout";

import {
  useAuthenticator,
  Button,
  Alert,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Link,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import "../App.css";

import { useParams } from "react-router";

export default function ListOrders() {
  const { user } = useAuthenticator((context) => [context.user]);
  let { storeId } = useParams();
  const [ordersList, setOrdersList] = useState();
  let listOrderContent = <p>loading...</p>;
  let loadedStore = undefined;
  async function loadAndSetOrdersList() {
    if (!(loadedStore && loadedStore == storeId)) {
      loadedStore = storeId;
      const listOrdersResult = await request("/orders", "GET", storeId);
      setOrdersList(listOrdersResult);
    }
  }
  if (typeof ordersList === "string") {
    loadedStore = undefined;
    listOrderContent = (
      <Alert variation={"error"} isDismissible={true} heading="Not Authorized">
        User {user?.username} unauthorized to list orders for store {storeId}
      </Alert>
    );
  } else if (Array.isArray(ordersList)) {
    listOrderContent = (
      <Table size="small" variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Order-Id</TableCell>
            <TableCell as="th">Product Name</TableCell>
            <TableCell as="th">Toy Category</TableCell>
            <TableCell as="th">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList.map((order) => (
            <TableRow>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.toyCategory}</TableCell>
              <TableCell>
                <Link href={"./order/" + order.orderId}>Load Order</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  useEffect(() => {
    console.log(storeId, user);
    loadAndSetOrdersList();
  }, []);

  return (
    <div>
      <Layout>
        <h2>Orders</h2>
        {listOrderContent}
      </Layout>
    </div>
  );
}
