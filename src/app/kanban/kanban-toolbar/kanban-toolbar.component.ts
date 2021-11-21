import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandManagerService } from '../../command-manager';

@Component({
  selector: 'ako-kanban-toolbar',
  templateUrl: './kanban-toolbar.component.html',
  styleUrls: ['./kanban-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanToolbarComponent {
  canUndo$: Observable<boolean> = this.commandManager.canUndo$;
  canRedo$: Observable<boolean> = this.commandManager.canRedo$;

  constructor(private commandManager: CommandManagerService) {}

  undo(): void {
    this.commandManager.undo();
  }
  redo(): void {
    this.commandManager.redo();
  }
}
