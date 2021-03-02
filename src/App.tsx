import React from "react";
import "antd/dist/antd.css";
import { Todo } from "./features/counter/Todo";
import "./App.css";
import { Layout } from "antd";

function App() {
  return (
    <Layout className="App">
      <Todo />
    </Layout>
  );
}

export default App;
