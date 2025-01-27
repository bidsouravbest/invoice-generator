import React, { useRef } from "react";
import jsPDF from "jspdf";
import "../assets/css/generatepdf.css";
import {
  docHeading,
  docType,
  SELLER_DETAILS,
  toINR,
  toWords,
} from "../utils/utils";
import { Button } from "antd";

const GeneratePDF = ({ commonItems, items, company }) => {
  const gstMargin = items?.length > 5 ? "25px" : "60px";

  let amount = 0;
  let cgst = 0;
  let sgst = 0;
  let totalAmount = 0;

  const pdfRef = useRef();

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.html(pdfRef.current, {
      callback: (doc) => {
        doc.save(commonItems?.invno?.toString() + ".pdf");
      },
      autoPaging: "text",
      margin: [40, 60, 40, 60],
      x: 0,
      y: 0,
      width: 700, // adjust width based on your content
      windowWidth: 1100, // adjust window width for better rendering
    });
  };

  return (
    <div style={{ overflowX: "scroll" }}>
      <div className="gen-btn">
        <Button disabled={!items?.length > 0} onClick={generatePDF}>
          Generate PDF
        </Button>
      </div>

      <article ref={pdfRef} className="main-container">
        <section className="title">
          <h1>{docHeading}</h1>
        </section>

        <section className="doc-type">
          {/* <p>{docType.orig}</p> */}
        </section>

        <section className="comp-name-mob">
          <div className="mob">
            <p>Mob. No: {SELLER_DETAILS?.mob}</p>
          </div>
          <div className="name">
            <h1>{SELLER_DETAILS?.label}</h1>
          </div>
        </section>

        <section className="trading-info">
          <p>{SELLER_DETAILS?.tradingInfo}</p>
        </section>

        <section className="main-content">
          <div className="row gt-xy-0">
            <div className="col-5 bdr-1">
              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl pd-bt-10">Buyer's Name –</div>
                <div className="col-9 txt-val txt-bold bdr-lft-1">
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
                  {SELLER_DETAILS?.addressL1}
                </div>
                <div className="col-3"></div>
                <div className="col-9 txt-val bdr-lft-1">
                  {SELLER_DETAILS?.addressL2}
                </div>
              </div>

              <div className="row gt-xy-0 bdr-btm-1">
                <div className="col-3 txt-lbl pd-bt-10">GSTIN/UIN:</div>
                <div className="col-9 txt-val bdr-lft-1 txt-bold">
                  {SELLER_DETAILS?.gst}
                </div>
              </div>

              <div className="row gt-xy-0">
                <div className="col-6 bdr-right-1">
                  <div className="row gt-xy-0">
                    <div className="col-5 bdr-btm-1 pd-bt-10 fnt-13">
                      Invoice No.
                    </div>
                    <div className="col-7 bdr-btm-1">{commonItems?.invno}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="row gt-xy-0">
                    <div className="col-5 bdr-btm-1 pd-bt-10 fnt-13">
                      Dated:
                    </div>
                    <div className="col-7 bdr-btm-1">{commonItems?.date}</div>
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
              {items?.map((item, index) => {
                const currentAmt = item?.quantity * item?.rate;

                amount += currentAmt;
                cgst += currentAmt * 0.09;
                sgst += currentAmt * 0.09;

                if (index === items?.length - 1) {
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
                      {item?.quantity?.toLocaleString("en-IN")}
                    </div>
                    <div className="wd-10-per fnt-13 txt-alig-center">
                      {toINR(item?.rate, 3)}
                    </div>
                    <div className="wd-8-per fnt-13 txt-alig-center">
                      {item?.per}
                    </div>
                    <div className="wd-15-per fnt-13 txt-alig-center">
                      {toINR(item?.quantity * item?.rate)}
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
      </article>
    </div>
  );
};

export default GeneratePDF;
