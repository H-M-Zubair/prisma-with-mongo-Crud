import prisma from "@/lib/db/prisma";
import React from "react";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";
function Page() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageURL = formData.get("imageURL")?.toString();
    const price = Number(formData.get("price") || 0);
   
    if (!name) {
      throw Error("Name is required.");
    }
    if (!description) {
      throw Error("Description is required.");
    }
    if (!imageURL) {
      throw Error("Description is required.");
    }
    if (!price) {
      throw Error("Description is required.");
    }
    if (!name || !description || !imageURL || !price) {
      throw Error("Missing Required Fields");
    }
   const product= await prisma.product.create({
      data: { name, description, price, imageURL },
    });
    redirect("/");
  }
  return (
    <div className="p-4">
      <div className=" ">
        <h1 className="my-8 text-center font-bold text-lg">Add Product</h1>
        <div className="flex justify-center items-center ">
          {" "}
          <form action={addProduct}>
            <div className="flex flex-col gap-2  p-4 rounded-lg  ">
              {" "}
              <input
                required
                type="text"
                placeholder="Name"
                className="input input-bordered mb-2  border border-gray-700 rounded-md w-full min-w-sm"
                name="name"
              />
              <textarea
                required
                className="textarea mb-2 border border-gray-700 rounded-md max-w-[320px]  textarea-bordered"
                placeholder="Description"
                name="description"
              ></textarea>
              <input
                required
                type="url"
                placeholder="ImageUrl"
                className="input input-bordered mb-2 border border-gray-700 rounded-md  w-full max-w-xs"
                name="imageURL"
              />
              <input
                required
                type="number"
                placeholder="Price"
                className="input input-bordered mb-2 border border-gray-700 rounded-md  w-full max-w-xs"
                name="price"
              />
            </div>
            <FormSubmitButton className=" btn-block">
              Add Product{" "}
            </FormSubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
