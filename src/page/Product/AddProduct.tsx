import { forwardRef, useRef, useState } from "react"
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from "@mui/material";
import axios from "axios";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddProduct() {

    const imgsRef = useRef<HTMLInputElement>(null)
    const longRef = useRef<HTMLTextAreaElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const shortRef = useRef<HTMLTextAreaElement>(null)
    // open/close alter error file input
    const [ validFiles, setValidFiles ] = useState(false)
    // open/close valid form
    const [ validForm, setValidForm ] = useState<Boolean | null>(null)
    // Message valid form
    const [ messValid, setMessValid ] = useState<String>('')
    const [ quantity, setQuantity ] = useState<number>(0)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setValidFiles(false)
    }
    const handleCloseForm = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessValid('')
        setValidForm(false)
    }
    const checkValidForForm = function( ) {
        if (nameRef.current !== null && !Boolean(nameRef.current.value)) {
            setMessValid("Tên sản phẩm để trống!")
            nameRef.current.focus()
            return false
        }
        if (categoryRef.current !== null && !Boolean(categoryRef.current.value)) {
            setMessValid("Danh mục sản phẩm để trống!")
            return false
        }
        if (shortRef.current !== null && !Boolean(shortRef.current.value)) {
            setMessValid("Mô tả ngắn đang đang để trống!")
            shortRef.current.focus()
            return false
        }
        if (longRef.current !== null && !Boolean(longRef.current.value)) {
            setMessValid("Mô tả dài đang đang để trống!")
            return false
        }
        if (imgsRef.current !== null && imgsRef.current.files?.length !== 4) {
            setValidFiles(true)
            return false
        }
        return true
    }

    const handleSubmitForm = async () => {
        const isValid = checkValidForForm()
        if (!isValid) return
        // Set up data to send to server
        const data = new FormData()
        if (imgsRef.current !== null && imgsRef.current.files !== null) {
            data.append("img", imgsRef.current.files[0])
            data.append("img", imgsRef.current.files[1])
            data.append("img", imgsRef.current.files[2])
            data.append("img", imgsRef.current.files[3])
        }
        if (nameRef.current !== null && nameRef.current.value !== null) {
            data.append("name", nameRef.current.value)
        }
        data.append("quantity", JSON.stringify(quantity))
        if (categoryRef.current !== null && categoryRef.current.value !== null) {
            data.append("category", categoryRef.current.value)
        }
        if (shortRef.current !== null && shortRef.current.value !== null) {
            data.append("short_desc", shortRef.current.value)
        }
        if (longRef.current !== null && longRef.current.value !== null) {
            data.append("long_desc", longRef.current.value)
        }
        console.log("Data request: ", data)
        try {
            const res = await axios.post("http://localhost:5000/admin/api/v1/add-product",
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            console.log("Response: ", res.data)
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <section>
            <Snackbar open={validFiles} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Tải file không hợp lệ!
                </Alert>
            </Snackbar>
            {/* Valid form, exception File */}
            <Snackbar open={Boolean(messValid)} autoHideDuration={4000} onClose={handleCloseForm}>
                <Alert onClose={handleCloseForm} severity="error" sx={{ width: '100%' }}>
                    { messValid }
                </Alert>
            </Snackbar>

            <h2 className="uppercase text-center relative w-full mb-4 py-4 text-slate-700 font-semibold">Thêm sản phẩm mới</h2>
            <div className="relative w-[40vw] shadow-form p-4 m-auto">
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
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded">
                        <label htmlFor="" >Quantity</label>
                        <button
                            type="button"
                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                            onClick={() => {
                                if (quantity >= 1) {
                                    setQuantity(quantity - 1)
                                }
                            }}
                        >
                            &minus;
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            name="quantity"
                            onChange={(e) => {
                                const tmp = Number(e.target.value)
                                setQuantity(tmp)
                            }}
                            className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                            type="button"
                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                            onClick={() => {
                                setQuantity(quantity + 1)
                            }}
                        >
                            +
                        </button>
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
                {/* List images */}
                <div className="mb-4">
                    <label htmlFor="img-product">Tải lên 4 file hình ảnh</label><br/>
                    <input type="file" name="img" id="img-product" accept="image/*" multiple ref={imgsRef}
                        className="mb-2"
                        onChange={(e) => {
                            const curFiles = e.target.files
                            const n = curFiles?.length

                            if (n === 4 && curFiles !== null) {
                                const thumbnail = document.getElementById('thumbnail-img')
                                // setValidFiles(true)
                                for (let i = 0; i < n; i++) {
                                    console.log("File name: ", curFiles[i].name)
                                    const thumbImg = document.createElement('img')
                                    thumbImg.src = URL.createObjectURL(curFiles[i])
                                    thumbImg.style.objectFit = "contain"
                                    thumbnail?.appendChild(thumbImg)
                                }
                            } else if (n !== 4 || curFiles === null) {
                                console.log("So luong file khong hop le")
                                setValidFiles(true)
                            }
                        }}
                    />
                    <div id="thumbnail-img" className="grid grid-cols-4 w-full border border-gray-500">
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={handleSubmitForm}>Tạo mới</button>
                </div>
            </div>
        </section>
    )
}
export default AddProduct