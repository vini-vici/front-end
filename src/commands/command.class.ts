export interface KeyMap {
  ctrlKey: boolean;
  altKey: boolean;
 
}

export default class Command {
  constructor(public commandId: string) {

  }
}

export class CommandManager {
  commands: Record<string, Command> = {};
  addCommand(command: Command): CommandManager {
    this.commands[command.commandId] = command;
    return this;
  }
}