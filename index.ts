import concurrently from "concurrently";
concurrently([
    {
        name: "client",
        command: "bun dev",
        cwd: "./client",
        prefixColor: "cyan"
    },
    {
        name: "server", 
        command: "bun index.js",
        cwd: "./server",
        prefixColor: "green" 
    }
])