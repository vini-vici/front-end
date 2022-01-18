
export default class Command {
  constructor(public commandId: string, protected global = false) {
  }

  action() {
    console.log('hello, I am the action');
  }
}

export class CommandManager {
  commands: Record<string, Command> = {};
  addCommand(command: Command): CommandManager {
    this.commands[command.commandId] = command;
    return this;
  }
}