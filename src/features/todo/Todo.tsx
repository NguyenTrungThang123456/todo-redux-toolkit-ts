import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Todo.module.css";
import * as yup from "yup";
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
import {
  addNewTodo,
  deleteTodo,
  fetchTodos,
  Todo,
  updateTodo,
} from "./services";
import { selectAll } from "./todoSlice";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .max(10, "Title is so long")
    .required("Title is required"),
});

export function Todos() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(null));
  }, [dispatch]);

  const todos: Todo[] = useSelector(selectAll);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      id: 0,
      title: "",
      completed: false,
    },

    onReset: () => {
      form.resetFields();
    },

    onSubmit: (values: Todo, { resetForm }) => {
      dispatch(addNewTodo(values));
      resetForm();
    },
  });

  return (
    <Row justify="center">
      <Col span={8}>
        <Row>
          <Form form={form} layout="inline">
            <Form.Item
              name="title"
              validateStatus={
                formik.touched.title && formik.errors.title
                  ? "error"
                  : "validating"
              }
              help={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : ""
              }
            >
              <Input
                allowClear
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => formik.handleSubmit()}
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row className={styles.listTodo}>
          <List
            style={{
              width: "100%",
            }}
            size="large"
            bordered
            itemLayout="horizontal"
            dataSource={todos}
            renderItem={(item) => (
              <List.Item className={styles.todo}>
                <Checkbox
                  checked={item.completed}
                  onClick={() => {
                    dispatch(updateTodo(item));
                  }}
                />
                <Typography.Paragraph
                  type={item.completed ? "success" : "secondary"}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </Typography.Paragraph>
                <Button type="primary">
                  <DeleteOutlined
                    color="red"
                    onClick={() => {
                      dispatch(deleteTodo(item.id));
                    }}
                  />
                </Button>
              </List.Item>
            )}
          />
        </Row>
        <Row className={styles.filterButton}>
          Show:
          <Button
            onClick={() => {
              dispatch(fetchTodos(null));
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              dispatch(fetchTodos(false));
            }}
          >
            Active
          </Button>
          <Button
            onClick={() => {
              dispatch(fetchTodos(true));
            }}
          >
            Completed
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
