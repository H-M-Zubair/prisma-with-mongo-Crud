import React from "react";
import { product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";
interface ProductCardProps {
  product: product;
}
function ProductCard({ product }: ProductCardProps) {
  const isNew=Date.now() - new Date(product.createdAt).getTime()<1000*60*60*24*7;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {" "}
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="h-[300px]">
          <img src={product.imageURL} height={330} width={200} alt={product.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          {isNew && <div className="badge badge-accent">NEW</div>}
          <p>{product.description}</p>
          <PriceTag price={product.price}/>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
