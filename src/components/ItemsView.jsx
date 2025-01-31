import React from "react";
import "../assets/css/itemsview.css";

const ItemsView = ({ items, handleDeleteItem }) => {
  return (
    <div className="items-view">
      <h5>Items List</h5>
      <div>
        <ol>
          {items?.map((item) => {
            return (
              <>
                <li key={item?.uniqueID}>
                  {`${item?.desc}, ${item?.quantity} x @ ${item?.rate} / ${item?.per} (HSN-${item?.hsn})`}
                  <span
                    className="del-btn"
                    onClick={() => {
                      handleDeleteItem(item);
                    }}
                  >
                    X
                  </span>
                </li>
              </>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ItemsView;
