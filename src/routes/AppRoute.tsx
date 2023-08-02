import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../page/Dashboard/Dashboard";
import App from "../App";
import ListProduct from "../page/Product/ListProduct";
import AddProduct from "../page/Product/AddProduct";

function AppRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/list-product" element={<ListProduct />} />
                    <Route path="/add-product" element={<AddProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter