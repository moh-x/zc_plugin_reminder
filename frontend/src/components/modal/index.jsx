// TODO - Click outside modal catches all pointer events including those meant for the modal. Probably a z-index issue. Disabled until fixed

import React, { useContext } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { ModalContext } from '../../context/ModalContext'

const Modal = ({ title, children, ...props }) => {
	// Clunky and should be updated to use local state

	const { modalData, setModalData } = useContext(ModalContext)

	const closeModal = () => setModalData({ ...modalData, modalShow: false })

	return (
		<>
			<Transition appear show={modalData.modalShow} as={Fragment}>
				<Dialog
					as="div"
					initialFocus={null}
					className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur backdrop-brightness-50 "
					onClose={closeModal}
					{...props}
				>
					<div className="min-h-screen text-center min-w-screen ">
						<Transition.Child
							as={'div'}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							{/* <Dialog.Overlay
								className="fixed inset-0"
								onClick={() => closeModal()}
							/> */}
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-5/6 max-w-5xl align-middle transition-all bg-white rounded-lg shadow-xl md:w-3/5">
								<Dialog.Title
									as="h3"
									className="flex items-center justify-between w-full p-5 font-medium leading-6 rounded-t-lg bg-brand-primary"
								>
									<p className="text-xl text-white">{title}</p>
									<button
										className="w-10 h-10 m-0 text-center bg-white rounded-full text-brand-primary hover:text-brand-error"
										onClick={closeModal}
									>
										<XIcon className="w-5 h-5 m-auto" />
									</button>
								</Dialog.Title>
								<div className="w-full h-full p-5 mt-2">{children}</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default Modal
