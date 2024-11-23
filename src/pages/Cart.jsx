import React from 'react'

export default function Cart(props) {
    console.log(props)
    
    
    const btnIncrement = (ans, i) => {
        console.log(ans)
        console.log(i)

        let updateObj = {...ans,quantity : ans.quantity + 1,price : ans.price + (ans.price / ans.quantity)}
        let copyArr = [...props.item]
        copyArr[i] = updateObj

        console.log("running")
        props.setCartArr(copyArr)

    }

    const handleDelete= (ele,i) => {
        let filterArr = props.item.filter((obj)=>obj.id != ele.id)
        props.setCartArr(filterArr)
    }

    
    let sum = 0
    props.item.map((ele)=>{
        sum = sum + ele.price
    })
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S.no.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.item.map((ele, index) => {
                            return <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                        </th>
                        <td className="px-6 py-4">
                            <img src={ele.thumbnail} alt="" width={50}/> 
                        </td>
                        <td className="px-6 py-4">
                            {ele.title}
                        </td>
                        <td className="px-6 py-4">
                            <button className='w-8 h-5 bg-gray-200'>-</button>
                            <span className='font-bold text-xl mx-2'>{ele.quantity}</span>
                            <button className='w-8 h-5 bg-gray-200' onClick={()=>{btnIncrement(ele,index)}}>+</button>
                        </td>
                        <td className="px-6 py-4">
                            $ {ele.price}
                        </td>
                        <td className="px-6 py-4">
                            <button className='px-5 py-1 rounded text-white bg-green-500' onClick={()=>{handleDelete(ele,index)}}>Delete</button>
                        </td>
                    </tr>
                        })
                    }
                    
                </tbody>
                <tfoot>
                    <tr className="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="px-6 py-3">$ {sum}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
