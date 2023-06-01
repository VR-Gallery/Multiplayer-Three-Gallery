import http from "http";
import createHandler from "github-webhook-handler";
import BotCommand from "@/models/BotCommand";
import { BotService, BotSubService } from "@/models/BotService";
import {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
} from "discord.js";
import runCmd from "@/utils/runCmd";
import channelSend from "@/utils/channelSend";
import fs from "fs";

const verson = "2023-0503-0400";

const default_webhook_port = 81;

const messageChannelManager = {
  bot: {} as Client<true>,
  githubMessegechannelId: "",
  setBot(bot: Client<true>) {
    this.bot = bot;
  },
  getBot() {
    return this.bot;
  },
  setID(id: string) {
    this.githubMessegechannelId = id;
    try {
      fs.writeFileSync("channelId.txt", id);
    } catch (error) {}
  },
  getId() {
    return this.githubMessegechannelId;
  },
};

const deploy = async ({
  bot,
  repositoryName,
  githubMessegechannelId,
  executeSh,
}: {
  bot: Client<true>;
  repositoryName: string;
  githubMessegechannelId: string;
  executeSh: string;
}) => {
  const channel = (await bot.channels.fetch(
    githubMessegechannelId as string
  )) as TextChannel;
  const thread = await channel.threads.create({
    name: `${repositoryName}部署紀錄：${new Date().toISOString()}`,
    autoArchiveDuration: 60,
    reason: `部署時間 ${
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    }`,
  });
  if (thread.joinable) await thread.join();
  runCmd(
    "sh",
    [executeSh, repositoryName],
    (runingLog: string) => {
      if (runingLog && typeof runingLog === "string" && runingLog.length > 0) {
        if (runingLog.length > 1990) {
          runingLog = runingLog.slice(1990) + "...";
        }
        thread.send(`server: ${runingLog}`);
      }
    },
    (finishLog: string) => {
      if (finishLog && typeof finishLog === "string" && finishLog.length > 0)
        channelSend(
          bot,
          githubMessegechannelId as string,
          `server: ${finishLog}`
        );
    }
  );
};

const pushEventHandle =
  (bot: Client<true>, githubMessegechannelId: string) => (event: any) => {
    const { sender, commits, compare, repository } = event.payload;

    const embed = new EmbedBuilder()
      .setColor(0x4caf50)
      .setTitle(`共 ${commits.length} 個 commit`)
      .setURL(compare)
      .setAuthor({
        name: sender.login,
        iconURL: sender.avatar_url,
        url: sender.html_url,
      })
      .setDescription(
        commits
          .map(
            (commit: any) =>
              `**${commit.message}**\n${commit.author.name} - ${commit.url}`
          )
          .join("\n\n")
      )
      .addFields(
        {
          name: "新增",
          value: `${commits.reduce(
            (acc: number, cur: any) => acc + cur.added.length,
            0
          )} 個檔案`,
          inline: true,
        },
        {
          name: "刪除",
          value: `${commits.reduce(
            (acc: number, cur: any) => acc + cur.removed.length,
            0
          )} 個檔案`,
          inline: true,
        },
        {
          name: "修改",
          value: `${commits.reduce(
            (acc: number, cur: any) => acc + cur.modified.length,
            0
          )} 個檔案`,
          inline: true,
        }
      )
      .setThumbnail(repository.owner.avatar_url)
      .setTimestamp();

    channelSend(bot, githubMessegechannelId as string, {
      embeds: [embed],
    });
  };

const errorEventHandle =
  (bot: Client<true>, githubMessegechannelId: string) => (event: any) => {
    console.error("Error:", event.message);
    if (!githubMessegechannelId) return;
    channelSend(
      bot,
      githubMessegechannelId as string,
      "Github Webhook Error: " + event.message
    );
  };

const pullRequestEventHandle =
  (bot: Client<true>, githubMessegechannelId: string) => (event: any) => {
    const { sender, commits, compare, repository } = event.payload;

    const embed = new EmbedBuilder()
      .setColor(0x4caf50)
      .setTitle(`一個新的 Pull Request!\n共 ${commits.length} 個 commit`)
      .setURL(compare)
      .setAuthor({
        name: sender.login,
        iconURL: sender.avatar_url,
        url: sender.html_url,
      })
      .setDescription(
        commits
          .map(
            (commit: any) =>
              `**${commit.message}**\n${commit.author.name} - ${commit.url}`
          )
          .join("\n\n")
      )
      .addFields(
        {
          name: "新增",
          value: `${commits.reduce(
            (acc: number, cur: any) => acc + cur.added.length,
            0
          )} 個檔案`,
          inline: true,
        },
        {
          name: "刪除",
          value: `${commits.reduce(
            (acc: number, cur: any) => acc + cur.removed.length,
            0
          )} 個檔案`,
          inline: true,
        },
        {
          name: "修改",
          value: `${commits.reduce(
            (acc: number, cur: any) => acc + cur.modified.length,
            0
          )} 個檔案`,
          inline: true,
        }
      )
      .setThumbnail(repository.owner.avatar_url)
      .setTimestamp();

    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`deploy-${repository.name}`)
        .setLabel("立即部署")
        .setStyle(ButtonStyle.Primary)
    ) as any;

    channelSend(bot, githubMessegechannelId as string, {
      embeds: [embed],
      components: [row1],
    });
  };

const githubHandlerCommand: BotCommand = {
  name: "設定github訊息傳輸地",
  description: "設定github訊息傳輸地",
};
const githubHandlerService: BotSubService<BotCommand> = (bot, command) => {
  const handler = createHandler({
    path: "/github/webhook",
    secret: process.env.GITHUB_WEBHOOK_SECRET ?? "",
  });

  http
    .createServer(function (req, res) {
      handler(req, res, function (err) {
        res.statusCode = 404;
        res.end("no such location");
      });
    })
    .listen(process.env.GITHUB_WEBHOOK_PORT ?? default_webhook_port);

  bot.on("interactionCreate", async (interaction) => {
    try {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === command.name) {
        messageChannelManager.setID(interaction.channelId);
        await interaction.reply("設定成功");
      }
    } catch (error) {
      console.error(error);
    }
  });

  handler.on("error", function (event) {
    if (!messageChannelManager.getId()) return;

    errorEventHandle(bot, messageChannelManager.getId() as string)(event);
  });

  handler.on("push", function (event) {
    if (!messageChannelManager.getId()) return;

    pushEventHandle(bot, messageChannelManager.getId() as string)(event);
  });

  handler.on("pull_request", function (event) {
    if (!messageChannelManager.getId()) return;

    pullRequestEventHandle(bot, messageChannelManager.getId() as string)(event);
  });
};

const deployWebCmd: BotCommand = {
  name: "deploy",
  description: "立即部署 整個專案",
};
const deployWebService: BotSubService<BotCommand> = (bot, command) => {
  bot.on("interactionCreate", async (interaction) => {
    try {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName !== command.name) return;

      interaction.reply("部署中，請稍後");
      deploy({
        bot,
        githubMessegechannelId: messageChannelManager.getId(),
        repositoryName: "前端正式伺服器",
        executeSh: "./src/cmd/deploy.sh",
      });
    } catch (error) {
      console.error(error);
    }
  });
};

const service: BotService = (bot) => {
  try {
    const data = fs.readFileSync("channelId.txt", "utf8");
    console.log("channel:", data);
    messageChannelManager.setID(data);
  } catch (error) {}

  githubHandlerService(bot, githubHandlerCommand);
  deployWebService(bot, deployWebCmd);

  messageChannelManager.setBot(bot);
  setTimeout(() => {
    channelSend(
      bot,
      messageChannelManager.getId() as string,
      "服務已啟動，版本號：" + verson
    );
  }, 3000);

  return [githubHandlerCommand, deployWebCmd];
};

export default service;
