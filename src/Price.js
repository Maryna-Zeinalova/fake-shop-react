import React from "react";
import currencyFormatter from "currency-formatter";

function Price({ price, currency }) {
  return <>{currencyFormatter.format(price, { code: currency })}</>;
}

export default Price;
