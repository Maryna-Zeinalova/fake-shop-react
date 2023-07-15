import { useState, useEffect, useDebugValue } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import ProductRow from "./ProductRow";

function App({ currency: globalCurrency }) {
  const [categoryValue, setCategoryValue] = useState("men's clothing");
  const [listOfProducts, setListOfProducts] = useState([]);
  const [listOfCategories, setListOFCategories] = useState([]);
  const [currency, setCurrency] = useState(globalCurrency);
  const [exchangePrice, setExchangePrice] = useState();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setListOFCategories(json);
      });
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setListOfProducts(json);
      });
  }, []);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/" + categoryValue)
      .then((res) => res.json())
      .then((json) => {
        setListOfProducts(json);
      });
  }, [categoryValue]);

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <select
            value={categoryValue}
            onChange={(e) => {
              setCategoryValue(e.target.value);
              setListOfProducts(
                listOfProducts.map((product) => ({
                  ...product,
                  isActive: e.target.value === product.category,
                }))
              );
            }}
          >
            <option value="all products">All products</option>
            {listOfCategories.map((category) => {
              return (
                <option
                  defaultValue={category === categoryValue}
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              );
            })}
          </select>
          <input type="text" placeholder="max price" />

          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              const myHeaders = new Headers();
              myHeaders.append("apikey", "vBPtQsNDZt86E7k6CEUgoKbfPZffaK2P");
              const requestOptions = {
                method: "GET",
                redirect: "follow",
                headers: myHeaders,
              };

              if (e.target.value !== "USD") {
                listOfProducts.map((product) => {
                  fetch(
                    `https://api.apilayer.com/fixer/convert?to=${e.target.value}&from=${currency}&amount=${product.price}`,
                    requestOptions
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      setListOfProducts(
                        listOfProducts.map((product) => ({
                          ...product,
                          price: data.result,
                        }))
                      );
                    })
                    .catch((error) => console.log("error", error));
                });
              } else {
                return listOfProducts;
              }
            }}
          >
            <option defaultValue={currency} value="USD">
              USD
            </option>
            <option value="UAH">UAH</option>
            <option value="EUR">EUR</option>
          </select>
        </form>
        <table>
          <tbody>
            {listOfProducts.map(({ title, category, price, id }) => {
              return (
                <ProductRow
                  title={title}
                  category={category}
                  price={price}
                  id={id}
                  currency={currency}
                />
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
