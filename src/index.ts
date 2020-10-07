#!/usr/bin/env node 

const clientID = "747441906258018415";
import { Client } from "discord-rpc";
import Logger from "@ayana/logger";
import fs from "fs";
import dotenv from "dotenv";

const log = Logger.get("distrocord");

const client: Client = new Client({transport: "ipc"});

async function getOsInfo() {
  const fileStr = await fs.promises.readFile("/etc/os-release");
  const data = dotenv.parse(fileStr);
  const imagekey = data.ID;
  const distro = data.NAME;
  const desktopSession = process.env.DESKTOP_SESSION;

  client.setActivity({
    details: distro,
    startTimestamp: new Date(),
    largeImageKey: imagekey.toLowerCase(),
    smallImageKey: desktopSession?.toLowerCase(),
    smallImageText: desktopSession,
    largeImageText: distro
  });
}

client.on("ready", () => {
  log.info("ready");
  getOsInfo();
});

client.on("connected", () => {
  log.info("rich presence connected");
});
  

client.login({clientId: clientID});