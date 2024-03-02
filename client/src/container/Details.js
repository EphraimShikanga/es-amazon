import React, { useState, useEffect } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Footer from "../components/Footer";
const Details = ({
  nameD,
  image,
  priceD,
  starsD,
  urlD,
  stockD,
  setStockD,
  setReviewD,
  reviewsD,
  description,
  setDescription,
  setStarsD,
  setPriceD,
  setImage,
  setNameD,
  setUrlD,
  pos,
  setPos,
}) => {
  const { productId } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let [color] = useState("#FF9900");

  setPos("static");
  const fetchData = async () => {
    const apiUrl = `http://localhost:5000/products/${productId}`;

    try {
      const response = await fetch(apiUrl);
      console.log("API URL:", apiUrl)

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        // Handle the error, e.g., show an alert or navigate to an error page
        setLoading(false)
        return;
      }

      const data = await response.json();
      // Log the data to the console
      console.log("Fetched Data:", data);

      // Check if data is undefined or empty
      if (!data || data.length === 0) {
        alert("No results found");
        navigate("/");
      } else {
        setImage(data.images[1])

        if (!data.small_description) {
          setDescription(data.full_description.slice(0, 300));
        } else {
          setDescription(data.small_description.slice(0, 300));
        }

        setNameD(data.name);
        setStarsD(data.average_rating);
        setReviewD(data.total_reviews)
        setPriceD(data.pricing);
        setUrlD(`http://www.amazon.com/dp/${productId}`)
        setStockD(data.availability_status)
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  });

  return (
    <>
      {loading ? (
        <div className="grid place-items-center h-screen">
          <PulseLoader color={color} loading={loading} size={75} />
        </div>
      ) : (
        <>
          <div className="flex justify-center mt-8  text-stone-800 font-sans font-bold text-3xl md:text-5xl">
            <BiLeftArrowAlt
              className="text-3xl mt-2 md:mt-3  mx-8 cursor-pointer "
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            />
            Product Details
          </div>

          <div className="productJc flex justify-center">
            <div className="productDetailsCard shadow-lg shadow-slate-500 mb-16 rounded-xl bg-slate-200 border border-slate-800 mt-12  mx-8 w-[1100px]">
              <div className="imageTitle   mx-8">
                <div className="imageTitle text-xl md:text-2xl mt-2 font-bold">
                  {nameD}
                </div>
                <img
                  src={image}
                  alt="ProductImage"
                  className="productImage   mt-10"
                />
              </div>
              <div className="info  mx-12">
                <div className="price font-semibold mt-4 text-lg md:text-xl">
                  Price: {priceD}
                </div>
                <div className="rating font-semibold mt-4 text-lg md:text-xl">
                  Availability: {stockD}
                </div>
                <div className="rating font-semibold mt-4 text-lg md:text-xl">
                  Rating: {starsD}⭐
                </div>
                <div className="description font-semibold mt-4 text-lg md:text-xl">
                  Reviews: {reviewsD}
                </div>
                <div className="description font-semibold mt-4 text-lg md:text-xl">
                  Description: {description}
                </div>
                <div className="url font-semibold mt-4 mb-4 text-lg md:text-xl">
                  Link:
                  <a
                    href={urlD}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-500 underline mx-2  text-lg md:text-xl"
                  >
                    Click Here.
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer pos={pos} />
        </>
      )}
    </>
  );
};

export default Details;
