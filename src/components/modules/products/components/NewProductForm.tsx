"use client";

import { FormEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ImageDropzone from "./ImageDropZone";
import type { ImageFile } from "@/stores/new-product-store";

import {
  useProductName,
  useSetProductName,
  useProductPrice,
  useSetProductPrice,
  useProductDescription,
  useSetProductDescription,
  useProductImages,
  useSetProductImages,
} from "@/stores/new-product-store";

const ProductForm = () => {
  const name = useProductName();
  const setName = useSetProductName();

  const price = useProductPrice();
  const setPrice = useSetProductPrice();

  const description = useProductDescription();
  const setDescription = useSetProductDescription();

  const images = useProductImages();
  const setImages = useSetProductImages();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // Aquí podrías enviar `name`, `price`, `description` e `images` a tu API
      console.log({ name, price, description, images });
    },
    [name, price, description, images]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Formulario de producto</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Ahora ImageDropzone recibe los hooks directamente */}
        <ImageDropzone images={images} setImages={setImages} />

        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            Nombre:
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label htmlFor="price" className="block text-sm font-medium">
            Precio:
          </Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label htmlFor="description" className="block text-sm font-medium">
            Descripción:
          </Label>
          <Textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>

        <Button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 focus:outline-none focus:ring-2"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
