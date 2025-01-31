import React, { useContext, useState } from "react";
import { Button, Form, Input, InputNumber, Checkbox } from "antd";
import { onFinishFailed, rentHSN, rentPer, wd100 } from "../../utils/utils";
import { ConfigContext } from "../../context/ConfigContext";

const AddItemForm = ({ items, setItems, isRent }) => {
  const config = useContext(ConfigContext);

  const rentHSN = config?.rentHSN;
  const rentPer = config?.rentPer;

  const [itemsForm] = Form.useForm();

  const [uniqueID, setUniqueID] = useState(1);
  

  const addItem = (values) => {
    const item = {
      desc: values?.desc.toUpperCase(),
      hsn: isRent ? rentHSN : values?.hsn,
      rate: values?.rate,
      quantity: values?.quantity || 0,
      per: isRent ? rentPer : values?.per?.toUpperCase(),
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
              required: !isRent,
              message: "HSN Code!",
            },
          ]}
        >
          <Input disabled={isRent} placeholder={isRent ? "9972" : ""} />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: !isRent,
              message: "Please input Quantity!",
            },
          ]}
        >
          <InputNumber disabled={isRent} style={wd100} />
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
              required: !isRent,
              message: "Please input per!",
            },
          ]}
        >
          <Input disabled={isRent} placeholder={isRent ? "month" : ""} />
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
