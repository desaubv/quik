
import type { QuikServer } from "./server.js";

let activeServer: QuikServer | undefined;

function registerServer(server: QuikServer) {
    activeServer = server;
}

function getServer(): QuikServer {
    if (!activeServer) {
        throw new Error(
            "Quik server has not been initialized. Call Server() first."
        );
    }

    return activeServer;
}

export {
    registerServer,
    getServer,
};
