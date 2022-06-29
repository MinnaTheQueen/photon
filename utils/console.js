/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Packages
const _chalk = require('chalk'),
	chalk = new _chalk.Instance();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function div(doReturn = false, noColor = false) {
	if (!doReturn) {
		if (noColor) {
			return console.log(
				chalk.keyword('gray')(
					`|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||`
				)
			);
		} else {
			return console.log(
				chalk.keyword('gray')(
					`|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||`
				)
			);
		}
	} else {
		if (noColor) {
			return `|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||`;
		} else {
			return chalk.keyword('gray')(
				`|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||`
			);
		}
	}
}

module.exports = {
	div,
};
