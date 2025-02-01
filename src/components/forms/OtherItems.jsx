import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { onFinishFailed } from "../../utils/utils";
import { ConfigContext } from "../../context/ConfigContext";
import "../../assets/css/common.css";

const AddItemForm = ({ otherItems, setOtherItems, isRent, setSection, section }) => {
  const config = useContext(ConfigContext);

  const rentHSN = config?.rentHSN;
  const rentPer = config?.rentPer;
  const wd100 = config?.wd100;

  const [oiForm] = Form.useForm();

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

    otherItems ? setOtherItems([...otherItems, item]) : setOtherItems([item]);

    oiForm.resetFields();
  };

  const handleBackBtn = () => {
    setSection(1);
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={addItem}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={oiForm}
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

        <div className="add-itms-btns">
          <Form.Item label={null}>
            <Button onClick={handleBackBtn}>Back</Button>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddItemForm;
