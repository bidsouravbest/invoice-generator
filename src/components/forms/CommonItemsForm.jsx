import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import {
  finacialYears,
  getDate,
  onFinishFailed,
  rectifyInvNo,
} from "../../utils/utils";

const CommonItemsForm = ({ commonItems, setCommonItems }) => {
  const handleCommonItemsForm = (values) => {
    const commonItem = {
      invno: rectifyInvNo(values?.invoiceno, values?.fyear?.value),
      fyear: values?.fyear?.value,
      truck: values?.truck?.toUpperCase(),
      date: getDate(values?.date),
      dispatch: values?.dispatch?.toUpperCase() || "",
    };

    setCommonItems(commonItem);
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={handleCommonItemsForm}
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
          <Input disabled={commonItems} />
        </Form.Item>

        <Form.Item
          label="Date:"
          name="date"
          rules={[
            {
              required: true,
              message: "Select Date",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Financial Year:"
          name="fyear"
          rules={[
            {
              required: true,
              message: "Select Year",
            },
          ]}
        >
          <Select
            showSearch
            labelInValue
            placeholder="Select Financial Year"
            optionFilterProp="label"
            options={finacialYears}
          />
        </Form.Item>

        <Form.Item
          label="Truck Number:"
          name="truck"
          rules={[
            {
              required: true,
              message: "Enter Truck Number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Dispatched Through:" name="dispatch">
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button disabled={commonItems} type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(CommonItemsForm);
