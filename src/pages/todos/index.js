import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Form, Input, Empty, Card, Typography } from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";

import MainLayout from "components/MainLayout";
import { CustomButton } from "components/Styled";

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const CenterFormItem = styled(Form.Item)`
  text-align: center;
`;

const CustomParagraph = styled(Paragraph)`
  ${(props) => (props.fsize ? `font-size: ${props.fsize}` : "")}
`;

const Date = styled.div`
  text-align: right;
  font-size: 12px;
`;

const CloseButton = styled(CloseCircleOutlined)`
  font-size: 20px;
  margin-bottom: 0.5em;
  cursor: pointer;
  z-index: 1000;
`;

export default () => {
  const user = useSelector((state) => state.user);
  const [todos, setTodoList] = useState([]);
  const [visible, switchModal] = useState(false);
  const [selected, dataSelector] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}/todos`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);

  const createOrEditTodo = (values) => {
    const method = selected ? "PUT" : "POST";
    const url = selected
      ? `${process.env.REACT_APP_API_ENDPOINT}/todos/${selected._id}`
      : `${process.env.REACT_APP_API_ENDPOINT}/todos`;

    return axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: values,
    })
      .then((response) => {
        if (selected) {
          const removeFromList = todos.filter(
            (data) => data._id !== selected._id
          );
          const updatedList = [...removeFromList, response.data];
          setTodoList(updatedList);
        } else {
          setTodoList([...todos, response.data]);
        }
        switchModal(false);
      })
      .catch((error) => console.log(error.response.data.message));
  };

  const deleteTodo = (id) => {
    return axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_ENDPOINT}/todos/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const removeFromList = todos.filter((data) => data._id !== id);
        setTodoList(removeFromList);
      })
      .catch((error) => console.log(error.response.data.message));
  };

  return (
    <MainLayout>
      {todos.length ? (
        todos.map((data) => {
          const { title, description, updatedAt, _id } = data;

          const displayUpdated = moment(updatedAt).format("DD-MM-YYYY");
          return (
            <Row align="center" justify="center" key={_id}>
              <Col xs={24} sm={16} md={14} lg={12} xl={8}>
                <Card
                  hoverable
                  style={{ marginBottom: "16px" }}
                  title={
                    <Title level={3} style={{ margin: "0px" }}>
                      {title}
                    </Title>
                  }
                  extra={
                    <CloseButton
                      onClick={() => {
                        confirm({
                          title: `Are you sure delete ${title}?`,
                          icon: <ExclamationCircleOutlined />,

                          okText: "Confirm",
                          okType: "danger",
                          cancelText: "Cancel",
                          onOk() {
                            deleteTodo(_id);
                          },
                        });
                      }}
                    />
                  }
                >
                  <Typography
                    onClick={() => {
                      switchModal(true);
                      dataSelector(data);
                    }}
                  >
                    <CustomParagraph fsize="16px">
                      {description}
                    </CustomParagraph>
                    <Date>{displayUpdated}</Date>
                  </Typography>
                </Card>
              </Col>
            </Row>
          );
        })
      ) : (
        <Empty style={{ marginBottom: "16px" }} />
      )}
      <Row align="bottom" justify="center">
        <Col xs={24} sm={16} md={14} lg={12} xl={8}>
          <CustomButton
            shape="round"
            icon={<PlusOutlined />}
            type="primary"
            width="100%"
            onClick={() => switchModal(true)}
          >
            Create
          </CustomButton>
        </Col>
      </Row>
      <Modal
        visible={visible}
        title="NEW TO DO"
        onCancel={() => {
          switchModal(false);
          dataSelector(null);
        }}
        footer={false}
      >
        <Form
          name="create-todo-form"
          layout="vertical"
          initialValues={selected}
          onFinish={createOrEditTodo}
        >
          <Form.Item
            name="title"
            label="TITLE"
            required={false}
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
              {
                max: 50,
                message: "50 Character or less",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="DESCRIPTION"
            required={false}
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
              {
                max: 250,
                message: "250 Character or less",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <CenterFormItem>
            <CustomButton
              type="danger"
              onClick={() => {
                switchModal(false);
                dataSelector(null);
              }}
              ghost
            >
              Cancel
            </CustomButton>{" "}
            {
              <CustomButton type="primary" htmlType="submit">
                {selected ? "Edit" : "Create"}
              </CustomButton>
            }
          </CenterFormItem>
        </Form>
      </Modal>
    </MainLayout>
  );
};
