import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addNewTodo, deleteTodo, fetchTodos, Todo, updateTodo } from "./thunk";

export const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<any>) => {
        todosAdapter.setAll(state, action.payload);
      }
    );

    builder.addCase(
      fetchTodos.rejected,
      (state, action: PayloadAction<any>) => {
        todosAdapter.upsertMany(state, []);
      }
    );

    builder.addCase(
      addNewTodo.fulfilled.toString(),
      (state, action: PayloadAction<never>) => {
        todosAdapter.addOne(state, action.payload);
      }
    );

    builder.addCase(
      deleteTodo.fulfilled.toString(),
      (state, action: PayloadAction<number>) => {
        todosAdapter.removeOne(state, action.payload);
      }
    );

    builder.addCase(
      updateTodo.fulfilled.toString(),
      (state, action: PayloadAction<Todo>) => {
        const { id, ...changes } = action.payload;
        todosAdapter.updateOne(state, { id, changes });
      }
    );
  },
});

export const { selectAll } = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
);

export default todoSlice.reducer;
