"use client"

import Image from 'next/image';
import { X as XIcon } from 'lucide-react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

type SortableImageProps = {
  image: ImageFile;
  index: number;
  removeImage: (index: number) => void;
};

const ImageSortable = ({ image, index, removeImage }: SortableImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-24 h-24 rounded overflow-hidden border flex items-center justify-center cursor-move group"
      onDoubleClick={() => removeImage(index)}
    >
      <div className="relative w-24 h-24">
        <Image
          src={image.preview}
          alt={`Imagen ${index + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded"
        />
      </div>
      <button
        type="button"
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white rounded-full p-1"
        aria-label={`Eliminar imagen ${index + 1}`}
        onClick={(e) => {
          e.stopPropagation();
          removeImage(index);
        }}
      >
        <XIcon size={14} />
      </button>
    </div>
  );
};

export default ImageSortable;