import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import Cart from "./pages/Cart";

function App() {
  const [cartArr, setCartArr] = useState([])

  function xyz(ans) {
    console.log(ans)
    let find = cartArr.find((ele) => ele.id === ans.id)
    
    if (find) {
      alert('Item already exists')
    }
    else {
      ans.quantity = 1
      let copyCarr = [...cartArr, ans]
      setCartArr(copyCarr)
      alert('Item add successfully')
    }
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar cartArr={cartArr.length} />
        <Routes>
          <Route path="/" element={<Home xyz={xyz} />}></Route>
          <Route path="/cart" element={<Cart item={cartArr} setCartArr={setCartArr} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
