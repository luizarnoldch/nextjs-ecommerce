"use client"

import React, { useEffect, useCallback } from 'react';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDropzone } from 'react-dropzone';

import { Label } from '@/components/ui/label';

import ImageSortable from './ImageSortable';

import type { ImageFile } from '@/stores/new-product-store';

type ImageDropzoneProps = {
  images: ImageFile[];
  setImages: (imgs: ImageFile[]) => void;
};

const ImageDropzone = ({ images, setImages }: ImageDropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mapped: ImageFile[] = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...mapped]);
    },
    [images, setImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
  }, [images]);

  const removeImage = (index: number) => {
    const filtered = images.filter((_, i) => i !== index);
    setImages(filtered);
    const rem = images[index];
    if (rem) URL.revokeObjectURL(rem.preview);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIdx = images.findIndex((img) => img.id === active.id);
      const newIdx = images.findIndex((img) => img.id === over.id);
      setImages(arrayMove(images, oldIdx, newIdx));
    }
  };

  return (
    <div>
      <Label className="block text-sm font-medium mb-1">Imágenes del producto</Label>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
      >
        <input {...getInputProps()} />
        <p className={isDragActive ? 'text-blue-600' : 'text-gray-500'}>
          {isDragActive
            ? 'Suelta las imágenes aquí...'
            : 'Haz click o arrastra imágenes aquí para subir'}
        </p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((img, idx) => (
              <ImageSortable key={img.id} image={img} index={idx} removeImage={removeImage} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ImageDropzone;
