import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { Button, Modal } from 'antd';

export default function Home(props) {
    const [products, setproducts] = useState([])
    console.log(products);

    async function getAllData() {
        let res = await fetch('https://dummyjson.com/products?limit=0&skip=0');
        let data = await res.json();
        console.log(data);
        console.log(data.products);
        
        setproducts(data.products)
    }
    useEffect(() => {
        getAllData()
    }, [])

    function handleClick(ans) {
        console.log(ans)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedObj, setSelectedObj] = useState('')

    const showModal = (ans) => {
        setIsModalOpen(true);
        setSelectedObj(ans)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleaddToCart = (item) => {
        props.xyz(item)
    }

    return (
        <div className='grid grid-cols-12 gap-2 bg-black p-5 sticky'>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>

                <div className='flex gap-3 md:flex-row flex-col' >
                    <img src={selectedObj.thumbnail} alt="" />
                    <div>
                        <h1 className='text-2xl mb-3'>{selectedObj.title}</h1>
                        <h3 className='text-xl'><b>Brand : </b>{selectedObj.brand}</h3>
                        <h5 className='text-xl mb-3'><b>Category : </b>{selectedObj.category}</h5>
                        <p className='mb-3'>{selectedObj.description}</p>
                        <p><b>$</b> {selectedObj.price}</p>
                        <p><b>Discount</b> : {selectedObj.discountPercentage} %</p>
                    </div>
                </div>

                <div>
                    <h3 className='text-center'>Review</h3>
                    <div className='grid grid-cols-12'>
                        {selectedObj?.reviews?.map((ele) => {
                            return <div className='bg-orange-400 md:col-span-4 sm:col-span-6 col-span-12 p-6 rounded-lg mx-2' >
                                <p>{ele.reviewerName}</p>
                                <p>{ele.rating}</p>
                                <p>{ele.comment}</p>
                            </div>
                        })}
                    </div>
                </div>
            </Modal>
            {
                products.map((ele) => {
                    return <div className="relative lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <FaRegEye size={25} className='absolute right-4 top-2' onClick={() => showModal(ele)} />
                        <img className="rounded-t-lg" src={ele.thumbnail} alt />

                        <div className="p-5">
                            <h5 className="h-5 mb-14 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ele.title}</h5>
                            <Link to="#" onClick={() => handleClick(ele)} className="inline-flex mx-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View Product
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                            <Link to="#" onClick={() => { handleaddToCart(ele) }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg- focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add to Cart
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
