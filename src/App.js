import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Bank from "./components/Bank";
import Modals from "./components/Modals";
import { useState } from "react";
import Banks from "./components/Banks";
import Header from "./components/Header";
import Calculation from "./components/Calculation";
import Home from "./components/Home";
import Temp from "./components/Temp";
function App() {
  const { bank } = Temp;
  const [datas, setDatas] = useState([]);
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState("Hiç banka bulunmamaktadır");
  const [token, setToken] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            exact
            index
            path="/"
            element={<Login setToken={setToken} token={token} />}
          />
          <Route
            path="/Bank"
            element={
              <Bank
                datas={datas}
                setDatas={setDatas}
                modal={modal}
                setModal={setModal}
                modalShow={modalShow}
                setModalShow={setModalShow}
              />
            }
          />
          <Route
            path="/Home"
            element={
              <Home
                modal={modal}
                setModal={setModal}
                datas={datas}
                setDatas={setDatas}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/Bank"
            element={
              <Modals
                modal={modal}
                setModal={setModal}
                datas={datas}
                setDatas={setDatas}
                error={error}
                setError={setError}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/Banks"
            element={
              <Banks
                bank={bank}
                datas={datas}
                setDatas={setDatas}
                modal={modal}
                setModal={setModal}
                modalShow={modalShow}
                setModalShow={setModalShow}
                error={error}
                setError={setError}
                rows={rows}
                setRows={setRows}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/Calculation"
            element={
              <Calculation
                modal={modal}
                setModal={setModal}
                datas={datas}
                setDatas={setDatas}
                error={error}
                setError={setError}
                token={token}
                setToken={setToken}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
