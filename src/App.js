import { Amplify, Auth } from "aws-amplify";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routeConfiguration";

import {
  withAuthenticator,
  Button,
  Heading,
  Flex,
  View,
  TabItem,
  Tabs,
  SelectField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  return (
    <div className={"App"}>
        <RouterProvider router={router} />
    </div>
  );
}

export default withAuthenticator(App, {
  hideSignUp: true,
  signUpAttributes: ["name"],
}); 
