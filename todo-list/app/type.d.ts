export interface IItemData {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface IInputWithButton {
  inputSrc: string;
  inputWidth: number;
  buttonSrc: string;
  buttonWidth: number;
  prValue: string;
  onAddTodo: (todo: string) => void;
}

export interface TodoListProps {
  todoList: IItemData[];
  onMarkAsDone: (index: number) => void;
  emptyImageSrc: string;
  emptyImageAlt: string;
  emptyImageWidth: number;
  emptyImageHeight: number;
  screenSize: string;
  boxWidth: number;
  boxHeight: number;
}

export interface IItemDetail {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}
