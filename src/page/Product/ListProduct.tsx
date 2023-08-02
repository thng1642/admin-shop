import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function ListProduct() {
    const dummy = [
        {
            "_id": "62ccd4665eefc71539bb6b4c",
            "name": "Apple iPhone 13 Pro Max - Alpine Green",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fiphone_13_4.jpeg?alt=media&token=dc72dde3-cfa4-4710-9493-ac2aa0ecf249",
            "price": "29390000",
            "category": "Iphone"
        },
        {
            "_id": "62ccd5755eefc71539bb6b4e",
            "name": "Apple iPhone 11 64GB",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fiphone_11_2.jpeg?alt=media&token=2e8b6c8e-56fa-4cfd-86c4-9be2ee6205e0",
            "price": "10999000",
            "category": "Iphone"
        },
        {
            "_id": "62ccd6d75eefc71539bb6b50",
            "name": "Apple iPhone 12 64GB",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fiphone_12_3.jpeg?alt=media&token=56832bd5-c510-4760-923c-fae236c6712c",
            "price": "15790000",
            "category": "Iphone"
        },
        {
            "_id": "62ccd8b55eefc71539bb6b52",
            "name": "Apple iPad Gen 9th Wi-Fi 64GB",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fipad_gen9_1.jpeg?alt=media&token=507fbf42-b8db-4007-b294-397b95cce7ba",
            "price": "8990000",
            "category": "Ipad"
        },
        {
            "_id": "62ccd9eb5eefc71539bb6b54",
            "name": "Apple iPad Air 4 10.9 inch Wi-Fi + Cellular 64GB",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fipad_air_1.jpeg?alt=media&token=79be0859-23b8-4915-8f92-4bf087ab3186",
            "price": "15990000",
            "category": "Ipad"
        },
        {
            "_id": "62ccdb045eefc71539bb6b56",
            "name": "Apple Watch Series 6 40mm GPS Sport Band",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fwatch_1_4.jpeg?alt=media&token=c5642ff3-ec27-4af1-bca2-87a5606f9fee",
            "price": "9090000",
            "category": "Watch"
        },
        {
            "_id": "62ccdbb05eefc71539bb6b58",
            "name": "Apple Watch Series 7 41mm GPS Sport Band",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fwatch_2_1.jpeg?alt=media&token=6585e4e6-801a-4b15-9dee-692523cc25f0",
            "price": "10590000",
            "category": "Watch"
        },
        {
            "_id": "62ccdcc95eefc71539bb6b59",
            "name": "Apple AirPods 3rd gen",
            "img": "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fairpod_1_1.jpeg?alt=media&token=33b2ebdd-086c-4b8e-9241-0b566ca66754",
            "price": "4390000",
            "category": "AirPod"
        }
    ]
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const longRef = useRef<HTMLTextAreaElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const shortRef = useRef<HTMLTextAreaElement>(null)
    const [ selected, setSelected] = useState<any>(null)
    // open/close dialog confirm delete product
    const [ open, setOpen ] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }
    useEffect(() => {
        if (selected !== null) {
            // Call api get detail product
            if (nameRef.current && longRef.current && shortRef.current && categoryRef.current) {
                
            }
        }
    }, [selected])
    return(
        <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={fullScreen}
            // sx={{ mt: 2, minWidth: '40vw' }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <div>
                    <div className="mb-4">
                        <label htmlFor="product-name">Tên sản phẩm</label><br/>
                        <input
                            type="text"
                            id="product-name"
                            ref={nameRef}
                            className="w-full rounded-lg border-2 border-gray-200 p-2 pe-4 text-sm shadow-sm"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>
                    {/* Choose category and inputs quantity */}
                    <div className="mb-4 flex flex-row items-center gap-4">
                        {/* Category */}
                        <div>
                            <select name="category" className="border-2 text-sm p-1 border-gray-200" ref={categoryRef}>
                                <option value={''}>
                                    <>Selected Category</>
                                </option>
                                <option value='12939120'>Iphone</option>
                                <option value='999923'>Ipad</option>
                            </select>
                        </div>
                    </div>
                    {/* Short description for product */}
                    <div>
                        <label htmlFor="short-desc">Short description</label><br/>
                        <textarea ref={shortRef} id="short-desc" className="w-full rounded-lg border-2 border-gray-200 p-2 pe-4 text-sm shadow-sm" rows={5}></textarea>
                    </div>
                    {/* Long description for product */}
                    <div>
                        <label htmlFor="long-desc">Long description</label><br/>
                        <textarea name="" id="long-desc" className="w-full rounded-lg border-2 border-gray-200 p-2 pe-4 text-sm shadow-sm" 
                            ref={longRef}
                            onChange={(e) => {

                            }}
                            onKeyDown={(e) => {
                                
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    if (longRef.current !== null) {
                                        longRef.current.value += '\n- '
                                    }
                                }
                            }}
                        rows={10}></textarea>
                    </div>
                </div>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
        <section className="ml-6 pt-6">
            <h2>Danh sách sản phẩm</h2>
            {/* Search box */}
            <div className="relative w-[200px] mb-4">
                <input
                    type="text"
                    id="Search"
                    placeholder="Search for..."
                    className="w-full rounded-md border-gray-200 border-2 py-2.5 pe-10 shadow-sm sm:text-sm"
                />
                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    </button>
                </span>
            </div>
            {/* Table list products */}
            <div className="shadow-title">
                <table className="w-full border-collapse border-2 border-gray-700">
                    <tr>
                        <th className="border-2 border-gray-700">ID</th>
                        <th className="border-2 border-gray-700">Name</th>
                        <th className="border-2 border-gray-700">Image</th>
                        <th className="border-2 border-gray-700">Price</th>
                        <th className="border-2 border-gray-700">Category</th>
                        <th className="border-2 border-gray-700">Actions</th>
                    </tr>
                    {
                        dummy.map((item, key) => {
                            const data = Object.values(item)
                            return(
                                <tr className="even:bg-gray-200" key={key}>
                                    {
                                        data?.map((value, index) => (
                                            <td key={index} className="text-center  border-collapse border-2 border-gray-700 p-2">
                                                {(index === 2) ? 
                                                    <img className="w-10 object-contain m-auto" src={value} alt="anh" /> : value
                                                }
                                            </td>
                                        ))
                                    }
                                    <td className="text-center border-collapse border-2 border-gray-700 p-2">
                                        <button className="bg-green-400 p-1 text-white mr-2"
                                            onClick={() => {
                                                console.log("Update id: ", item._id)
                                                setOpen(true)
                                            }}
                                        >Update</button>
                                        <button className="bg-red-400 p-1 text-white"
                                            onClick={() => {
                                                console.log("Update id: ", item._id)
                                                // setOpen(true)
                                            }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </section>
        </>
    )
}
export default ListProduct