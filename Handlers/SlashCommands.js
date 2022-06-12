const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { server } = require('../config.json')

module.exports = async (client) => {
    const Table = new Ascii('Slash Commands Loaded');
    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/SlashCommands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name) return Table.addRow(file.split('/')[7], '❌ Failed', 'Missing a name!');
        if (!command.description) return Table.addRow(command.name, '❌ Failed', 'Missing a description!');

        client.SlashCommands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, '✅ Done!');
    });

    console.log(Table.toString());

    client.on("ready", async () => {
        const mainGuild = client.guilds.cache.get(server);
        console.log('Started refreshing application (/) commands.'.brightGreen);
        mainGuild.commands.set(CommandsArray);
        console.log('Successfully reloaded application (/) commands.'.green);
    });
}