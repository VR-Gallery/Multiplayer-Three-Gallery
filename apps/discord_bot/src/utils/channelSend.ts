import { TextChannel, Client } from "discord.js";

export default function channelSend(
  bot: Client<true>,
  channelId: string,
  message: any
) {
  if (!message) return;
  if (message.length > 1990) {
    message = message.slice(0, 1990);
    return;
  }
  try {
    (bot.channels.cache.get(channelId) as TextChannel).send(message);
  } catch (error) {}
}
