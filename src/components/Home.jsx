import React, { useEffect, useState } from "react";
import GeneratePDF from "./GeneratePDF";
import { BUYER_COMPANIES } from "../utils/utils";
import { Select } from "antd";
import AddItemForm from "./forms/AddItemForm";
import Header from "./Header";
import "../assets/css/home.css";
import CommonItemsForm from "./forms/CommonItemsForm";
import ItemsView from "./ItemsView";

const Home = () => {
  const [company, setCompany] = useState(BUYER_COMPANIES[0]);

  const [items, setItems] = useState([]);
  const [commonItems, setCommonItems] = useState(null);

  const onChange = (value, option) => {
    setCompany(option);
  };

  const handleDeleteItem = (item) => {
    const updatedData = items?.filter(
      (datum) => datum?.uniqueID !== item?.uniqueID
    );

    setItems(updatedData);
  };

  return (
    <article>
      <div className="ic-home">
        <section>
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
        </section>

        <section className="forms">
          <CommonItemsForm
            commonItems={commonItems}
            setCommonItems={setCommonItems}
          />

          {items?.length > 0 && (
            <div className="item-det">
              <ItemsView items={items} handleDeleteItem={handleDeleteItem} />
            </div>
          )}

          {commonItems && (
            <AddItemForm
              items={items}
              setItems={setItems}
              commonItems={commonItems}
              setCommonItems={setCommonItems}
            />
          )}
        </section>
      </div>

      {company && commonItems && (
        <GeneratePDF
          commonItems={commonItems}
          items={items}
          company={company}
        />
      )}
    </article>
  );
};

export default Home;
