import React, { useState } from "react";
import { Button, Form, Input, InputNumber, DatePicker } from "antd";
import ItemsView from "../ItemsView";
import { onFinishFailed } from "../../utils/utils";
import CommonItemsForm from "./CommonItemsForm";

const AddItemForm = ({ items, setItems, commonItems }) => {
  const [itemsForm] = Form.useForm();

  const [uniqueID, setUniqueID] = useState(1);

  const addItem = (values) => {
    const item = {
      desc: values?.desc.toUpperCase(),
      hsn: values?.hsn,
      rate: values?.rate,
      quantity: values?.quantity,
      per: values?.per?.toUpperCase(),
      uniqueID: uniqueID,
    };

    setUniqueID(uniqueID + 1);

    items ? setItems([...items, item]) : setItems([item]);

    itemsForm.resetFields();
  };

  return (
    <div>
      <Form
        form={itemsForm}
        name="basic"
        onFinish={addItem}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Item Name"
          name="desc"
          rules={[
            {
              required: true,
              message: "Goods Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="HSN Code"
          name="hsn"
          rules={[
            {
              required: true,
              message: "HSN Code!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input Quantity!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Rate"
          name="rate"
          rules={[
            {
              required: true,
              message: "Please input @ Rate!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="per (MT / PCS /...)"
          name="per"
          rules={[
            {
              required: true,
              message: "Please input per!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddItemForm;
