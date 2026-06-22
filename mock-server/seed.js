// Copy the original DB to a working file so json-server's writes
// don't modify mock-data/bd.json (the deliverable original).
const { copyFileSync } = require("node:fs");

copyFileSync("../mock-data/bd.json", "db.json");
console.log("Seeded db.json from mock-data/bd.json");
