const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'interactionCreate',

	async execute(interaction, client) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			if (!client.SlashCommands.has(interaction.commandName)) return;
			if (!interaction.guild) return;
			try {
				const command = client.SlashCommands.get(interaction.commandName)
				if (command.devs) {
					if (!process.env.OWNERS.includes(interaction.user.id)) {
						return interaction.reply({ content: ":x: Only devs can use this command", ephemeral: true });
					}
				}
				if (command.modOnly) {
					if (!interaction.member.roles.cache.has(config.staff || config.managers)) {
						return interaction.reply({
							content: ":x: Only ticket staff/managers can use this command.",
							ephemeral: true
						})
					}
				}
				command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
			}

		}
	}
}







/*
old
module.exports = {
	name: 'interactionCreate',

	async execute(interaction, client) {

		if(interaction.isCommand()) {
			console.log('2')
			const command = client.SlashCommands.get(interaction.commandName);
			if(!command) return interaction.reply({
				embeds: [
					new MessageEmbed()
					.setColor('RED')
					.setDescription('❌ An error occured while running this command!')
				], ephemeral: true
			});

			command.execute(interaction, client);
		}
	    
	}
}
*/