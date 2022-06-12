const {
  Client,
  Intents,
  Collection,
  Message,
  MessageEmbed,
} = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  disableMentions: "everyone",
});

const { promisify } = require("SlashCommands");
const Ascii = require("ascii-table");
const { glob } = require("glob");
const PG = promisify(glob);
require("colors");

module.exports = client;

// Global Variables
client.commands = new Collection();
client.SlashCommands = new Collection();
client.slashcategories = require("fs").readdirSync("./SlashCommands");


["Events", "Commands", "SlashCommands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG);
});

client.on("ready", () => {
  console.log(`${client.user.tag} (${client.user.id}) is ready and up to go!`);
});


client.login(token);
