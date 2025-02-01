import { ToWords } from "to-words";

export const wd100 = { width: "100%" };

export const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
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

export const toINR = (amount, decimal) => {
  return amount
    ?.toLocaleString("en-IN", {
      maximumFractionDigits: decimal || 2,
      style: "currency",
      currency: "INR",
    })
    .replace("₹", "Rs ");
};

export const rectifyInvNo = (invoiceNo, finYear, invoiceNoInitial) => {
  if (invoiceNo < 10) {
    return invoiceNoInitial + finYear + "/" + "0" + invoiceNo;
  }

  return invoiceNoInitial + finYear + "/" + invoiceNo;
};

export const getDate = (date) => {
  return new Date(date)
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");
};

export const getFinancialYear = (date) => {
  const fullYear = Number(String(date.getFullYear())?.slice(-2)); // Last 2 digits only

  if (date.getMonth() + 1 <= 3) {
    return fullYear - 1 + "-" + fullYear;
  }

  return fullYear + "-" + (fullYear + 1);
};

export const formatDocType = (type) => {
  return `(${type})`;
};

export const onFinishFailed = (error) => {
  console.log("Failed:", error);
};
