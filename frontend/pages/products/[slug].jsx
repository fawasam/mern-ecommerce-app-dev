import { useQuery } from "urql";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useStateContext } from "../../lib/context";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ProductDetailses = () => {
  //use State
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  //Reset qty
  useEffect(() => {
    setQty(1);
  }, []);

  //Fetch Slug
  const { query } = useRouter();

  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  //Check for the data comin gin
  if (fetching) return <p>Loading ....</p>;
  if (error) return <p>Oh no ... {error.message}</p>;
  const products = data.products.data[0].attributes;
  const { title, description, image, price } = products;

  //create a toast
  const notify = () => {
    toast.success(`${title} added to your cart`, { duration: 1500 });
  };

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.small.url} alt="" />
      <ProductInfo>
        <h1>{title}</h1>
        <p>{description}</p>

        <h1>₹{price}</h1>

        <Quantity>
          <span>Qunatity</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <span>{qty}</span>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(products, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

export default ProductDetailses;
