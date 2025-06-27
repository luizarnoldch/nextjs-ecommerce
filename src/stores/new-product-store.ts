import { create } from "zustand";

export type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

interface NewProductState {
  name: string;
  price: string;
  description: string;
  images: ImageFile[];
  actions: {
    setName: (name: string) => void;
    setPrice: (price: string) => void;
    setDescription: (description: string) => void;
    setImages: (images: ImageFile[]) => void;
    addImage: (image: ImageFile) => void;
    removeImage: (index: number) => void;
  };
}

const useNewProductStore = create<NewProductState>()((set) => ({
  name: "",
  price: "",
  description: "",
  images: [],
  actions: {
    setName: (name: string) => set({ name }),
    setPrice: (price: string) => set({ price }),
    setDescription: (description: string) => set({ description }),
    setImages: (images: ImageFile[]) => set({ images }),
    addImage: (image: ImageFile) =>
      set((state) => ({ images: [...state.images, image] })),
    removeImage: (index: number) =>
      set((state) => ({ images: state.images.filter((_, i) => i !== index) })),
  },
}));

// Field selectors
export const useProductName = () => useNewProductStore((state) => state.name);
export const useProductPrice = () => useNewProductStore((state) => state.price);
export const useProductDescription = () =>
  useNewProductStore((state) => state.description);
export const useProductImages = () =>
  useNewProductStore((state) => state.images);

// Action hooks
export const useSetProductName = () =>
  useNewProductStore((state) => state.actions.setName);
export const useSetProductPrice = () =>
  useNewProductStore((state) => state.actions.setPrice);
export const useSetProductDescription = () =>
  useNewProductStore((state) => state.actions.setDescription);
export const useSetProductImages = () =>
  useNewProductStore((state) => state.actions.setImages);
export const useAddProductImage = () =>
  useNewProductStore((state) => state.actions.addImage);
export const useRemoveProductImage = () =>
  useNewProductStore((state) => state.actions.removeImage);
