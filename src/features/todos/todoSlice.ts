import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_ENDPOINT_TODO = "http://localhost:5000/todos";
export interface TodoState {
  id?: number;
  title?: string;
  completed?: boolean;
}

const initialState = {
  todos: [] as TodoState[],
  status: "success",
  error: null,
};
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (completed?: boolean) => {
    let url = API_ENDPOINT_TODO;
    if (completed !== undefined) {
      url = `${API_ENDPOINT_TODO}/?completed=${completed}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (todo: TodoState, thunkApi) => {
    const { title } = todo;
    const newTodo: TodoState = {
      id: Math.floor(Math.random() * 1000),
      title,
      completed: false,
    };
    const response = await axios.post(`${API_ENDPOINT_TODO}`, newTodo);

    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, thunkApi) => {
    await axios.delete(`${API_ENDPOINT_TODO}/${id}`);
    return id;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: TodoState, thunkApi) => {
    const newTodo: TodoState = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    };
    const response = await axios.put(
      `${API_ENDPOINT_TODO}/${todo.id}`,
      newTodo
    );

    return response.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.todos = action.payload;
    },

    [addNewTodo.fulfilled.toString()]: (
      state,
      action: PayloadAction<never>
    ) => {
      state.todos.push(action.payload);
    },

    [deleteTodo.fulfilled.toString()]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    [updateTodo.fulfilled.toString()]: (
      state,
      action: PayloadAction<TodoState>
    ) => {
      var index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      state.todos[index].completed = action.payload.completed;
    },
  },
});
export const selectAllTodos = (state: any) => state.todo.todos;

export default todoSlice.reducer;
