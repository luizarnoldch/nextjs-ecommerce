import ProductForm from "../components/NewProductForm"
import NewProductPreview from "../components/NewProductPreview"

const NewProduct = () => {
  return (
    <div className="flex flex-col xl:flex-row xl:flex-1 h-full rounded-2xl shadow-2xl p-4 gap-4">
      <section className="xl:w-2/5 w-full">
        <ProductForm />
      </section>

      <section className="xl:w-3/5 w-full">
        <NewProductPreview />
      </section>
    </div>
  )
}

export default NewProduct
