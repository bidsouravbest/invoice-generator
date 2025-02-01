import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import React, { useContext, useEffect } from "react";
import { onFinishFailed } from "../../utils/utils";
import { ConfigContext } from "../../context/ConfigContext";

const CommonItemsForm = ({
  commonItems,
  setCommonItems,
  isRent,
  setIsRent,
  setSection,
  section,
}) => {
  const config = useContext(ConfigContext);

  const wd100 = config?.wd100;

  const [ciForm] = Form.useForm();

  const handleRentCheck = (e) => {
    setIsRent(e?.target?.checked);
  };

  const setFormValuesCI = () => {
    ciForm.setFieldsValue({
      invoiceno: commonItems?.invno || 0,
      date: commonItems?.date || new Date(),
      truck: commonItems?.truck || "",
      dispatch: commonItems?.dispatch || "",
    });
  };

  const handleCommonItemsForm = (values) => {
    const commonItem = {
      invno: values?.invoiceno,
      truck: values?.truck?.toUpperCase() || "",
      date: values?.date,
      dispatch: values?.dispatch?.toUpperCase() || "",
      rent: isRent,
    };

    setCommonItems(commonItem);

    setSection(2);
  };

  useEffect(() => {
    if (commonItems && section === 1) {
      setFormValuesCI();
    }
  }, [section]);

  return (
    <div>
      <Form
        name="basic"
        onFinish={handleCommonItemsForm}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        values={null}
        form={ciForm}
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
          <Input style={wd100} value={commonItems?.invno} />
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

        <Form.Item label={null} name="rent">
          <Checkbox checked={isRent} onChange={handleRentCheck}>
            Rent
          </Checkbox>
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
          <Button disabled={section === 2} type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(CommonItemsForm);
