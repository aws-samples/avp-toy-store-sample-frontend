import request from "../common/Requestor";
//import labelImage from "../../public/label.jpeg"
//import receiptImage from "../../public/receipt.jpeg"
import {
  useAuthenticator,
  Card,
  Button,
  Flex,
  Divider,
  Alert,
  Collection,
  Text,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import "../App.css";

import { useParams } from "react-router";
import Layout from "../components/Layout";

//Map of Button Name and Cedar Action Name
var availableActionButtons = [
  {
    name: "Get Box Size",
    cedarAction: "GetOrderBoxSize",
  },
  {
    name: "Mark as Shipped",
    cedarAction: "SetOrderShipped",
  },
  {
    name: "Cancel Order",
    cedarAction: "DeleteOrder",
  },
  {
    name: "Route to different warehouse",
    cedarAction: "ReRouteOrder",
  },
];

export default function Order() {
  const { user } = useAuthenticator((context) => [context.user]);
  let [orderDetailsContent, setOrderDetailsContent] = useState(undefined);
  let [orderLabelContent, setOrderLabelContent] = useState(undefined);
  let [orderReceiptContent, setOrderReceiptContent] = useState(undefined);
  let [orderButtonContent, setOrderButtonContent] = useState(undefined);

  let { storeId } = useParams();
  let { orderId } = useParams();
  async function loadAndSetOrderDetails() {
    setOrderDetailsContent("loading...");
    let orderDetailsResult = await request("/order/" + orderId, "GET", storeId);
    if (typeof orderDetailsResult === "string") {
      setOrderDetailsContent(
        <Alert
          variation={"error"}
          isDismissible={true}
          heading={orderDetailsResult}
        >
          User {user?.username} unauthorized to access order {orderId} in store - 
          {storeId}
        </Alert>
      );
    } else {
      setOrderDetailsContent(
        <div align="left">
          <h3>Order ID : {orderDetailsResult.orderId}</h3>
          <Text> Product Name: {orderDetailsResult.productName}</Text>
          <Text> Category: {orderDetailsResult.toyCategory}</Text>
        </div>
      );
    }
  }
  async function loadAndSetOrderButtonsContent(orderPermissionsResult) {
    setOrderButtonContent(undefined);

    setOrderButtonContent(
      <Collection
        type="list"
        items={availableActionButtons}
        gap="1.5rem"
        direction="row"
      >
        {(button) => (
          <Button
            isDisabled={!orderPermissionsResult.includes(button.cedarAction)}
          >
            {button.name}
          </Button>
        )}
      </Collection>
    );
  }

  async function loadAndSetOrderLabel(orderPermissionsResult) {
    var unauthorizedOrderLabelContent = (
      <Alert variation={"error"} isDismissible={true}>
        User {user?.username} unauthorized to access order Label for {orderId}
        in store {storeId}
      </Alert>
    );
    setOrderLabelContent("loading...");
    if (orderPermissionsResult.includes("GetOrderLabel")) {
      request("/order/" + orderId + "/label", "GET", storeId).then(
        (orderLabelResult) => {
          if (typeof orderLabelResult === "string") {
            setOrderLabelContent(unauthorizedOrderLabelContent);
          } else {
            setOrderLabelContent(
              <Card variation="outlined" align="left">
                <p align="left">Succesfully got order Receipt</p>
                <img src="/label.jpeg" width="20%" height="20%" />
              </Card>
            );
          }
        }
      );
    } else {
      setOrderLabelContent(unauthorizedOrderLabelContent);
    }
  }
  async function loadAndSetOrderReceipt(orderPermissionsResult) {
    var unauthorizedOrderReceiptContent = (
      <Alert variation={"error"} isDismissible={true}>
        User {user?.username} unauthorized to access order Label for {orderId}{" "}
        in store {storeId}
      </Alert>
    );
    setOrderReceiptContent("loading...");
    if (orderPermissionsResult.includes("GetOrderReceipt")) {
      request("/order/" + orderId + "/receipt", "GET", storeId).then(
        (orderLabelResult) => {
          if (typeof orderLabelResult === "string") {
            setOrderReceiptContent(unauthorizedOrderReceiptContent);
          } else {
            setOrderReceiptContent(
              <Card variation="outlined" align="left">
                <p align="left">Succesfully got order Receipt</p>
                <img src="/receipt.jpeg" width="20%" height="20%" />
              </Card>
            );
          }
        }
      );
    } else {
      setOrderReceiptContent(unauthorizedOrderReceiptContent);
    }
  }
  let loaded;
  async function loadAndSetOrder() {
    if (loaded) {
      return;
    }
    loaded = true;
    const orderPermissionsResult = await request(
      "/order/" + orderId + "/permissions",
      "GET",
      storeId
    );
    if (typeof orderLabelResult === "string") {
      loaded = false;
    } 
    await loadAndSetOrderDetails();
    loadAndSetOrderLabel(orderPermissionsResult);
    loadAndSetOrderReceipt(orderPermissionsResult);
    loadAndSetOrderButtonsContent(orderPermissionsResult);
  }

  useEffect(() => {
    loadAndSetOrder();
  }, []);

  return (
    <div>
      <Layout>
        <div>
          <h3 align="left">Order Details </h3>
          {orderButtonContent}
          {orderDetailsContent}
          <Divider />
          <h4 align="left">Label</h4>
          {orderLabelContent}
          <Divider />
          <h4 align="left">Receipt</h4>
          {orderReceiptContent}
        </div>
      </Layout>
    </div>
  );
}
