import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type } from "os";
const API_ENDPOINT_TODO = "http://localhost:5000/todos";

export type Todo = {
  id?: number;
  title?: string;
  completed?: boolean;
};
export type FetchTodosError = {
  message: string;
};
export const fetchTodos = createAsyncThunk<
  Todo[],
  boolean | null,
  { rejectValue: FetchTodosError }
>("todos/fetchTodos", async (completed: boolean | null, thunkApi) => {
  let url = API_ENDPOINT_TODO;
  if (completed !== null) {
    url = `${API_ENDPOINT_TODO}/?completed=${completed}`;
  }
  const response = await axios.get(url);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch todos.",
    });
  }

  return response.data;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (todo: Todo, thunkApi) => {
    const { title } = todo;
    const newTodo: Todo = {
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
  async (todo: Todo, thunkApi) => {
    const newTodo: Todo = {
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
