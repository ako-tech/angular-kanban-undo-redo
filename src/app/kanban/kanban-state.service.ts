import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommandManagerService } from '../command-manager';
import {
  AddTaskToListCommand,
  RemoveListCommand,
  RemoveTaskFromListCommand,
  ReorderListCommand,
  ReorderTaskCommand,
  TransferTaskCommand,
  UpdateListTitleCommand,
  UpdateTaskDescriptionCommand,
} from './commands';
import { TransferTaskData } from './common';

import { dummyBoard, KanbanBoard } from './model';

@Injectable()
export class KanbanStateService {
  private board = new BehaviorSubject<KanbanBoard>(dummyBoard);
  board$: Observable<KanbanBoard> = this.board.asObservable();

  constructor(private commandManager: CommandManagerService) {}

  updateListTitle(listIndex: number, newTitle: string): void {
    this.commandManager.execute(
      new UpdateListTitleCommand(this.board, listIndex, newTitle)
    );
  }

  moveList(fromIndex: number, toIndex: number): void {
    this.commandManager.execute(
      new ReorderListCommand(this.board, fromIndex, toIndex)
    );
  }

  removeList(listIndex: number): void {
    this.commandManager.execute(new RemoveListCommand(this.board, listIndex));
  }

  addTaskToList(listIndex: number): void {
    this.commandManager.execute(
      new AddTaskToListCommand(this.board, listIndex)
    );
  }

  removeTaskFromList(listIndex: number, taskIndex: number): void {
    this.commandManager.execute(
      new RemoveTaskFromListCommand(this.board, listIndex, taskIndex)
    );
  }

  updateTask(
    listIndex: number,
    taskIndex: number,
    newDescription: string
  ): void {
    this.commandManager.execute(
      new UpdateTaskDescriptionCommand(
        this.board,
        listIndex,
        taskIndex,
        newDescription
      )
    );
  }

  reorderTask(listIndex: number, fromIndex: number, toIndex: number): void {
    this.commandManager.execute(
      new ReorderTaskCommand(this.board, listIndex, fromIndex, toIndex)
    );
  }

  transferTask(transferData: TransferTaskData): void {
    this.commandManager.execute(
      new TransferTaskCommand(this.board, transferData)
    );
  }
}
