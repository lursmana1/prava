"use client";

import { Form, Input, Button } from "antd";
import { useState } from "react";
import Tiptap from "../Tiptap/Tiptap";
import ImageUploadInput from "./ImageUploadInput";
import BaseApi from "@/api/BaseApi";

type FormValues = {
  name: string;
  bigText: string;
  image?: File | null;
};

function toFormData(values: FormValues): FormData {
  const fd = new FormData();
  fd.append("name", values.name);
  fd.append("bigText", values.bigText);
  if (values.image) fd.append("file", values.image);
  return fd;
}

export default function CreateBlogForm() {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    if (!values.image) {
      form.setFields([{ name: "image", errors: ["Image is required"] }]);
      return;
    }

    setLoading(true);
    try {
      await BaseApi.post("/blogs", toFormData(values));
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<FormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full max-w-3xl space-y-6 [&_.ant-form-item]:mb-0"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input size="large" placeholder="Blog title" />
      </Form.Item>

      <Form.Item
        name="bigText"
        label="Content"
        rules={[{ required: true, message: "Content is required" }]}
      >
        <Tiptap />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        rules={[{ required: true, message: "Image is required" }]}
      >
        <ImageUploadInput />
      </Form.Item>

      <Form.Item className="mb-0! pt-1">
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          Create Blog
        </Button>
      </Form.Item>
    </Form>
  );
}
