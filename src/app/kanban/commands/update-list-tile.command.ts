import { Command } from '../../command-manager';
import { KanbanList } from '../model';

export class UpdateListTitleCommand implements Command {
  private previousTitle: string;

  constructor(private list: KanbanList, private newTitle: string) {
    this.previousTitle = list.title;
  }

  execute(): void {
    this.list.title = this.newTitle;
  }

  undo(): void {
    this.list.title = this.previousTitle;
  }
}
