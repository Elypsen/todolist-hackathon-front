// todoStore.ts
import {create} from 'zustand';
import {T_Task, T_TodoState, T_TodoActions, Z_TaskSchema} from './todo.schemas';

const useTodoStore = create<T_TodoState & T_TodoActions>(set => ({
   todos: [],
   addTodo: (task: T_Task) => {
      // Validate Task against Zod Schema
      const safeTask = Z_TaskSchema.safeParse(task);

      // Return Error message
      if (!safeTask.success) {
         return safeTask.error.message;
      }

      // update Todos
      set((state: T_TodoState) => ({todos: [...state.todos, safeTask.data]}));

      return safeTask.data;
   },
   removeTodo: (id: T_Task['id']) => {
      const Z_TaskID = Z_TaskSchema.pick({id: true});
      // Validate ID against schema
      const safeId = Z_TaskID.safeParse(id);

      // Return error message
      if (!safeId.success) {
         return safeId.error.message;
      }

      // Check if task exists
      const taskExists = (state: T_TodoState) =>
         state.todos.some((todo: T_Task) => todo.id === safeId.data.id);

      if (!taskExists) {
         return 'Task with the given ID does not exist.';
      }

      // If validation and existence check pass, proceed to remove the task
      set((state: T_TodoState) => ({
         todos: state.todos.filter((todo: T_Task) => todo.id !== safeId.data.id),
      }));

      return 'Task removed successfully.';
   },
}));

export default useTodoStore;
