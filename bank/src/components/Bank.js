import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import Modals from "./Modals";

function Bank({ datas, setDatas, setModal, modal }) {
  const navigate = useNavigate();
 
  const [modalShow, setModalShow] = useState(false);
 

  return (
    <div>
     
    </div>
  );
}

export default Bank;

{
  /* <strong>This is the first item&#39;s accordion body.</strong>
You can modify any of this with custom CSS or overriding our
default variables. It&#39;s also worth noting that just about
any HTML can go within the <code>.accordion-body</code>,
though the transition does limit overflow. */
}
