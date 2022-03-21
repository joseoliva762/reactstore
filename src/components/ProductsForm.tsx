import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useRef, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Product, ProductToCreate } from '@models/product';
import { usePaginate } from '@hooks/usePaginate';
import { addProducts, getAllProducts } from '@services/api/products';
import { useLoading } from '@hooks/useLoading';
import { AlertModel } from '@models/alert';

interface ProductsFormParams {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<SetStateAction<AlertModel>>;
}

export default function ProductsForm({ setOpen, setAlert }: ProductsFormParams) {
  const { changeLoadingState } = useLoading();
  const { setProducts } = usePaginate();
  const [file, setFile] = useState<File>();
  const formRef = useRef<HTMLFormElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeLoadingState(true);
    const formdata = new FormData(event.currentTarget);
    const payload: ProductToCreate = {
      title: formdata.get('title') as string,
      price: parseInt(formdata.get('price')?.toString() || '0'),
      description: formdata.get('description') as string,
      categoryId: parseInt(formdata.get('category')?.toString() || '0'),
      images: [(formdata.get('images') as File).name]
    };
    addProducts(payload)
      .then(() => {
        getAllProducts(0, 0).then((products: Product[]) => {
          setProducts(products);
          formRef.current?.reset();
          setOpen(false);
          changeLoadingState(false);
          setAlert({
            active: true,
            message: 'Product added successfully',
            type: 'success',
            autoClose: false
          });
        });
      })
      .catch((error) => {
        changeLoadingState(false);
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: true
        });
      });
  };

  const handleImages = () => {
    setFile(imagesRef.current?.files?.[0]);
  };

  const handleDeleteImage = () => {
    if (imagesRef.current?.value) {
      imagesRef.current.value = '';
      setFile({} as File);
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full">
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input type="text" name="title" id="title" className="border border-gray-300 bg-white rounded mt-1 h-12 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input type="number" name="price" id="price" className="border border-gray-300 bg-white rounded mt-1 h-12 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm" required />
              </div>
              <div className="col-span-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className="mt-1 h-12 p-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="1">Clothes</option>
                  <option value="2">Electronics</option>
                  <option value="3">Furniture</option>
                  <option value="4">Toys</option>
                  <option value="5">Others</option>
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  autoComplete="description"
                  rows={3}
                  className="border border-gray-300 bg-white p-1 form-textarea mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded resize-none"
                  required
                />
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-2 h-full w-full">
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    Cover photo
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-gray-300 border-dashed rounded shadow-sm">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex gap-1 text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input onChange={handleImages} ref={imagesRef} id="images" name="images" type="file" className="sr-only" required />
                        </label>
                        <p>or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  <div className={`${!file?.name && 'invisible'} flex gap-1 items-center justify-between p-1`}>
                    <p className="block text-sm font-medium text-gray-700">{file?.name || 'undefined'}</p>
                    <button onClick={handleDeleteImage} className="bg-transparent h-5 w-5 active:brightness-90" type="button">
                      <XIcon className="fill-gray-300 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
