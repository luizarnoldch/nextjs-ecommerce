import React from 'react';
import NewProductPreview from '../components/NewProductPreview';
import ProductForm from '../components/NewProductForm';

const NewProduct = () => {
  return (
    <div
      className="flex flex-col xl:flex-row xl:flex-1 h-full rounded-2xl shadow-2xl p-4 gap-4"
    >
      <section
        className="xl:w-6/12 w-full"
      >
        <ProductForm />
        {/* <NewProductIa/> */}
      </section>

      <section
        className="xl:w-6/12 w-full"
      >
        <NewProductPreview />
      </section>
    </div>
  );
};

export default NewProduct;