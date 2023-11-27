import Layout from "../components/Layout";

import {
  withAuthenticator,
  Card,
  View,
  Image,
  Flex,
  Text,
  Link,
  Heading,
  Collection,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "../App.css";

function Home({ signOut, user, storeId }) {
  return (
    <div>
      <Layout >
      
            <Flex direction="row" alignItems="space-between" justifyContent="center">
              <View width="45%">
                <Card variation="outlined" height = "125px">
                  <Heading level={5}>Order Management</Heading>
                  <Text as="div">
                    View all orders or view details of a specific order
                  </Text>
                  <Link href="./orders">View Orders</Link>
                </Card>
              </View>
              <View width="45%" >
                <Card variation="outlined" height = "125px">
                  <Heading level={5}>Role Management</Heading>
                  <Text as="div">
                    You can view and edit store managers and pack associates in
                    this module
                  </Text>
                  <Link href="./roleManagement">View Roles</Link>
                </Card>
              </View>
            </Flex>
          </Layout>
    </div>
  );
}
export default withAuthenticator(Home, {
  hideSignUp: true,
  signUpAttributes: ["name"],
});
