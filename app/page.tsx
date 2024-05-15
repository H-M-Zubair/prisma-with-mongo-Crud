import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // fetching data from database in descending order to fetch new product on top
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <main>
      <div>
        <div className="hero  bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={products[0].imageURL}
              className="max-w-sm rounded-lg shadow-2xl"
              height={800}
              width={400}
              alt={products[0].name}
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">
                {products[0].description}
              </p>
              <Link href={"products/"+products[0].id} className="btn btn-primary">CHECK IT OUT</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 " >
        {products.slice(1).map(product=>(<ProductCard product ={product}key={product.id}/>))}
        </div>
    </main>
  );
}
