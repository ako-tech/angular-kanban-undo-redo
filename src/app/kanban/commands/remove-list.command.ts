import { Command } from '../../command-manager';
import { KanbanBoard, KanbanList } from '../model';

export class RemoveListCommand implements Command {
  private listIndex: number;

  constructor(private board: KanbanBoard, private listToRemove: KanbanList) {
    this.listIndex = board.lists.findIndex((list) => list === listToRemove);
  }

  execute() {
    this.board.lists.splice(this.listIndex, 1);
  }

  undo() {
    this.board.lists.splice(this.listIndex, 0, this.listToRemove);
  }
}
