import {z, ZodError} from 'zod';

export const Z_TaskSchema = z.object({
   id: z.number({invalid_type_error:"Type of ID is invalid"}).readonly(),
   description: z
      .string({
         invalid_type_error: 'Task description must be a string',
         required_error: 'You must describe the task',
      })
      .min(2, 'Task must be minimum 2 characters')
      .max(256, 'Message is too long. (256 characters maximum)'),
   isChecked: z.boolean().default(false),
});
export const Z_Tasks = z.object({
   todos: z.array(Z_TaskSchema),
});
export type T_Task = z.infer<typeof Z_TaskSchema>;
export type T_TodoState = z.infer<typeof Z_Tasks>;
export type T_TodoActions = {
   addTodo: (task: T_Task) => T_Task | ZodError['message'];
   removeTodo: (id: T_Task['id']) => string | ZodError['message'];
   checkTodo: (todo: T_Task) => string | ZodError['message']
};
