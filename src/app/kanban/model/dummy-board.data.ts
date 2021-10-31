import { KanbanBoard } from '.';

const toDoColumn = {
  id: 1,
  title: 'Pendiente',
  tasks: [
    { id: 4, description: 'Configurar los Drags y DropLists.' },
    { id: 5, description: 'Añadir métodos para procesar las acciones.' },
    { id: 6, description: 'Mostrar estilos y animaciones.' },
    { id: 7, description: 'Convertir acciones en comandos.' },
  ],
};

const inProgressColumn = {
  id: 2,
  title: 'En Proceso',
  tasks: [
    { id: 2, description: 'Añadir material cdk.' },
    { id: 3, description: 'Explicar elementos básicos del Drag & Drop.' },
  ],
};

const completedColumn = {
  id: 3,
  title: 'Completadas',
  tasks: [
    { id: 1, description: 'Crear la estructura básica de la aplicación.' },
  ],
};

export const dummyBoard: KanbanBoard = {
  lists: [toDoColumn, inProgressColumn, completedColumn],
};
