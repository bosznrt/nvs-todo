import React, { useState } from "react";
import { Row, Col, Form, Input, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";

import MainLayout from "components/MainLayout";
import { BoxPanel, BoxItem, CustomButton } from "components/Styled";
import { signIn } from "reducers/user";

export default (props) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const { history } = props;

  const initialValues = {
    username: "",
    password: "",
  };

  const SingingIn = async (values) => {
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_ENDPOINT}/users/auth`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    })
      .then((res) => {
        const {
          data: { token },
        } = res;
        dispatch(signIn(token, values.username));
        history.push("/");
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;

        setErrorMessage(message);
      });
  };

  return (
    <MainLayout>
      <Row justify="center">
        <Col xs={24} sm={16} md={14} lg={12} xl={8}>
          <BoxPanel>
            <BoxItem>
              <Form
                name="login"
                initialValues={initialValues}
                onFinish={SingingIn}
                onValuesChange={() => {
                  setErrorMessage(null);
                }}
              >
                <Form.Item
                  name="username"
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  required={false}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>
                {errorMessage && (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" showIcon />
                  </Form.Item>
                )}
                <Form.Item style={{ textAlign: "center" }}>
                  <CustomButton type="primary" htmlType="submit">
                    Login
                  </CustomButton>
                </Form.Item>
              </Form>
            </BoxItem>
          </BoxPanel>
        </Col>
      </Row>
    </MainLayout>
  );
};
