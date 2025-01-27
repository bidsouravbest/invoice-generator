import React, { useRef } from "react";
import jsPDF from "jspdf";
import "../assets/css/generatepdf.css";
import { Button } from "antd";
import PDFContent from "./pdf/PDFContent";

const GeneratePDF = ({ commonItems, items, company }) => {
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

      <article ref={pdfRef}>
        <PDFContent
          company={company}
          commonItems={commonItems}
          items={items}
          pageID={"test"}
        />
      </article>
    </div>
  );
};

export default GeneratePDF;
