import React, { useContext, useEffect, useState } from "react";
import GeneratePDF from "./GeneratePDF";
import { Select } from "antd";
import AddItemForm from "./forms/AddItemForm";
import "../assets/css/home.css";
import CommonItemsForm from "./forms/CommonItemsForm";
import ItemsView from "./ItemsView";
import { ConfigContext } from "../context/ConfigContext";

const Home = () => {
  const config = useContext(ConfigContext);

  const buyerCompanies = config?.BUYER_COMPANIES;

  const [company, setCompany] = useState(null);

  const [items, setItems] = useState([]);
  const [commonItems, setCommonItems] = useState(null);

  const [isRent, setIsRent] = useState(false);

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
            // defaultValue={buyerCompanies ? buyerCompanies[0] : null}
            optionFilterProp="label"
            onChange={onChange}
            options={buyerCompanies}
            className="comp-select"
          />
        </section>

        <section className="forms">
          <CommonItemsForm
            commonItems={commonItems}
            setCommonItems={setCommonItems}
            isRent={isRent}
            setIsRent={setIsRent}
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
              isRent={isRent}
            />
          )}
        </section>
      </div>

      {commonItems && (
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
