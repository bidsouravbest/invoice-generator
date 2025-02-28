import React, { useContext } from "react";
import "../../assets/css/generatepdf.css";
import {
  formatDocType,
  toINR,
  toWords,
  rectifyInvNo,
  getDate,
  getFinancialYear
} from "../../utils/utils";
import { ConfigContext } from "../../context/ConfigContext";

const PDFContent = ({ company, commonItems, otherItems }) => {
  const config = useContext(ConfigContext);

  const sellerDetails = config?.SELLER_DETAILS;
  const docHeading = config?.docHeading;
  const docTypes = config?.docTypes;
  const invoiceNoInitial = config?.invoiceNoInitial;

  const gstMargin = otherItems?.length > 5 ? "25px" : "60px";

  const dateFormatted = getDate(commonItems?.date);

  const invoiceNoFormatted = rectifyInvNo(
    commonItems?.invno,
    getFinancialYear(new Date(commonItems?.date)),
    invoiceNoInitial
  );

  return docTypes.map((docType) => {
    let amount = 0;
    let cgst = 0;
    let sgst = 0;
    let totalAmount = 0;

    return (
      <section className="main-container" id={"page-" + docType?.toLowerCase()}>
        <section className="title">
          <h1>{docHeading}</h1>
        </section>

        <section className="doc-type">
          <p>{formatDocType(docType)}</p>
        </section>

        <section className="comp-name-mob">
          <div className="mob">
            <p>Mob. No: {sellerDetails?.mob}</p>
          </div>
          <div className="name">
            <h1>{sellerDetails?.label}</h1>
          </div>
        </section>

        <section className="trading-info">
          <p>{sellerDetails?.tradingInfo}</p>
        </section>

        <section className="main-content">
          <div className="row gt-xy-0">
            <div className="col-5 bdr-1">
              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl pd-bt-10">Buyer's Name –</div>
                <div
                  className="col-9 txt-val txt-bold bdr-lft-1"
                  style={{ fontStretch: "ultra-expanded" }}
                >
                  {company?.label}
                </div>
              </div>

              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl">Buyer's Address –</div>
                <div className="col-9 txt-val bdr-lft-1">
                  {company?.addressL1}
                </div>
                <div className="col-3"></div>
                <div className="col-9 txt-val bdr-lft-1">
                  {company?.addressL2}
                </div>
                <div className="col-3"></div>
                <div className="col-9 txt-val bdr-lft-1 pd-bt-10">
                  {company?.addressL3}
                </div>
              </div>

              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl pd-bt-10">GSTIN/UIN:</div>
                <div className="col-9 txt-val bdr-lft-1 txt-bold">
                  {company?.gst}
                </div>
              </div>

              <div className="row gt-xy-0">
                <div className="col-3 txt-lbl pd-bt-10">State Name-</div>
                <div className="col-9 txt-val bdr-lft-1">{company?.state}</div>
              </div>
            </div>

            <div className="col-7 bdr-1">
              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl">Seller's Office Address –</div>
                <div className="col-9 txt-val bdr-lft-1">
                  {sellerDetails?.addressL1}
                </div>
                <div className="col-3"></div>
                <div className="col-9 txt-val bdr-lft-1">
                  {sellerDetails?.addressL2}
                </div>
              </div>

              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl pd-bt-10">GSTIN/UIN:</div>
                <div className="col-9 txt-val bdr-lft-1 txt-bold">
                  {sellerDetails?.gst}
                </div>
              </div>

              <div className="row gt-xy-0">
                <div className="col-6 bdr-right-1">
                  <div className="row gt-xy-0">
                    <div className="col-5 bdr-btm-1 pd-bt-10 fnt-13">
                      Invoice No.
                    </div>
                    <div className="col-7 bdr-btm-1">{invoiceNoFormatted}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="row gt-xy-0">
                    <div className="col-5 bdr-btm-1 pd-bt-10 fnt-13">
                      Dated:
                    </div>
                    <div className="col-7 bdr-btm-1">{dateFormatted}</div>
                  </div>
                </div>

                <div className="col-6 bdr-right-1">
                  <div className="row gt-xy-0">
                    <div className="col-5 bdr-btm-1 pd-bt-10 fnt-13">
                      Truck No.-
                    </div>
                    <div className="col-7 bdr-btm-1">{commonItems?.truck}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="row gt-xy-0">
                    <div className="col-5 bdr-btm-1 pd-bt-10 fnt-13">
                      Delivery Date:-
                    </div>
                    <div className="col-7 bdr-btm-1"></div>
                  </div>
                </div>

                <div className="col-6 bdr-right-1">
                  <div className="row gt-xy-0">
                    <div className="col-5 pd-bt-10 fnt-13">
                      Dispatched Through:-
                    </div>
                    <div className="col-7">{commonItems?.dispatch}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="row gt-xy-0">
                    <div className="col-5 pd-bt-10 fnt-13">Destination:-</div>
                    <div className="col-7"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="items">
            {/* Bill Items Headers */}
            <div className="bdr-1 d-flex bill-col-titles">
              <div className="wd-3-per fnt-13 txt-alig-center">SNo.</div>
              <div className="wd-43-per fnt-13 txt-alig-center">
                Description of Goods
              </div>
              <div className="wd-10-per fnt-13 txt-alig-center">HSN/SAC</div>
              <div className="wd-12-per fnt-13 txt-alig-center">Quantity</div>
              <div className="wd-10-per fnt-13 txt-alig-center">Rate</div>
              <div className="wd-8-per fnt-13 txt-alig-center">per</div>
              <div className="wd-15-per fnt-13 txt-alig-center">Amount</div>
            </div>

            {/* Bill Items */}
            <div className="bill-col-items">
              {otherItems?.map((item, index) => {
                const currentAmt =
                  item?.quantity !== 0
                    ? item?.quantity * item?.rate
                    : item?.rate;

                amount += currentAmt;
                cgst += currentAmt * 0.09;
                sgst += currentAmt * 0.09;

                if (index === otherItems?.length - 1) {
                  totalAmount = amount + cgst + sgst;
                }

                return (
                  <div className="d-flex">
                    <div className="wd-3-per fnt-13 txt-alig-center">
                      {index + 1}
                    </div>
                    <div className="wd-43-per fnt-13 pd-left-5">
                      {item?.desc?.toUpperCase()}
                    </div>
                    <div className="wd-10-per fnt-13 txt-alig-center">
                      {item?.hsn}
                    </div>
                    <div className="wd-12-per fnt-13 txt-alig-center">
                      {item?.quantity !== 0
                        ? item?.quantity?.toLocaleString("en-IN")
                        : "NIL"}
                    </div>
                    <div className="wd-10-per fnt-13 txt-alig-center">
                      {toINR(item?.rate, 3)}
                    </div>
                    <div className="wd-8-per fnt-13 txt-alig-center">
                      {item?.per}
                    </div>
                    <div className="wd-15-per fnt-13 txt-alig-center">
                      {item?.quantity !== 0
                        ? toINR(item?.quantity * item?.rate)
                        : toINR(item?.rate)}
                    </div>
                  </div>
                );
              })}

              {/* GST Section */}
              <div style={{ marginTop: gstMargin }}>
                <div className="d-flex">
                  <div className="wd-3-per"></div>
                  <div className="wd-43-per fnt-13 pd-right-10 txt-alig-right">
                    {"Output CGST @ 9%"}
                  </div>
                  <div className="wd-10-per"></div>
                  <div className="wd-12-per"></div>
                  <div className="wd-10-per"></div>
                  <div className="wd-8-per"></div>
                  <div className="wd-15-per fnt-13 txt-alig-center">
                    {toINR(cgst)}
                  </div>
                </div>

                <div className="d-flex">
                  <div className="wd-3-per"></div>
                  <div className="wd-43-per fnt-13 pd-right-10 txt-alig-right">
                    {"Output SGST @ 9%"}
                  </div>
                  <div className="wd-10-per"></div>
                  <div className="wd-12-per"></div>
                  <div className="wd-10-per"></div>
                  <div className="wd-8-per"></div>
                  <div className="wd-15-per fnt-13 txt-alig-center">
                    {toINR(sgst)}
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Dividers */}
            <div className="divider" style={{ left: "3%" }}></div>
            <div className="divider" style={{ left: "45.45%" }}></div>
            <div className="divider" style={{ left: "55.35%" }}></div>
            <div className="divider" style={{ left: "67.2%" }}></div>
            <div className="divider" style={{ left: "77.1%" }}></div>
            <div className="divider" style={{ left: "85%" }}></div>

            {/* Total Amount */}
            <div className="total-amt wd-15-per">
              {toINR(Math.round(totalAmount))}
            </div>
          </div>
        </section>

        <section>
          <div className="err-disclmr">{"E&OE"}</div>
        </section>

        <section className="amt-words">
          <span className="fnt-13">Amount in Words:- </span>
          {amount > 0 && (
            <span className="bdr-btm-1 fnt-14">
              {toWords.convert(totalAmount, 0)}
            </span>
          )}
        </section>
      </section>
    );
  });
};

export default PDFContent;
