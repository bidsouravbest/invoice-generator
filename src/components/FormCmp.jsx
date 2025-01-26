import React, { useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import ItemsView from "./ItemsView";

const FormCmp = ({ items, setItems, invoiceNo, setInvoiceNo }) => {
  const [itemsForm] = Form.useForm();

  const [uniqueID, setUniqueID] = useState(1);

  const handleInvoiceForm = (values) => {
    setInvoiceNo(values?.invoiceno);
  };

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

  const handleConfirmItems = (values) => {
    console.log("first", values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteItem = (item) => {
    const updatedData = items?.filter(
      (datum) => datum?.uniqueID !== item?.uniqueID
    );

    setItems(updatedData);
  };

  return (
    <div>
      {items?.length > 0 && (
        <div className="item-det">
          <ItemsView items={items} handleDeleteItem={handleDeleteItem} />
        </div>
      )}

      <Form
        name="basic"
        onFinish={handleInvoiceForm}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Invoice Number:"
          name="invoiceno"
          rules={[
            {
              required: true,
              message: "Enter Invoice Number",
            },
          ]}
        >
          <Input disabled={invoiceNo} />
        </Form.Item>
        <Form.Item label={null}>
          <Button disabled={invoiceNo} type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>

      {invoiceNo && (
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
          {/* <Form.Item label={null}>
            <Button type="primary" onClick={handleConfirmItems}>
              Save
            </Button>
          </Form.Item> */}
        </Form>
      )}
    </div>
  );
};

export default FormCmp;
