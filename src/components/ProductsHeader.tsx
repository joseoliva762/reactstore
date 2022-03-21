import Alert from '@common/Alert';
import Modal from '@common/Modal';
import { CheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import ProductsForm from './ProductsForm';
import { useAlert } from '@hooks/useAlert';

export default function ProductsHeaders() {
  const [open, setOpen] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();

  return (
    <>
      {alert.active && <Alert alert={alert} handleClose={toggleAlert} />}
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="hidden text-md font-bold leading-7 text-gray-900 sm:text-lg sm:truncate sm:block">List of Products</h2>
        </div>
        <div className="flex lg:mt-0 lg:ml-4">
          <span className="">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Product
            </button>
          </span>
        </div>
        <Modal open={open} setOpen={setOpen}>
          <ProductsForm setAlert={setAlert} setOpen={setOpen} />
        </Modal>
      </div>
    </>
  );
}
