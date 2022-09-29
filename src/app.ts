import { BDLClient } from "./clients/bdl.client";
import { MainTopicList } from "./components/main-topics-list";

const bdlClient = new BDLClient();
// await bdlClient.getMainTopics();

const mainTopicsList = new MainTopicList();