import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Footer from "../components/Footer";

const Products = ({
  query,
  image,
  productId,
  setProductId,
  url,
  pos,
  setPos,
}) => {
  const [querySent, setQuerySent] = useState(false);
  const [products, setProducts] = useState([]); // State for storing the products
  const navigate = useNavigate();
  setPos("static");

  // Function to fetch data
  const fetchData = async () => {
    if (querySent) return; // Return early if query has already been sent

    const apiUrl = `http://localhost:5000/search/${query}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length === 0) {
          alert("No results found");
          navigate("/");
        } else if (data.results && data.results.length > 0) {
          setProducts(data.results.slice(0, 15));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setQuerySent(true));
  };

  useEffect(() => {
  fetchData();
}, []); 

useEffect(() => {
  window.localStorage.setItem("productId", JSON.stringify(productId));
  window.localStorage.setItem("image", JSON.stringify(image));
  window.localStorage.setItem("url", JSON.stringify(url));
}, [productId, image, url]);


  function subStrAfterChars(str, char, pos) {
    if (pos === "b") return str.slice(str.indexOf(char));
    else if (pos === "a") return str.slice(0, str.indexOf(char) + 4);
    else return str;
  }

  const afterDp = subStrAfterChars(url, "/dp/", "a");
  const beforeRef = subStrAfterChars(url, "/ref", "b");
  const combined = afterDp + beforeRef;
  const sameUrl = subStrAfterChars(url, combined);
  var sliceAfterRef = sameUrl.replace(beforeRef, "");
  setProductId(sliceAfterRef.replace(afterDp, ""));

  return (
    <>
      {!querySent ? (
        <div className=" grid place-items-center h-screen">
          <PulseLoader color="#FF9900" loading={!querySent} size={75} />
        </div>
      ) : (
        <div>
          <div className="flex justify-center mt-8 text-stone-800 font-sans font-bold text-3xl   md:text-5xl">
            <BiLeftArrowAlt
              className="text-2xl md:text-3xl mt-2 md:mt-3 mx-4 cursor-pointer "
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            />
            Top Results
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.asin}
                name={product.name.slice(0, 20)}
                image={product.image}
                price={product.price}
                stars={product.stars}
                url={product.url}
                productId={product.asin}
              />
            ))}
          </div>
          <Footer pos={pos} />
        </div>
      )}
    </>
  );
};

export default Products;