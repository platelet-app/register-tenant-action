import * as core from "@actions/core";
import { registerTenantQuery, getTenantByName } from "./appsyncQuery";

async function run(): Promise<void> {
  try {
    const tenantName = core.getInput("tenantName");
    const name = core.getInput("adminName");
    const emailAddress = core.getInput("adminEmail");
    const existingTenant = await getTenantByName({ name: tenantName });
    console.log("Existing tenant: ", existingTenant);
    if (!existingTenant) {
      if (!tenantName) {
        throw new Error("Tenant name is required");
      } else if (!name) {
        throw new Error("Name is required");
      } else if (!emailAddress) {
        throw new Error("Email address is required");
      }
      await registerTenantQuery({
        tenantName,
        name,
        emailAddress,
      });
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
