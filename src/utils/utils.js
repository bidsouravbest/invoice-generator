import { ToWords } from "to-words";

export const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

export const docHeading = "Invoice";

export const SELLER_DETAILS = {
  label: "ISKCON   CHEMICALS",
  value: "Iskcon_Chemicals",
  addressL1:
    "Ground Floor, House No.-0230202, Hill Colony, College More, Kulti",
  addressL2: "Dist: Paschim Bardhaman, West Bengal, 713343",
  addressL3: "",
  gst: "19ADDPB4876D2ZN",
  state: "WEST BENGAL",
  mob: "+91 7001406525",
  tradingInfo:
    "Trading Of All Kinds Of Refractory Materials (Sales And Purchase) And General Order Suppliers.",
};

export const BUYER_COMPANIES = [
  {
    label: "PARTHANA VINMAY PRIVATE LIMITED",
    value: "Prathana_Vinmay_Pvt_Ltd",
    addressL1: "Ground Floor, Shop No.- 04, Shree Shyam,",
    addressL2: "Plaza, Bishnu Bihar Colony Neamatpur,",
    addressL3: "Sitarampur, Bardhaman, West Bengal",
    gst: "19AAECP6682Q1ZF",
    state: "West Bengal",
  },
  {
    label: "GANAPATI ENGINEERING",
    value: "Ganapati_Engineering",
    addressL1: "Near W.B.S.E.D.C.L. Call Centre,",
    addressL2: "Thana More, Kulti, Bardhaman,",
    addressL3: "West Bengal, 713343",
    gst: "19AASFG2364F1Z4",
    state: "West Bengal",
  },
];

export const docType = {
  orig: "(Original)",
  dup: "(Duplicate)",
  trip: "(Triplicate)",
};

export const invoiceNoInitial = "IC/";
export const currentFY = "25-26";
export const previousFY = "24-25";

export const toINR = (amount, decimal) => {
  return amount
    ?.toLocaleString("en-IN", {
      maximumFractionDigits: decimal || 2,
      style: "currency",
      currency: "INR",
    })
    .replace("₹", "\u20B9");
};
