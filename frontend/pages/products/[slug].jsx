import React from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

import { useStateContext } from "../../lib/context";

const ProductDetailses = () => {
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext();
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading ....</p>;
  if (error) return <p>Oh no ... {error.message}</p>;
  const products = data.products.data[0].attributes;
  const { title, description, image, price } = products;

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
        <Buy onClick={() => onAdd(products, qty)}>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

export default ProductDetailses;
