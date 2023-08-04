import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Show main contain for admin
 */
function Dashboard() {
    const nav = useNavigate()
    const [ countClient, setCountClient ] = useState(0)
    const [ money, setMoney ] = useState('')
    const [ newOrder, setNewOrder ] = useState('')
    const [ orders, setOrders ] = useState<any[]>([])
    // const dataDummy = Object.values(dummy).shift()
    useEffect(() => {
        const access_token = sessionStorage.getItem('access_token')
        if ( !access_token ) {
            nav('/login')
            return
        }
        ;(async () => {
            try {
                const overview = await axios.get("http://localhost:5000/admin/api/v1/overview", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token,
                    }
                })
                // console.log(overview.data)
                setCountClient(overview.data.client)
                setMoney(overview.data.total)
                setNewOrder(overview.data.newOrder)
                const res = await axios.get("http://localhost:5000/admin/api/v1/list-order/", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token,
                    }
                })
                // console.log(res.data)
                setOrders(res.data)
            } catch (error) {
                console.log(error);
                
            }
        })()
    }, [])
    return (
        <section className="p-4 shadow-title">
            <h2 className="text-slate-400 mb-4">Dashboard</h2>
            {/* Overview business */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="shadow-title flex flex-row items-center p-4 justify-between">
                    <div>
                        <p className="font-medium text-xl">{countClient}</p>
                        <p className="text-slate-400">Clients</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                </div>
                <div className="shadow-title flex flex-row items-center p-4 justify-between">
                    <div>
                        <p className="font-medium text-xl">{money} VND</p>
                        <p className="text-slate-400">Earnings of month</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="shadow-title flex flex-row items-center p-4 justify-between">
                    <div>
                        <p className="font-medium text-xl">{newOrder}</p>
                        <p className="text-slate-400">New orders</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                </div>
            </div>
            <div className="">
                <h2 className="text-slate-400 mb-4">History</h2>
                {/* Table history */}
                <div className="shadow-title">
                    <table className="w-full border-collapse border-2 border-gray-700">
                        <tr>
                            <th className="border-2 border-gray-700">ID User</th>
                            <th className="border-2 border-gray-700">Name</th>
                            <th className="border-2 border-gray-700">Phone</th>
                            <th className="border-2 border-gray-700">Address</th>
                            <th className="border-2 border-gray-700">Total</th>
                            <th className="border-2 border-gray-700">Status</th>
                            <th className="border-2 border-gray-700">Detail</th>
                        </tr>
                        {
                        orders.map((item:any, key) => {
                            const data = Object.values(item)
                            return(
                                <tr className="even:bg-gray-200" key={key}>
                                    {
                                        data?.map((value:any, index) => {
                                            if(index === 0) return null
                                            else {
                                                return (
                                                    <td key={index} className="text-center border-collapse border-2 border-gray-700 p-2">{value}</td>
                                                )
                                            }
                                        })
                                    }
                                    <td className="text-center border-collapse border-2 border-gray-700 p-2">
                                        <button className="bg-green-400 p-2 text-white"
                                            onClick={() => {
                                                console.log("Order id: ", item._id)
                                            }}
                                        >View</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Dashboard