import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import Interests from "./Interests";
function Acordion({
  datas,
  item,
  setDatas,
  token,
  setError,
  ind,
  rows,
  setRows,
}) {
  let [open, setOpen] = useState(1);
  const [bank, setBank] = useState([]);
  const [faiz, setFaiz] = useState(item.interests);
  // const [select]
  console.log(faiz);
  const getBanks = () => {
    axios
      .get("  http://localhost:81/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setDatas(res.data.data);
        console.log(res.data.interests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const banksdelete = (id) => {
    axios
      .delete("  http://localhost:81/api/banks", {
        headers: {
          Authorization: token,
        },

        data: { id: id },
      })
      .then((res) => {
        console.log(res);
        const bankk = bank.filter((item) => item.id !== id);
        getBanks();
        setBank(bankk);
        console.log(bankk);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(token);
    setError("");
  };

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
    console.log(id);
  };

  const addInerests = () => {
    setFaiz((prew) => [
      ...prew,
      {
        id: null,
        bank_id: item.id,
        interest: "",
        time_option: "",
        credit_type: "",
      },
    ]);
  };
  // const addRow = (data) => {
  //     rows = [
  //         ...rows,
  //         {
  //             bank_id: data.length + 1,
  //             bank_name: data.bank,
  //           },
  //         ];
  //         setRows(rows);
  //         setError("");
  //       };

  return (
    <div>
      <Accordion id="acordion" open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader key={ind} targetId="1">
            {item.bank_name}
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <Button id="delete" onClick={() => banksdelete(item.id, item)}>
              -
            </Button>
            <table className="table">
              <thead>
                <tr key={ind}>
                  <th scope="col">Tür</th>
                  <th scope="col">Vade</th>
                  <th scope="col">Aylık faiz oranı</th>
                  <th>
                    <Button type="button" onClick={() => addInerests(item)}>
                      +
                    </Button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {faiz.map((val, ind) => {
                  console.log(val);
                  console.log(bank);
                  return (
                    <Interests
                      setDatas={setDatas}
                      item={item}
                      faizVal={val}
                      setFaiz={setFaiz}
                      faiz={faiz}
                      datas={datas}
                      token={token}
                      bankId={bank.id}
                      getBanks={getBanks}
                    />
                  );
                })}
              </tbody>
            </table>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
export default Acordion;
// className="select"
// type="select"
// name="select"
// id="exampleSelect"
