import "../../src/App.css";
import { useNavigate } from "react-router-dom";
import {
  AccordionHeader,
  AccordionBody,
  AccordionItem,
  Accordion,
  Button,
  Label,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Input,
} from "reactstrap";
import React, { useState, useEffect } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
function Calculation({ setError, token, setDatas }) {
  const [selectcreditype, setSelectcredittype] = useState(1);
  let [open, setOpen] = useState(1);
  const [find, setFind] = useState([]);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
    console.log(id);
  };
  const getBanks = () => {
    axios
      .get("http://192.168.0.153/api/banks/id", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setFind(res.data.data);
        console.log("2");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    token = localStorage.getItem("token");
    setError("");
    getBanks();
  }, []);
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [vade, setVade] = useState(
    selectcreditype.type === 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : selectcreditype.type === 2
      ? [
          { val: "12Ay", key: "3" },
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ]
      : []
  );

  const changeselect = (event) => {
    setSelectcredittype(event.target.value);
    console.log(event.target.value);
    setVade(
      event.target.value === "Konut"
        ? [
            { val: "5Yıl", key: "6" },
            { val: "10Yıl", key: "7" },
          ]
        : event.target.value === "Tüketici"
        ? [
            { val: "12Ay", key: "3" },
            { val: "24Ay", key: "4" },
            { val: "36Ay", key: "5" },
          ]
        : []
    );
  };

  return (
    <div id="Depo">
      <div id="Creditinterest">
        <div></div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Credit interest">
            <Row>
              <Col>
                <div className="credit">
                  <div id="fin">
                    <Button type="button">Find</Button>
                  </div>
                  <div className="yt">
                    <Input type="number"></Input>
                  </div>
                  <div className="selec">
                    <Input
                      className="selec"
                      type="select"
                      name="select"
                      id="exampleSelect"
                    ></Input>
                  </div>

                  <div className="va">
                    <Input
                      className="selec"
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(event) => changeselect(event)}
                    >
                      <option value="Tür seç">Kredi Seç</option>
                      <option id="1">Konut</option>
                      <option id="2">Tüketici</option>
                    </Input>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="profile" title="Deposit interest">
            <div className="deposit">
              <Row>
                <Col>
                  <div id="find">
                    <Button type="button">Find</Button>
                  </div>
                  <div id="Yat">
                    <Input type="number" placeholder="Yatırılacak para" />
                  </div>
                  <div className="vad">
                    <Input
                      className="selec"
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      {" "}
                      <option value="vade seç">Vade</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="9">12</option>{" "}
                    </Input>
                  </div>
                </Col>
              </Row>
            </div>
          </Tab>
        </Tabs>
        <div id="credacor">
          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="1"></AccordionHeader>
              <AccordionBody accordionId="1"></AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default Calculation;
