import request from "../common/Requestor";
import {
  useAuthenticator,
  Button,
  Alert,
  TextField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import "./../App.css";
import { useParams } from 'react-router';


export default function AddStoreManager() {
  const { user } = useAuthenticator((context) => [context.user]);
  let { storeId } = useParams();
  const [addStoreManagerContent, setAddStoreManagerContent] = useState();
  const [selectedStoreManagerId, setSelectedStoreManagerId] =
    useState(undefined);
  async function addStoreManager() {
    setAddStoreManagerContent(undefined);
    const addStoreManagerResult = await request(
      "/store_manager/" + selectedStoreManagerId,
      "PUT",
      storeId
    );
    if (typeof addStoreManagerResult === "string") {
      setAddStoreManagerContent(
        <Alert
          variation={"error"}
          isDismissible={true}
          heading="Not Authorized"
        >
          User {user?.username} unauthorized to set store manager in store{" "}
          {storeId}
        </Alert>
      );
    } else {
      setAddStoreManagerContent(
        <Alert
          variation={"success"}
          isDismissible={true}
          heading="Successfully added user as Store Manager"
        >
          {selectedStoreManagerId} has been added as an store manager with
          policy id - {addStoreManagerResult["policy-id"]}
        </Alert>
      );
    }
  }
  return (
    <div>
      <header align="left">
        {" "}
        <h4>Add Store Manager </h4>
      </header>
      <TextField
        width="50%"
        textAlign="left"
        onChange={(e) => setSelectedStoreManagerId(e.target.value)}
        placeholder="Enter Employee Id"
        innerEndComponent=<Button onClick={() => addStoreManager()}>
          Add Store Manager
        </Button>
      />
      <br />
      {addStoreManagerContent}
    </div>
  );
}