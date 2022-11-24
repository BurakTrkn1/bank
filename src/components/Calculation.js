import "../../src/App.css";
import { useNavigate } from "react-router-dom";
import {
  AccordionHeader,
  AccordionBody,
  AccordionItem,
  Accordion,
  Button,
  Label,
  TabContent,
  TabPane,
  Row,
  Col,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Table,
} from "reactstrap";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import classnames from "classnames";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap";

import axios from "axios";
function Calculation({ setError, token, setDatas, datas, item }) {
  const [selectcreditype, setSelectcredittype] = useState(1);
  let [open, setOpen] = useState(1);
  const [find, setFind] = useState([]);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [CreditAmount, setCreditAmount] = useState("");
  const [CreditAmounts, setCreditAmounts] = useState("");

  const [getVades, setGetVades] = useState([]);

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const openhandler = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
    console.log(id);
  };

  const Findbank = () => {
    axios
      .get("http://localhost:81/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        let a = res.data.data.filter((bank) => {
          let getInt = bank.interests.filter((b) => {
            console.log(selectVadeType, vade);
            if (b.credit_type === selectVadeTypeID) {
              return b;
            }
          });

          if (getInt.length !== 0) {
            bank.interests = getInt;
            return bank;
          }
        });
        console.log(a);
        setDatas(a);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // VADE
  const getVade = () => {
    axios
      .get("http://localhost:81/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        const arr = [];
        res.data.data.forEach((bank) => {
          if (bank.interests.length > 0) {
            const VadeType = bank.interests.some(
              (interest) => interest.credit_type === 3
            );

            if (VadeType) {
              arr.push(bank);
            }
          }
        });

        setFind(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectVadeType, setselectVadeType] = useState([]);
  const [selectVadeTypeID, setSelectVadeTypeID] = useState();
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
  const change_tür_Type = (event) => {
    setselectVadeType(event.target.value);
    setSelectVadeTypeID(
      event.target.value === "Tüketici"
        ? 2
        : event.target.value === "Mevduat"
        ? 3
        : event.target.value === "Konut"
        ? 1
        : 0
    );
  };
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
        <div>
          <div>
            <div
              style={{
                display: "block",
                width: 700,
                padding: 30,
              }}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Kredi Faizi
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Mevduat Faizi
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Table>
                        <thead>
                          <tr>
                            <th>
                              <Label for="exampleSelect">Tür</Label>
                              <Input
                                type="select"
                                name="select"
                                id="credit_type"
                                onChange={(event) => changeselect(event)}
                              >
                                <option value="0">Tür Seçin</option>
                                <option id="1">Konut</option>
                                <option id="2">Tüketici</option>
                              </Input>
                            </th>
                            <th>
                              <Label for="exampleSelect">Vade</Label>
                              <Input
                                type="select"
                                name="select"
                                onChange={(e) => setGetVades(e.target.value)}
                                value={getVade}
                              >
                                {vade.map((value, ind) => {
                                  return (
                                    <option value={value.key} key={ind}>
                                      {value.val}
                                    </option>
                                  );
                                })}
                              </Input>
                            </th>
                            <th>
                              <Input
                                placeholder="Ne kadar yatıracaksınız?"
                                type="number"
                                onChange={(event) =>
                                  setCreditAmount(event.target.value)
                                }
                                value={CreditAmount}
                              ></Input>
                            </th>

                            <th>
                              <Button onClick={Findbank}>Bul</Button>
                            </th>
                          </tr>
                        </thead>
                      </Table>
                    </Col>
                  </Row>
                  {datas.map((bank) => {
                    return bank.interests.map((c) => {
                      console.log(c);
                      console.log(c.time_option);
                      console.log(CreditAmount);
                      return (
                        <Accordion flush open={open} toggle={openhandler}>
                          <AccordionItem>
                            <AccordionHeader targetId={bank.id}>
                              {bank.bank_name}
                            </AccordionHeader>
                            <AccordionBody accordionId={bank.id}>
                              {bank.bank_name}
                              <br />
                              Yatıralacak Tutar= <label>{CreditAmount}</label>TL
                              <br />
                              Toplam Geri Ödeme=
                              <label>{CreditAmount * c.interest}</label>
                              TL
                              <br />
                              Aylık Faiz= %<label>{c.interest}</label>
                              <br />
                              Aylık Ödeme=
                              <label>{CreditAmount * c.interest}</label>
                              <br />
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      );
                    });
                  })}
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Table>
                        <thead>
                          <tr>
                            <th>
                              <Label for="exampleSelect">Vade</Label>
                              <Input type="select" name="select">
                                value={selectcreditype}
                                <option value={3}>3Ay</option>
                                <option value={6}>6Ay</option>
                                <option value={12}>12Ay</option>
                              </Input>
                            </th>
                            <th>
                              <Input
                                placeholder="Ne kadar yatıracaksınız?"
                                type="number"
                                onChange={(event) =>
                                  setCreditAmounts(event.target.value)
                                }
                                value={CreditAmounts}
                              ></Input>
                            </th>
                            <th>
                              <Button>Bul</Button>
                            </th>
                          </tr>
                        </thead>
                      </Table>
                    </Col>
                  </Row>
                  <Accordion flush open={open} toggle={openhandler}>
                    {datas.map((data) => {
                      return (
                        <AccordionItem>
                          <AccordionHeader targetId={data.id}>
                            {data.bank_name}
                          </AccordionHeader>
                          <AccordionBody accordionId={data.id}>
                            {data.bank_name}
                            <br />
                            Hesaba Yatırılacak Tutar=
                            <label>{CreditAmount}</label>
                            TL
                            <br />
                            Toplam Geri Ödeme=
                            <br />
                            Aylık Faiz=%
                            <br />
                            Aylık Ödeme=
                            <br />
                          </AccordionBody>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
        {/* <div></div>
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
                    <Button type="button" onClick={Findbank}>
                      Find
                    </Button>
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
                    >
                 
                    </Input>
                  </div>
                

                  <div className="va">
                    <Input
                      className="selec"
                      type="select"
                      name="select"
                      id="exampleSelect"
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
          {/* deposit */}
        {/* {}
          <Tab eventKey="profile" title="Deposit interest">
            <div className="deposit">
              <Row>
                <Col>
                  <div id="find">
                    <Button type="button" onClick={getVade}>
                      Find
                    </Button>
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
        </Tabs> */}
      </div>
    </div>
  );
}
export default Calculation;
// {datas.map((bank) => {
//   return (
//     <div id="credacor">
//       <Accordion key={bank.id} open={open} toggle={toggle}>
//         <AccordionItem>
//           <AccordionHeader targetId="1">
//             {bank.bank_name}
//           </AccordionHeader>
//           <AccordionBody accordionId="1"></AccordionBody>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// })}

{
  /* {vade.map((value, ind) => {
                        return (
                          <option value={value.key} key={ind}>
                            {value.val}
                          </option>
                        );
                      })} */
}
