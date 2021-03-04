import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addNewTodo, deleteTodo, fetchTodos, Todo, updateTodo } from "./thunk";

type TodoState = {
  todos: Todo[];
  error: string | null;
  status: "loading" | "idle";
};

const initialState = {
  todos: [],
  status: "idle",
  error: null,
} as TodoState;

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.todos = action.payload;
        state.status = "idle";
      }
    );

    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      fetchTodos.rejected,
      (state, action: PayloadAction<any>) => {
        // state.error = action.payload.message;
        state.status = "idle";
        // console.log(action);
      }
    );

    builder.addCase(
      addNewTodo.fulfilled.toString(),
      (state, action: PayloadAction<never>) => {
        state.todos.push(action.payload);
      }
    );

    builder.addCase(
      deleteTodo.fulfilled.toString(),
      (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      }
    );

    builder.addCase(
      updateTodo.fulfilled.toString(),
      (state, action: PayloadAction<Todo>) => {
        var index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );

        state.todos[index].completed = action.payload.completed;
      }
    );
  },
});
export const selectAllTodos = (state: RootState) => state.todo.todos;
export const selectStatus = (state: RootState) => state.todo.status;

export default todoSlice.reducer;
