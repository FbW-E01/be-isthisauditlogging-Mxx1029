import { Low, JSONFile } from 'lowdb';

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

await db.read();

db.data = db.data || { logs: [] };

const { logs } = db.data;

export async function writeLog(request) {
    const logDate = new Date();
    logs.push("> [" + logDate.toISOString() + "] " + request.path + " accessed" );
    // db.data.logs.push("new log");
    console.log(logs);
    console.log("Writing database to file");
    await db.write();
}

export function outputLogs() {
    return db.data;
}