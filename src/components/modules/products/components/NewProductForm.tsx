import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ProductForm = () => {
  return (
    <div className="p-6">
      <h2 className="mb-4 font-bold text-2xl">Formulario de producto</h2>
      <form className="space-y-4">
        <div>
          <Label
            htmlFor="name"
            className="block font-medium text-sm"
          >
            Nombre:
          </Label>
          <Input
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="price"
            className="block font-medium text-sm"
          >
            Precio:
          </Label>
          <Input
            id="price"
            type="number"
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block font-medium text-sm"
          >
            Descripción:
          </Label>
          <Textarea
            id="description"
            rows={4}
            className="mt-1 block w-full rounded-md shadow-sm"
          ></Textarea>
        </div>
        <Button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 focus:outline-none focus:ring-2"
        >
          Guardar
        </Button>
      </form>
    </div>
  )
}

export default ProductForm
