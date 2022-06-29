const random = require('random');

const { ApplicationCommandsManager } = require('../utils/slash');
const getUptime = require('../utils/uptime');

const { Formatters } = require('discord.js');

exports.run = async (client) => {
	const slash = new ApplicationCommandsManager({ client });

	const dbClient = require('../utils/database');

	//client.emit('updateCommands', client);

	const fetch = (await import('node-fetch')).default;

	//client.emit('recognizeGuilds', client);

	// Esse evento é usado assim que o bot é ligado e está pronto pra receber outros eventos.
	var index = 0;

	console.log(
		`${client.user.tag}: Client iniciado; ${client.users.cache.size} usuários e ${client.guilds.cache.size} servidores`
	);

	function setPresence() {
		const presences = [
			{ text: `OHYES SIR` },
		];
		index = random.int(0, presences.length - 1);
		var presence = 'Em desenvolvimento...';
		if (process.env.NODE_ENV != 'development') presence = presences[index];

		try {
			client.user.setPresence({
				activities: [
					{
						name: `👨‍🎤 | ${presence['text'] || presence}`,
						type: presence['type'] ? presence['type'] : 'PLAYING',
					},
				],
			});
		} catch (err) {
			console.error(err);
		}
	}

	function activatePresence() {
		setPresence();
		if (process.env.NODE_ENV != 'development')
			setInterval(setPresence, 15 * 60 * 1000);
	}

	if (client.isReady) {
		activatePresence();
	} else {
		var interval = setInterval(() => {
			if (client.isReady) {
				activatePresence();
				return clearInterval(interval);
			}
		}, 1000);
	}

	client.logChannel = await client.channels.fetch(client.config.LOG_CHANNEL_ID);
};
