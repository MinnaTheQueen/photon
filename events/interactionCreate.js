const { MessageEmbed } = require('discord.js');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').CommandInteraction} interaction
 */
exports.run = async (client, interaction) => {
	if (!interaction || !interaction.isCommand()) return;

	//const slash = new ApplicationCommandsManager();

	const cmdName = interaction.commandName;
	const cmdOptions = interaction.options;

	const cmd = client.commands.get(cmdName);

	if (!cmd)
		return interaction.reply({
			ephemeral: true,
			content: 'Comando não encontrado',
		});

	console.log(
		`[SLASH-COMMANDS]`,
		`Comando "${
			cmd['help']['subcommand']
				? `${cmdName} ${interaction.options.getSubcommand(true)}`
				: cmdName
		}" utilizado no servidor ${interaction.guild.name} (${interaction.guildId})`
	);

	if (cmd['help']['onlyDevs'] && interaction.guildId != '987410366361395240')
		return interaction.reply({
			ephemeral: true,
			content: `Esse comando está bloqueado fora do servidor de desenvolvimento.`,
		});

	if (
		cmd['help']['perms'] &&
		Array.isArray(cmd['help']['perms']) &&
		!interaction.memberPermissions.has(cmd['perms'])
	)
		return await interaction.reply({
			content:
				'Você não possui as permissãos necessárias para utiizar este comando.',
			ephemeral: true,
		});

	return await cmd
		.run({ slash: true, client, options: cmdOptions, interaction })
		.catch((err) => {
			console.log(
				'[SLASH-COMMANDS]',
				`Um erro ocorreu ao executar o comando ${cmdName}`
			);
			console.error(err);
			if (interaction.deferred) {
				return interaction
				.followUp({
					ephemeral: true,
					content:
						'Sinto muito, um erro ocorreu ao executar este comando. Tente novamente mais tarde.',
				})
				.catch(console.error);
			} else if (!interaction.replied) {
				return interaction
				.reply({
					ephemeral: true,
					content:
						'Sinto muito, um erro ocorreu ao executar este comando. Tente novamente mais tarde.',
				})
				.catch(console.error);
			} else if (interaction.replied) {
				return interaction
				.channel.send({
					content:
						`${interaction.user}\nSinto muito, um erro ocorreu ao executar este comando. Tente novamente mais tarde.`,
				})
				.catch(console.error);
			}
		})
		.then(async (returned) => {
			if (typeof returned === 'object' && returned['incomplete']) {
				const embed = new MessageEmbed()
					.setTitle(`Esse comando está incompleto`)
					.setDescription(
						`Isso quer dizer que trabalhos estão sendo feitos... Jajá você vai ver coisas boas saindo daqui!
						
Quer notícias sobre esse comando? Pode falar com a <@!976565965775073361>!`
					)
					.setColor(client.config.colors.invisible);

				return await interaction.reply({ embeds: [embed], ephemeral: true });
			}
		});
};
