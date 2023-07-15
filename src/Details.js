import { useState, useEffect } from "react";
import { uniqBy } from "lodash";
import { useParams } from "react-router-dom";
import "./App.css";

function Details() {
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
      });
  }, []);

  let { id } = useParams();
  console.log({ product });
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} />
      Lorem {id}
    </div>
  );
}

export default Details;
