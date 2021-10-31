import { Component } from '@angular/core';

import { KanbanStateService } from '../kanban-state.service';
import { KanbanBoard, KanbanList, KanbanTask } from '../model';

@Component({
  selector: 'ako-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  providers: [KanbanStateService],
})
export class KanbanBoardComponent {
  board: KanbanBoard = this.kanbanService.board;

  constructor(private kanbanService: KanbanStateService) {}

  trackById(index: number, element: KanbanList | KanbanTask): number {
    return element.id;
  }

  addTaskToList(list: KanbanList): void {
    this.kanbanService.addTaskToList(list);
  }

  updateTitleInList(list: KanbanList, newTitle: string): void {
    this.kanbanService.updateListTitle(list, newTitle);
  }

  removeList(list: KanbanList): void {
    this.kanbanService.removeList(list);
  }

  removeTaskFromList(list: KanbanList, taskIndex: number): void {
    this.kanbanService.removeTaskFromList(list, taskIndex);
  }

  updateTaskDescription(task: KanbanTask, newDescription: string): void {
    this.kanbanService.updateTask(task, newDescription);
  }
}
