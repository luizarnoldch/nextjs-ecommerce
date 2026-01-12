import ProductForm from "../components/NewProductForm"
import NewProductPreview from "../components/NewProductPreview"

const NewProduct = () => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl p-4 shadow-2xl xl:flex-1 xl:flex-row">
      <section className="w-full xl:w-2/5">
        <ProductForm />
      </section>

      <section className="w-full xl:w-3/5">
        <NewProductPreview />
      </section>
    </div>
  )
}

export default NewProduct
