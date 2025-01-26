import React, { useEffect, useState } from "react";
import GeneratePDF from "./GeneratePDF";
import { BUYER_COMPANIES } from "../utils/utils";
import { Select } from "antd";
import FormCmp from "./FormCmp";
import Header from "./Header";
import "../assets/css/home.css";

const Home = () => {
  const [company, setCompany] = useState(BUYER_COMPANIES[0]);

  const [items, setItems] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState(null);
  

  const onChange = (value, option) => {
    setCompany(option);
  };

  // const formData = [
  //   {
  //     sno: "1",
  //     desc: "monntyly rent aug 2025",
  //     hsn: "756",
  //     quantity: 100,
  //     rate: 1000.76,
  //     per: "MT",
  //     uniqueID: 1,
  //   },
  //   {
  //     sno: "2",
  //     desc: "monntyly rent sep 2025",
  //     hsn: "76",
  //     quantity: 500,
  //     rate: 200,
  //     per: "pcs",
  //     uniqueID: 2,
  //   },
  // ];
  

  return (
    <article>
      <Header />
      <div className="ic-home">
        <Select
          showSearch
          labelInValue
          placeholder="Select Buyer Company"
          defaultValue={BUYER_COMPANIES[0]}
          optionFilterProp="label"
          onChange={onChange}
          options={BUYER_COMPANIES}
          className="comp-select"
        />
        <br />
        <br />
        <FormCmp
          items={items}
          setItems={setItems}
          invoiceNo={invoiceNo}
          setInvoiceNo={setInvoiceNo}
        />
      </div>

      {company && (
        <GeneratePDF invoiceNo={invoiceNo} items={items} company={company} />
      )}
    </article>
  );
};

export default Home;
