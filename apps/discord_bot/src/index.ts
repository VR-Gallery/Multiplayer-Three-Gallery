import { registService, registCommands } from "./utils/bot";
import GithubHandlerService from "./services/GithubHandlerService";
import ChatGPTService from "./services/ChatGPTService";

registService(ChatGPTService);
registService(GithubHandlerService);
registCommands();
