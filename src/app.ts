import { BDLClient } from "./clients/bdl.client";
import { SDGClient } from "./clients/sdg.client";
import { MainTopicList } from "./components/main-topics-list";
// import { registerServiceWorker } from "./service-worker";

export const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  registerServiceWorker();

const bdlClient = new BDLClient();
const sdgClient = new SDGClient();
// await bdlClient.getMainTopics();
await sdgClient.getDomesticRatings();

const mainTopicsList = new MainTopicList();