const { Client } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} (${client.user.id}) is ready and up to go!`);
    }
}
