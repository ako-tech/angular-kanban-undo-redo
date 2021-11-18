import { Component } from '@angular/core';
import { CommandManagerService } from '../../command-manager';

@Component({
  selector: 'ako-kanban-toolbar',
  templateUrl: './kanban-toolbar.component.html',
  styleUrls: ['./kanban-toolbar.component.scss'],
})
export class KanbanToolbarComponent {
  get canUndo(): boolean {
    return this.commandManager.canUndo;
  }
  get canRedo(): boolean {
    return this.commandManager.canRedo;
  }

  constructor(private commandManager: CommandManagerService) {}

  undo(): void {
    this.commandManager.undo();
  }
  redo(): void {
    this.commandManager.redo();
  }
}
