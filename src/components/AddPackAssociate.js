import request from "../common/Requestor";

import {
  useAuthenticator,
  Button,
  Alert,
  TextField
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import "./../App.css";
import { useParams } from 'react-router';


export default function AddPackAssociate() {
  const { user } = useAuthenticator((context) => [context.user]);
  
  let { storeId } = useParams();
  const [addPackAssociateContent, setAddPackAssociateContent] = useState();
  const [selectedPackAssociateId, setSelectedPackAssociateId] =
    useState(undefined);
  async function addPackAssociate() {
    setAddPackAssociateContent(undefined);
    const addPackAssociateResult = await request(
      "/pack_associate/" + selectedPackAssociateId,
      "PUT",
      storeId
    );
    if (typeof addPackAssociateResult === "string") {
      setAddPackAssociateContent(
        <Alert
          variation={"error"}
          isDismissible={true}
          heading="Not Authorized"
        >
          User {user?.username} unauthorized to set pack associates in store{" "}
          {storeId}
        </Alert>
      );
    } else {
      setAddPackAssociateContent(
        <Alert
          variation={"success"}
          isDismissible={true}
          heading="Successfully added user as Pack Associate"
        >
          {selectedPackAssociateId} has been added as an pack associate with
          policy id - {addPackAssociateResult["policy-id"]}
        </Alert>
      );
    }
  }
  return (
    <div>
      <header align="left">
        {" "}
        <h4>Add Pack Associate</h4>
      </header>
      <TextField
        width="50%"
        textAlign="left"
        onChange={(e) => setSelectedPackAssociateId(e.target.value)}
        placeholder="Enter Employee Id"
        innerEndComponent=<Button onClick={() => addPackAssociate()}>
          Add Pack Associate
        </Button>
      />
      <br />
      {addPackAssociateContent}
    </div>
  );
}