const version = '0.2' // Versão

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getEmojiWithShards(client, emojiRef) {
  if (!client) return new Error("Não foi entregue um Client para a função.");
  const cache = await client.getEmojisCache();

  const byName = cache.find(e => e.name === emojiRef);
  const byId = cache.find(e => e.id === emojiRef);
  let emoji;
  let str = emojiRef;

  if (byName) {
    emoji = byName;
  } else if (byId) {
    emoji = byId;
  } else {
    return emojiRef;
  }
  
  if (emoji.animated) str = `<a:${emoji.name}:${emoji.id}>`;
  else str = `<:${emoji.name}:${emoji.id}>`;

  return { emoji, toString: () => str, toUseful: () => { return { name: emoji.name, id: emoji.id, animated: emoji.animated } } };
}

function getEmoji(client, emojiRef) {
  if (!client) return new Error("Não foi entregue um Client para a função.");
  const cache = client.emojis.cache;

  const byName = cache.find(e => e.name === emojiRef);
  const byId = cache.find(e => e.id === emojiRef);
  let emoji;
  let str = emojiRef;

  if (byName) {
    emoji = byName;
  } else if (byId) {
    emoji = byId;
  } else {
    return emojiRef;
  }
  
  if (emoji.animated) str = `<a:${emoji.name}:${emoji.id}>`;
  else str = `<:${emoji.name}:${emoji.id}>`;

  return { emoji, toString: () => str, toUseful: () => { return { name: emoji.name, id: emoji.id, animated: emoji.animated } } };
}

module.exports = {
  getEmojiWithShards,
  getEmoji,
  version
}