import React, { useContext, useEffect, useState } from "react";
import GeneratePDF from "./GeneratePDF";
import { Select } from "antd";
import OtherItems from "./forms/OtherItems";
import CommonItemsForm from "./forms/CommonItemsForm";
import ItemsView from "./ItemsView";
import { ConfigContext } from "../context/ConfigContext";
import "../assets/css/home.css";

const Home = () => {
  const config = useContext(ConfigContext);

  const buyerCompanies = config?.BUYER_COMPANIES;

  const [section, setSection] = useState(1);

  const [company, setCompany] = useState(null);

  const [otherItems, setOtherItems] = useState([]);
  const [commonItems, setCommonItems] = useState(null);

  const [isRent, setIsRent] = useState(false);

  const handleBuyerSelect = (value, option) => {
    setCompany(option);
  };

  const handleDeleteItem = (item) => {
    const updatedData = otherItems?.filter(
      (datum) => datum?.uniqueID !== item?.uniqueID
    );

    setOtherItems(updatedData);
  };

  return (
    <article>
      <div className="ic-home">
        <section>
          <Select
            showSearch
            labelInValue
            placeholder="Select Buyer Company"
            optionFilterProp="label"
            onChange={handleBuyerSelect}
            options={buyerCompanies}
            className="comp-select"
          />
        </section>

        <section className="forms">
          {company && section === 1 && (
            <CommonItemsForm
              commonItems={commonItems}
              setCommonItems={setCommonItems}
              isRent={isRent}
              setIsRent={setIsRent}
              section={section}
              setSection={setSection}
            />
          )}

          {otherItems?.length > 0 && (
            <div className="item-det">
              <ItemsView otherItems={otherItems} handleDeleteItem={handleDeleteItem} />
            </div>
          )}

          {section === 2 && (
            <OtherItems
              otherItems={otherItems}
              setOtherItems={setOtherItems}
              isRent={isRent}
              setSection={setSection}
              section={section}
            />
          )}
        </section>
      </div>

      {commonItems && (
        <GeneratePDF
          commonItems={commonItems}
          otherItems={otherItems}
          company={company}
        />
      )}
    </article>
  );
};

export default Home;
