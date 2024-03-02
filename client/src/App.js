import Search from "./container/Search";
import Products from "./container/Products";
import Details from "./container/Details";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("")
  const [productId, setProductId] = useState("");

  const [priceD, setPriceD] = useState("");
  const [starsD, setStarsD] = useState("");
  const [stockD, setStockD] = useState("")
  const [nameD, setNameD] = useState("");
  const [urlD, setUrlD] = useState("");
  const [reviewsD, setReviewD] = useState("");

  //fix footer postion
  const [pos, setPos] = useState("fixed");
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Search pos={pos} setPos={setPos} query={query} setQuery={setQuery} />
        }
      />
      <Route
        path="/search/:searchQuery"
        element={
          <Products
            query={query}
            // setQuery={setQuery}
            image={image}
            // setImage={setImage}
            productId={productId}
            setProductId={setProductId}
            price={price}
            setPrice={setPrice}
            // stars={stars}
            // setStars={setStars}
            // name={name}
            // setName={setName}
            url={url}
            setUrl={setUrl}
            pos={pos}
            setPos={setPos}
          />
        }
      />
      <Route
        path="/products/:productId"
        element={
          <Details
            nameD={nameD}
            image={image}
            priceD={priceD}
            starsD={starsD}
            description={description}
            setDescription={setDescription}
            productId={productId}
            setProductId={setProductId}
            stockD={stockD}
            reviewsD={reviewsD}
            setReviewD={setReviewD}
            setStarsD={setStarsD}
            setPriceD={setPriceD}
            setImage={setImage}
            setNameD={setNameD}
            setUrl={setUrl}
            setStockD={setStockD}
            setUrlD={setUrlD}
            pos={pos}
            setPos={setPos}
            urlD={urlD}
          />
        }
      />
    </Routes>
  );
}

export default App;
