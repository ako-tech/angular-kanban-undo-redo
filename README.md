# Kanban - Angular Cdk - Undo/Redo

Tablero básico Kanban que sirve como proyecto de apoyo para:

- El tutorial en el que vemos como podemos crear una interfaz de Drag & Drop en Angular, usando el CDK de Angular Material. [Ver Video](https://youtu.be/s6FlXN3UkE8)
- Y el tutorial en el que convertimos las acciones que modifican el estado del tablero en comandos para añadir la posibilidad de deshacer y rehacer las diferentes acciones. [Ver Vídeo](https://youtu.be/dM0h3-oK5ug)

## Ramas (Branches)

El repositorio esta dividido en ramas, cada una de las cuales se corresponde con una etapa del desarrollo de la aplicación.

- [Aplicación Base](https://github.com/ako-tech/angular-kanban-undo-redo)
- [Angular CDK](https://github.com/ako-tech/angular-kanban-undo-redo/tree/cdk)
- [Undo/Redo](https://github.com/ako-tech/angular-kanban-undo-redo/tree/commands)
- [Alternativa Reactiva e Immutable](https://github.com/ako-tech/angular-kanban-undo-redo/tree/immutable-reactive)

## Comandos

El proyecto está realizado sobre la v13 de Angular.

Para levantar un servidor de desarrollo usar el comando `ng serve`. Este estará disponible en `http://localhost:4200/`.

Para compilar la aplicación usar el comando `ng build`. Pudiendo usar la opcion `--prod` para compilar la versión de producción. Los archivos de la aplicación estarán disponibles en la carpeta `dist/`.
