const { Duration } = require('luxon');

exports.run = async (client, data) => {
  console.log(`Atingimos um limite!`);
  console.log(`${data.limit} requests`);
  if (data.global) console.log(`Infelizmente o limite é pra Minna e não pro bot...`);
  console.log(`${data.method} ${data.path}`);

  let dur = Duration.fromMillis(data.timeout);
  
  console.log(`${dur.toFormat(`hh:mm:ss.S`)} pro limite acabar`)
}