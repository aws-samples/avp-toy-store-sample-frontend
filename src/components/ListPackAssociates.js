import request from "../common/Requestor";

import {
  useAuthenticator,
  Collection,
  Card,
  Expander,
  ExpanderItem,
  Button,
  Flex,
  Text,
  Alert,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import "./../App.css";
import { useParams } from "react-router";

export default function ListPackAssociates() {
  const { user } = useAuthenticator((context) => [context.user]);

  let { storeId } = useParams();
  async function loadAndSetPackAssociates() {
    const packAssociatesResult = await request(
      "/pack_associate",
      "GET",
      storeId
    );
    setPackAssociates(packAssociatesResult);
  }
  const [packAssociates, setPackAssociates] = useState(undefined);

  let packAssociatesContent = <p>loading...</p>;
  if (Array.isArray(packAssociates)) {
    const items = packAssociates.map((packAssociateStr) => ({
      title: packAssociateStr,
    }));
    packAssociatesContent = (
      <Collection type="list" items={items} gap="1.5rem">
        {(item, index) => (
          <Card key={index} padding="0.1rem" textAlign={"left"}>
            <Text>{item.title}</Text>
          </Card>
        )}
      </Collection>
    );
  } else if (typeof packAssociates === "string") {
    packAssociatesContent = (
      <Alert variation={"error"} isDismissible={true} heading="Not Authorized">
        User {user?.username} un-authorized to access listing pack associated in
        store {storeId}
      </Alert>
    );
  }

  useEffect(() => {
    loadAndSetPackAssociates();
  });

  return (
    <div>
      <header align="left">
        {" "}
        <h4>Pack Associates</h4>
      </header>
      <Flex gap={"1.25rem"} direction={"column"}>
        <Expander marginBottom={"1rem"}>
          <ExpanderItem title="Pack Associates" value="expander-item">
            {packAssociatesContent}
          </ExpanderItem>
        </Expander>
        <Button onClick={loadAndSetPackAssociates}>
          Refresh Pack Associates{" "}
        </Button>{" "}
        <br />
      </Flex>
    </div>
  );
}
