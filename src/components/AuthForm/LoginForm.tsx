"use client";

import BaseApi from "@/api/BaseApi";
import { Form, Input, Button } from "antd";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const [form] = Form.useForm();

  const onFinish = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await BaseApi.post("/auth/login", { email, password });
    } catch {
      // TODO: show error message to user
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="space-y-6 [&_.ant-form-item]:mb-0"
    >
      <Form.Item
        name="email"
        label={t("email")}
        rules={[
          { required: true, message: t("emailRequired") },
          { type: "email", message: t("emailInvalid") },
        ]}
      >
        <Input
          type="email"
          size="large"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label={t("password")}
        rules={[{ required: true, message: t("passwordRequired") }]}
      >
        <Input.Password size="large" autoComplete="current-password" />
      </Form.Item>

      <Form.Item className="mb-0! pt-1">
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className="mt-0!"
        >
          {t("login")}
        </Button>
      </Form.Item>
    </Form>
  );
}
