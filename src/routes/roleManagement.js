import request from "../common/Requestor";
import Layout from "../components/Layout";

import ListPackAssociates from "../components/ListPackAssociates";
import AddPackAssociate from "../components/AddPackAssociate";
import AddStoreManager from "../components/AddStoreManager";
import ListStoreManagers from "../components/ListStoreManagers";

import {
  useAuthenticator,
  Alert,
  Flex,
  Tabs,
  TabItem,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";

import { useParams } from "react-router";

export default function RoleManagement() {
  const { user } = useAuthenticator((context) => [context.user]);
  let { storeId } = useParams();
  const [storePermissions, setStorePermissions] = useState();
  let roleManagementContent = <p>loading...</p>;

  async function loadAndSetStorePermissions() {
    const storePermissionsResult = await request(
      "/permissions",
      "GET",
      storeId
    );
    setStorePermissions(storePermissionsResult);
  }
  if (typeof storePermissions === "string") {
    roleManagementContent = (
      <Alert
        variation={"error"}
        isDismissible={true}
        heading={storePermissions}
      >
        User {user?.username} unauthorized to manage roles for store {storeId}
      </Alert>
    );
  } else if (Array.isArray(storePermissions)) {
    let authorizedForPackAssociateRoleManagement =
      storePermissions.includes("AddPackAssociate") ||
      storePermissions.includes("ListPackAssociates");
    let authorizedForStoreManagerRoleManagement =
      storePermissions.includes("AddStoreManager") ||
      storePermissions.includes("ListStoreManagers");

    roleManagementContent = (
      <div>
        {!authorizedForPackAssociateRoleManagement &&
        !authorizedForStoreManagerRoleManagement ? (
          <Alert
            variation={"error"}
            isDismissible={true}
            heading="Unauthorized"
          >
            User {user?.username} unauthorized to list pack associates for store{" "}
            {storeId}
          </Alert>
        ) : (
          <Tabs justifyContent="flex-start">
            <TabItem
              title="Pack Associates Membership"
              isDisabled={!authorizedForPackAssociateRoleManagement}
            >
              <div>
                {storePermissions.includes("ListPackAssociates") ? (
                  <ListPackAssociates />
                ) : (
                  <Alert
                    variation={"error"}
                    isDismissible={true}
                    heading="Unauthorized"
                  >
                    User {user?.username} unauthorized to list pack associates
                    for store {storeId}
                  </Alert>
                )}
                {storePermissions.includes("AddPackAssociate") ? (
                  <AddPackAssociate />
                ) : (
                  <Alert
                    variation={"error"}
                    isDismissible={true}
                    heading="Unauthorized"
                  >
                    User {user?.username} unauthorized to add pack associate for
                    store {storeId}
                  </Alert>
                )}
              </div>
            </TabItem>
            <TabItem
              title="Store Manager Membership"
              isDisabled={!authorizedForStoreManagerRoleManagement}
            >
              {storePermissions.includes("ListStoreManagers") ? (
                <ListStoreManagers />
              ) : (
                <Alert
                  variation={"error"}
                  isDismissible={true}
                  heading="Unauthorized"
                >
                  User {user?.username} unauthorized to list store manager for
                  store {storeId}
                </Alert>
              )}
              {storePermissions.includes("AddStoreManager") ? (
                <AddStoreManager />
              ) : (
                <Alert
                  variation={"error"}
                  isDismissible={true}
                  heading="Unauthorized"
                >
                  User {user?.username} unauthorized to add store manager for
                  store {storeId}
                </Alert>
              )}
            </TabItem>
          </Tabs>
        )}
      </div>
    );
  }

  useEffect(() => {
    loadAndSetStorePermissions();
  });

  return (
    <div>
      <Layout>
        <h2>Role Management</h2>
        {roleManagementContent}
      </Layout>
    </div>
  );
}
