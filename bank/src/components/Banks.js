import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
  Label,
  FormGroup,
  AccordionItem,
  Alert,
} from "reactstrap";
import Modals from "./Modals";
import "../../src/App.css";
import Acordion from "./Acordion";

function Banks({
  modal,
  setModal,
  datas,
  setDatas,
  error,
  setError,
  bank,
  rows,
  setRows,
  token,
  setToken,
  interest,
  setİnterest,
}) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState();
  let [open, setOpen] = useState(1);
  console.log(datas);
  const deleterow = (id) => {
    setRows(rows.filter((row) => id != row.id));
  };
  const getBanks = () => {
    axios
      .get(" http://192.168.0.153/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setDatas(res.data.data);
        console.log("2");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    token = localStorage.getItem("token");
    console.log("1");
    setError("");
    getBanks();
  }, []);

  const Addbank = () => {
    setModal(true);
    setModalShow(true);
  };
  //
  return (
    <div>
      <div id="back">
        {modalShow && (
          <Modals
            modal={modal}
            setModal={setModal}
            datas={datas}
            setDatas={setDatas}
            error={error}
            setError={setError}
            rows={rows}
            setRows={setRows}
            token={token}
            setToken={setToken}
          />
        )}
        <Button id="addmodal" color="danger" onClick={() => Addbank()}>
          Add Bank
        </Button>
        <p className="error">{error}</p>
        {datas.map((item, ind) => (
          <Acordion
            datas={datas}
            item={item}
            token={token}
            setDatas={setDatas}
            setError={setError}
            ind={ind}
            rows={rows}
            setRows={setRows}
            interest={interest}
            setİnterest={setİnterest}
          />
        ))}
      </div>
    </div>
  );
}
export default Banks;
