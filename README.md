[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/aws-samples/avp-toy-store-sample-frontend)


# Introduction

This sample web application demonstrates authentication and policy-based authorization for different user types to an imaginary toy store. The toy store takes orders online and then send them to customers through multiple warehouses. This application is used by warehouses to help sending orders to customers.
The application uses Amazon Cognito for authentication and uses Amazon Verified Permissions for policy-based authorization. Additionally, the application uses API-Gateway as the front-door to the application, and Lambda to process requests.

This application is split across 2 packages 

1. [avp-toy-store-sample](https://github.com/aws-samples/avp-toy-store-sample) package contains the backend code, include API-Gateway, Lambda's and Verified Permissions 

2. [avp-toy-store-sample-frontend] (https://github.com/aws-samples/avp-toy-store-sample-frontend) package contains the frontend code and Cognito configuration.

You can find further details about the sampel application, including it's design and deployment by referring to the [avp-toy-store-sample readme file](https://gitlab.aws.dev/pabhi/avp-toy-store-sample/-/blob/main/README.md?ref_type=heads). 

You can deploy this package to you AWS account by using the deploy using Amplify button.  