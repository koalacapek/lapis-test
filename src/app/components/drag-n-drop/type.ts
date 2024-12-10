export interface Task {
  userId: string;
  taskId: string;
  title: string;
  description?: string;
  status: string;
  deadline?: string;
}
