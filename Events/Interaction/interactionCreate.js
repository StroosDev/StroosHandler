const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'interactionCreate',

	async execute(interaction, client) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			if (!client.SlashCommands.has(interaction.commandName)) return;
			if (!interaction.guild) return;
			try {
				const command = client.SlashCommands.get(interaction.commandName)

				command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'an error occurped while executing this command!, use this later.', ephemeral: true });
			}

		}
	}
}
