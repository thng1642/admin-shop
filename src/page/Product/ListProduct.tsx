import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from "axios";
import { Dispatch, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import { URL } from "../../app/constant";

type Props = {
    id: string,
    categories: any[],
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    products: any[],
    setProducts: Dispatch<SetStateAction<any[]>>
}
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function UpdateForm(props: Props) {

    const { id, categories ,open, setOpen, products, setProducts } = props
    const [ messValid, setMessValid ] = useState<String>('')
    const longRef = useRef<HTMLTextAreaElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const shortRef = useRef<HTMLTextAreaElement>(null)
    const [ data, setData ] = useState<any>(null)
    const [ success, setSuccess ] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }
    const handleUpdated = async () => {

        if (nameRef.current !== null && !Boolean(nameRef.current.value)) {
            setMessValid("Tên sản phẩm để trống!")
            nameRef.current.focus()
            return
        }
        if (categoryRef.current !== null && !Boolean(categoryRef.current.value)) {
            setMessValid("Danh mục sản phẩm để trống!")
            return
        }
        if (priceRef.current !== null && !Boolean(priceRef.current.value)) {
            setMessValid("Không để trống giá sản phẩm!")
            return
        }
        if (shortRef.current !== null && !Boolean(shortRef.current.value)) {
            setMessValid("Mô tả ngắn đang đang để trống!")
            shortRef.current.focus()
            return
        }
        if (longRef.current !== null && !Boolean(longRef.current.value)) {
            setMessValid("Mô tả dài đang đang để trống!")
            return
        }
        // Setup data to send request
        const request = {
            _id: id,
            name: nameRef.current?.value,
            category: categoryRef.current?.value,
            price: priceRef.current?.value,
            short_desc: shortRef.current?.value,
            long_desc: longRef.current?.value
        }
        try {
            const access_token = sessionStorage.getItem('access_token')
            const res = await axios.post(URL+"/admin/api/v1/product", request, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token,
                }
            })
            // console.log("Product updated: ", res.data)
            // const newProds = products.filter( item => item._id !== id )
            // newProds.push({
            //     _id: id,
            //     name: res.data.name,
            // })
            let updatedCategory = categories.filter( item => item._id === res.data.category)
            
            for (let i = 0; i < products.length; i++) {
                if (id === products[i]._id) {
                    products[i].name = res.data.name
                    products[i].category = updatedCategory[0].name
                    products[i].price = res.data.price
                    break
                }
            }
            setProducts(products)
            // setSuccess(true)
            setOpen(false)
        } catch (error:any) {
            setMessValid(error.response.data)
        }
    }

    const handleCloseForm = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessValid('')
        setSuccess(false)
    }
    useEffect(() => {
        
        if (id !== null) {
            ;( async () => {
                const access_token = sessionStorage.getItem("access_token")
                const res = await axios.get(URL+"/admin/api/v1/product?id=" + id, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token,
                    }
                })
                setData(res.data)
            })()
        }
        
    }, [])
    useEffect(() => {
        if (nameRef.current && longRef.current && shortRef.current && categoryRef.current && priceRef.current) {
            // console.log("Selected: ", data)
            nameRef.current.value = data?.name
            priceRef.current.value = data?.price
            shortRef.current.value = data?.short_desc
            longRef.current.value = data?.long_desc
            categoryRef.current.value = data?.category
        }
    })
    return (
        <>
        <Snackbar open={Boolean(messValid)} autoHideDuration={4000} onClose={handleCloseForm}>
            <Alert onClose={handleCloseForm} severity="error" sx={{ width: '100%' }}>
                { messValid }
            </Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseForm}>
            <Alert onClose={handleCloseForm} severity="success" sx={{ width: '100%' }}>
                Cập nhật thành công sản phẩm
            </Alert>
        </Snackbar>
        {/* Dialog form for update products */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // fullScreen={fullScreen}
            // sx={{ mt: 2, minWidth: '40vw' }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Cập nhật thông tin sản phẩm"}
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
                            // name="name"
                            // value={selected?.name}
                            className="w-full rounded-lg border-2 border-gray-200 p-2 pe-4 text-sm shadow-sm"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>
                    {/* Choose category and inputs quantity */}
                    <div className="mb-4 flex flex-row items-center gap-4">
                        {/* Category */}
                        <div>
                            <select name="category" defaultValue={data?.category} className="border-2 text-sm p-1 border-gray-200" ref={categoryRef}>
                                <option value={''}>
                                    <>Selected Category</>
                                </option>
                                {
                                categories.map((value:any, index:number) => (
                                    <option key={index} value={value._id}>{value.name}</option>
                                ))
                                }
                            </select>
                        </div>
                        {/* Price */}
                        <div>
                            <label htmlFor="">
                                Price
                                <input type="number" id="product-price" 
                                className="border-2 text-sm ml-2 p-1 border-gray-200 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" ref={priceRef}/>
                            </label>
                        </div>
                    </div>
                    {/* Short description for product */}
                    <div>
                        <label htmlFor="short-desc">Short description</label><br/>
                        <textarea ref={shortRef}  id="short-desc" className="w-full rounded-lg border-2 border-gray-200 p-2 pe-4 text-sm shadow-sm" rows={5}></textarea>
                    </div>
                    {/* Long description for product */}
                    <div>
                        <label htmlFor="long-desc">Long description</label><br/>
                        <textarea id="long-desc" className="w-full rounded-lg border-2 border-gray-200 p-2 pe-4 text-sm shadow-sm" 
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
            <Button onClick={handleClose}>Hủy</Button>
            <Button variant="contained" color="primary" onClick={handleUpdated} autoFocus>
                Cập nhật
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

function ListProduct() {
    // const theme = useTheme()
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const [ selected, setSelected] = useState<any>(null)
    // const [ prodServer, setProdServer ] = useState<any>(null)
    const [ products, setProducts ] = useState<any[]>([])
    const [ categories, setCategories ] = useState<any>([])
    // open/close dialog updated product
    const [ open, setOpen ] = useState(false)
    // open/close dialog confirm delete product
    const [ openConfirm, setOpenConfirm ] = useState(false)
    const [ idSelected, setIdSelected ] = useState('')

    const handleCloseConfirm = () => {
        setOpenConfirm(false)
    }

    // useEffect(() => {

    // }, )
    useEffect(() => {
        // Get Access token from session
        const access_token = Boolean(sessionStorage.getItem('access_token')) ?
            sessionStorage.getItem('access_token') : null
        // Fetching list products
        if (access_token) {
            ;(async () => {
                try {
                    const res = await axios.get(URL+"/admin/api/v1/list-product", 
                    {
                        headers: { 
                            'Authorization': 'Bearer ' + access_token, 
                            "Content-Type" : "application/json"
                        },
                        withCredentials: true
                    })
                    
                    // console.log(res.data)
                    setProducts(res.data)
                    const result = await axios.get(URL+"/admin/api/v1/list-category")
                    setCategories(result.data)
                } catch (error) {
                    console.log(error)
                    
                }
            })()
        }
    }, [])
    return(
        <>
        {
            (open && idSelected) ? <UpdateForm products={products} setProducts={setProducts} 
                    id={idSelected} open={open} setOpen={setOpen} categories={categories}/> : null
        }
        {/* Dialog confirm remove product (ngừng kinh doanh) */}
        <Dialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">
            {"Xác nhận ngừng kinh doanh sản phẩm!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="confirm-dialog-description">
                Bạn có đồng ý ngừng kinh doanh {(selected) ? selected.name : null} này ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseConfirm} color="error">Cancel</Button>
            <Button onClick={handleCloseConfirm} color="primary" variant="contained" autoFocus>
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
                        products.map((item, key) => {
                            const data = Object.values(item)
                            return(
                                <tr className="even:bg-gray-200" key={key}>
                                    {
                                        data?.map((value:any, index) => (
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
                                                setOpen(true)
                                                setIdSelected(item._id)
                                            }}
                                        >Update</button>
                                        <button className="bg-red-400 p-1 text-white"
                                            onClick={() => {
                                                // console.log("Update id: ", item._id)
                                                // setOpen(true)
                                                setSelected(item)
                                                setOpenConfirm(true)
                                            }}
                                        >Remove</button>
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