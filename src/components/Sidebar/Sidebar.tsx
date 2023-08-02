import { Link, useLocation } from "react-router-dom"

function Sidebar() {

    const location = useLocation()
    const linkCSS = "mb-1 hover:bg-slate-300 hover:cursor-pointer pl-2 block rounded-lg px-4 py-2 text-sm font-medium"
    const activeLink = function(path: String) {
        if (location.pathname === path) {
            return 'bg-gray-100'
        } else {
            return null
        }
    }
    return(
        <div className="pl-4 min-h-[100vh] bg-emerald-100">
            <div className="h-[60px] text-center p-auto">
                <span>Admin</span>
            </div>
            <div className="">
                <h3 className="text-sm text-gray-700 mb-2 uppercase">Danh sách</h3>
                <ul className="">
                    <li className={linkCSS}>Nhân viên</li>
                    <Link className={linkCSS +" "+ activeLink('/list-product')} to='/list-product'>Sản phẩm</Link>
                    <li className={linkCSS}>Điện thoại</li>
                    <li className={linkCSS}>Smart Watch</li>
                </ul>
            </div>
            <div>
                <h3 className="text-sm text-gray-700 mb-2 uppercase">Tạo mới</h3>
                <ul className="">
                    <Link to="/add-product" className={linkCSS +" "+ activeLink('/add-product')}>Product</Link>
                    <li className={linkCSS}>Tư vấn viên</li>
                </ul>
            </div>
            <div>
                <span>Logout</span>
            </div>
        </div>
    )
}
export default Sidebar