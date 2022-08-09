import React from "react";
import { ProductStyles } from "../styles/ProductStyle";
import Link from "next/link";
const Products = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  return (
    <ProductStyles>
      <Link href={`products/${slug}`}>
        <a>
          <img src={image.data.attributes.formats.small.url} alt="" />
          <div></div>
          <h2>{title}</h2>
          <h3>₹{price}</h3>
        </a>
      </Link>
    </ProductStyles>
  );
};

export default Products;
