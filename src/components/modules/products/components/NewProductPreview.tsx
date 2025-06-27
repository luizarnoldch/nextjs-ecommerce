"use client";

import React from "react";
import {
  useProductName,
  useProductPrice,
  useProductDescription,
  useProductImages,
  useRemoveProductImage,
} from "@/stores/new-product-store";

const NewProductPreview = () => {
  const name = useProductName();
  const price = useProductPrice();
  const description = useProductDescription();
  const images = useProductImages();
  const removeImage = useRemoveProductImage();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Resumen del producto</h2>
      <p>
        <strong>Nombre:</strong> {name || "(vacío)"}
      </p>
      <p>
        <strong>Precio:</strong> {price || "(vacío)"}
      </p>
      <p>
        <strong>Descripción:</strong> {description || "(vacío)"}
      </p>
      <div className="mt-4">
        <strong>Imágenes:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, idx) => (
            <div key={img.id} className="relative">
              <img
                src={img.preview}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
          {images.length === 0 && <p className="text-sm text-gray-500">(ninguna)</p>}
        </div>
      </div>
    </div>
  );
};

export default NewProductPreview;
