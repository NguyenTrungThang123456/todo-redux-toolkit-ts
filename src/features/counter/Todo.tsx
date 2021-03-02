import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  List,
  Checkbox,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { fetchTodos, TodoState } from "./todoSlice";

export function Todo() {
  // const todo = useSelector();
  const todos: TodoState[] = [
    {
      id: 1,
      title: "Todo",
      completed: false,
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Row justify="center">
      <Col span={8}>
        <Row>
          <Form layout="inline">
            <Form.Item name="title">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row
          style={{
            marginTop: "20px",
          }}
        >
          <List
            size="large"
            bordered
            itemLayout="horizontal"
            dataSource={todos}
            renderItem={(item) => (
              <List.Item>
                <Row gutter={4}>
                  <Checkbox />
                  <Typography>{item.title} </Typography>
                  <DeleteOutlined />
                </Row>
              </List.Item>
            )}
          ></List>
        </Row>
      </Col>
    </Row>
  );
}
