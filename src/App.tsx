import React from "react";
import "antd/dist/antd.css";
import { Todos } from "./features/todos/Todo";
import "./App.css";
import { Layout } from "antd";

function App() {
  return (
    <Layout className="App">
      <Todos />
    </Layout>
  );
}

export default App;
