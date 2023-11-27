import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import {
  useAuthenticator,
  View,
  Flex,
  SelectField,
  Button,
  Heading,
  Link,
} from "@aws-amplify/ui-react";

export const stores = [
  "toy store 1",
  "toy store 2",
  "toy store 3",
  "toy store 4",
  "toy store 5",
];

function Layout(props) {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  let { storeId } = useParams();
  return (
    <div>
      <View
        as="header"
        padding="10px"
        backgroundColor="var(--amplify-colors-white)"
      >
        <Flex direction="row" justifyContent="space-around" alignItems="center">
          <Flex>
            <SelectField
              label="Select Store"
              value={storeId}
              onChange={(e) => navigate("/store/" + e.target.value + "/home")}
            >
              {stores.map((storeName) => (
                <option key={storeName} value={storeName}>
                  {storeName}
                </option>
              ))}
            </SelectField>
          </Flex>
          <Flex>
            <Heading level={4} textAlign="center">
              Welcome to ToyStore
            </Heading>
          </Flex>
          <Flex>
            <Heading level={6} textAlign="center">
              Hello {user?.username}
              <Button variation="link" onClick={signOut}>
                Sign out
              </Button>
            </Heading>
          </Flex>
        </Flex>
        <Flex direction="row" justifyContent="space-around" alignItems="center">
          <Link href={"/store/" + storeId + "/home"}>Home</Link>
          <Link href={"/store/" + storeId + "/orders"}>Order Management</Link>
          <Link href={"/store/" + storeId + "/roleManagement"}>
            Role Management
          </Link>
        </Flex>
      </View>
      <View as="div" padding="10px">
        <Flex direction="row" justifyContent="space-around" alignItems="center">
          <Flex width="7%"></Flex>

          <View
            padding="10px"
            as="div"
            level={1}
            textAlign="center"
            backgroundColor="var(--amplify-colors-white)"
            width="70%"
            minHeight="300px"
            boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
            opacity="90"
          >
            {props.children}
          </View>
          <Flex width="7%"></Flex>
        </Flex>
      </View>
    </div>
  );
}
export default Layout;
