import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const API_ENDPOINT_TODO = "http://localhost:5000/todos";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Error = {
  message: string;
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  boolean | null,
  { rejectValue: Error }
>("todos/fetchTodos", async (completed, thunkApi) => {
  let url = API_ENDPOINT_TODO;

  if (completed !== null) {
    url = `${API_ENDPOINT_TODO}/?completed=${completed}`;
  }

  const response = await axios.get(url);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch todos!",
    });
  }

  return response.data;
});

export const addNewTodo = createAsyncThunk<Todo, Todo, { rejectValue: Error }>(
  "todos/addNewTodo",
  async (todo, thunkApi) => {
    const { title } = todo;

    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000),
      title,
      completed: false,
    };

    const response = await axios.post(`${API_ENDPOINT_TODO}`, newTodo);

    if (response.status !== 201) {
      return thunkApi.rejectWithValue({
        message: "Fail to add new todo!",
      });
    }

    return response.data;
  }
);

export const deleteTodo = createAsyncThunk<
  number,
  number,
  { rejectValue: Error }
>("todos/deleteTodo", async (id, thunkApi) => {
  let response = await axios.delete(`${API_ENDPOINT_TODO}/${id}`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete todo!",
    });
  }

  return id;
});

export const updateTodo = createAsyncThunk<Todo, Todo, { rejectValue: Error }>(
  "todos/updateTodo",
  async (todo, thunkApi) => {
    const newTodo: Todo = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    };

    const response = await axios.put(
      `${API_ENDPOINT_TODO}/${todo.id}`,
      newTodo
    );

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to update todo!",
      });
    }

    return response.data;
  }
);
