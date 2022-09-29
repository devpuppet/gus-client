import { BDLClient } from "./clients/bdl-client";

const bdlClient = new BDLClient();
await bdlClient.sendGet();