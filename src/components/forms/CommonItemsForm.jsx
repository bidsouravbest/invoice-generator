import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useContext } from "react";
import {
  getDate,
  onFinishFailed,
  rectifyInvNo,
  wd100,
} from "../../utils/utils";
import { ConfigContext } from "../../context/ConfigContext";

const CommonItemsForm = ({
  commonItems,
  setCommonItems,
  isRent,
  setIsRent,
}) => {
  const config = useContext(ConfigContext);

  const finacialYears = config?.finacialYears;
  const invoiceNoInitial = config?.invoiceNoInitial;

  const handleRentCheck = (e) => {
    setIsRent(e?.target?.checked);
  };

  const handleCommonItemsForm = (values) => {
    const commonItem = {
      invno: rectifyInvNo(
        values?.invoiceno,
        values?.fyear?.value,
        invoiceNoInitial
      ),
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
          <DatePicker style={wd100} />
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

        <Form.Item>
          <Checkbox onChange={handleRentCheck}>Rent</Checkbox>
        </Form.Item>

        <Form.Item
          label="Truck Number:"
          name="truck"
          rules={[
            {
              required: !isRent,
              message: "Enter Truck Number",
            },
          ]}
        >
          <Input disabled={isRent} />
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
