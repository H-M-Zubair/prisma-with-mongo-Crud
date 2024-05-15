import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

import { notFound } from "next/navigation";
import { cache } from "react";

interface pageProps {
  params: {
    id: string;
  };
}
const getProduct =cache(async(id:string)=>{
    const product = await prisma.product.findUnique({ where: { id } });
    if(!product) notFound();
    return product;
})
export async function generateMetadata({ params: { id } }: pageProps):Promise<Metadata>{
    const product= await getProduct(id)
    return {
        title: product.name +" -firstTry",
        description: product.description,
        openGraph:{images:[{url: product.imageURL},]}
    }
}
export default async function ProductPage({ params: { id } }: pageProps) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();
  return (
    <main>
      <div className="flex flex-col gap-4 lg:flex-row">
        <img
          src={product.imageURL}
          alt=""
          className="rounded-lg object-cover max-w-sm"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold"> {product.name}</h1>
          <PriceTag price={product.price} className="mt-4" />
          <p className="py-6">{product.description}</p>
        </div>
      </div>
    </main>
  );
}
