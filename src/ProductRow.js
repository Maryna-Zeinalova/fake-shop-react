import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";

function ProductRow({ title, category, price, id, currency }) {
  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{category}</td>
      <td>
        <Price price={price} currency={currency} />
      </td>
      <td>
        <Link to={`Details/${id}`}>Details</Link>
      </td>
    </tr>
  );
}

export default ProductRow;
