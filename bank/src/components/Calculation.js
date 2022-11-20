import "../../src/App.css";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  Button,
  ModalFooter,
  Label,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import React, { useState,useEffect } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
function Calculation({setError,token,setDatas}) {

  const getBanks = () => {
    axios
      .get("http://localhost:81/api/banks/id", {
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
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  return (
    <div id="Depo">
      <div id="Creditinterest">
        <div>
          
        </div>
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
              // onChange={(event) => changeselect(event)}
            >
              <option value="Tür seç">vade seç</option>
              <option id="1">3</option>
              <option id="2">6</option>
              <option id="3">12</option>

            </Input>
              </div>
              <div className="va">
        
               <Input
              className="selec"
              type="select"
              name="select"
              id="exampleSelect"
              // onChange={(event) => changeselect(event)}
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
      </div>
    </div>
  );
}
export default Calculation;
