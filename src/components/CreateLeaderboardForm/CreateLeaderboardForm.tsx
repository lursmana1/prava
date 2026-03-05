"use client";

import { Form, Input, Button, DatePicker } from "antd";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import BaseApi from "@/api/BaseApi";

type FormValues = {
  startDate: Dayjs;
  endDate: Dayjs;
  name?: string;
};

export default function CreateLeaderboardForm() {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      await BaseApi.post("/leaderboard/periods", {
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        name: values.name || undefined,
      });
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
      className="w-full max-w-xl [&_.ant-form-item]:mb-0"
    >
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: "Start date is required" }]}
      >
        <DatePicker
          showTime
          format="DD.MM.YYYY HH:mm"
          className="w-full"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="endDate"
        label="End Date"
        rules={[
          { required: true, message: "End date is required" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const start = getFieldValue("startDate");
              if (!value || !start || value.isAfter(start)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("End date must be after start date")
              );
            },
          }),
        ]}
      >
        <DatePicker
          showTime
          format="DD.MM.YYYY HH:mm"
          className="w-full"
          size="large"
        />
      </Form.Item>

      <Form.Item name="name" label="Name (optional)">
        <Input size="large" placeholder="e.g. Week 1" maxLength={100} />
      </Form.Item>

      <Form.Item className="mb-0! pt-4">
        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          Create Leaderboard Period
        </Button>
      </Form.Item>
    </Form>
  );
}
