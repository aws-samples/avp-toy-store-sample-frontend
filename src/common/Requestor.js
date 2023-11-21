import { Auth } from "aws-amplify";
const ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT || "https://iitbv428qh.execute-api.ap-south-1.amazonaws.com/prod"; 

async function getToken(type) {
  if ("ID" === type)
    return await Auth.currentSession().then((data) => {
      return data.getIdToken().getJwtToken();
    });
  else if ("ACCESS" === type)
    return await Auth.currentSession().then((data) => {
      return data.getAccessToken().getJwtToken();
    });
}

export default async function request(actionPath, action, storeId) {

  const params = new URLSearchParams(window.location.search);
  let optimized = params.get('optimized') || false;
  const path = "/store/" + storeId + actionPath ;
  const queryParams = '?' + 'optimized=' + optimized;
  const result = await fetch(
    ENDPOINT +  path + queryParams,
    {
      method: action,
      headers: {
        Authorization: await getToken("ID"),
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  if (result.status === 403) {
    return "Unauthorized";
  } else if (result.status !== 200) {
    return `Error: ${result.status}`;
  }
  return result.json();
}
