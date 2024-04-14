// amplify/backend/function/appsyncOperations/opt/appSyncRequest.js
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import * as core from "@actions/core";
import { Sha256 } from "@aws-crypto/sha256-js";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import fetch, { Request } from "node-fetch";
import {
  RegisterTenantMutationVariables,
  GetTenantByTenantNameQueryVariables,
} from "./API";
import { registerTenant } from "./graphql/mutations";
import { getTenantByTenantName } from "./graphql/queries";

const request = async (queryDetails: { variables: any; query: string }) => {
  const apiURL = core.getInput("tenantApiUrl");
  const region = core.getInput("awsRegion");
  const accessKeyId = core.getInput("awsAccessKeyId");
  const secretAccessKey = core.getInput("awsSecretAccessKey");
  console.log("apiURL", apiURL);
  console.log("region", region);
  console.log("queryDetails", queryDetails);

  const endpoint = new URL(apiURL);
  const credentials = {
    accessKeyId,
    secretAccessKey,
  };
  const signer = new SignatureV4({
    credentials,
    region,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify(queryDetails),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  return await fetch(request);
};

const errorCheck = (body: any) => {
  if (body?.errors) {
    console.error(body?.errors);
    throw new Error(body?.errors[0].message);
  }
};

export const registerTenantQuery = async (
  input: RegisterTenantMutationVariables
) => {
  const response = await request({
    variables: input,
    query: registerTenant,
  });
  const body = await response.json();
  errorCheck(body);
  return body?.data?.registerTenant;
};

export const getTenantByName = async (
  variables: GetTenantByTenantNameQueryVariables
) => {
  const response = await request({
    variables,
    query: getTenantByTenantName,
  });
  const body = await response.json();
  errorCheck(body);

  console.log("aaaa: ", body?.data?.getTenantByTenantName?.items);
  return body?.data?.getTenantByTenantName?.items[0] || null;
};
