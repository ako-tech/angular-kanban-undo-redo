import { BehaviorSubject } from 'rxjs';
import { Command } from '../../command-manager';
import { KanbanBoard } from '../model';

export abstract class AbstractBoardCommand implements Command {
  constructor(private board: BehaviorSubject<KanbanBoard>) {}

  execute(): void {
    this.board.next(this.doCommandReducer(this.board.value));
  }

  undo(): void {
    this.board.next(this.undoCommandReducer(this.board.value));
  }

  protected abstract doCommandReducer(
    currentBoardValue: KanbanBoard
  ): KanbanBoard;
  protected abstract undoCommandReducer(
    currentBoardValue: KanbanBoard
  ): KanbanBoard;
}
