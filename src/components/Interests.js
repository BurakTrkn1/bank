import React, { useEffect } from "react";
import { useState } from "react";
import { Input, Button } from "reactstrap";
import axios from "axios";
import "../../src/App.css";
import Calculation from "./Calculation";
function İnterests({
  item,
  datas,
  getBanks,
  interest,
  token,
  setİnterest,
  setError,
  setFaiz,
  setDatas,
  faiz,
  faizVal,
  bankId,
}) {
  console.log(faizVal);
  const [calculation, setCalculation] = useState([]);
  const [text, setText] = useState({
    interes: faizVal.interest,
    vades: faizVal.time_option,
    credit_type: faizVal.credit_type,
  });
  console.log(token);

  console.log(item);
  console.log(item.interests);

  console.log(text.vades);
  useEffect(() => {}, [item.interests]);
  const save = () => {
    console.log({
      bank_id: faizVal.bank_id,
      interest: parseFloat(text.interes),
      credit_type: parseInt(text.credit_type),
      time_option: parseInt(text.vades),
    });

    const getInteres = () => {
      axios
        .get("   http://localhost:81/api/interests", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    axios
      .post(
        "   http://localhost:81/api/interests",
        {
          bank_id: faizVal.bank_id,
          interest: parseFloat(text.interes),
          credit_type: parseInt(text.credit_type),
          time_option: parseInt(text.vades),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getInteres();
        getBanks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(item.id);
  console.log(faizVal.id);
  const intdelete = () => {
    axios
      .delete(
        "   http://localhost:81/api/interests",
        {
          id: item.id,
          bank_id: faizVal.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getBanks();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //     getBanks()
  // }, [token]);

  const [vade, setVade] = useState(
    text.credit_type === 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : text.credit_type === 2
      ? [
          { val: "12Ay", key: "3" },
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ]
      : text.credit_type === 3
      ? [
          { val: "3Ay", key: "1" },
          { val: "6Ay", key: "2" },
          { val: "12Ay", key: "3" },
        ]
      : []
  );
  const changeselect = (event) => {
    setText((prev) => ({
      ...prev,
      credit_type:
        event.target.value === "Konut"
          ? 1
          : event.target.value === "Tüketici"
          ? 2
          : 3,
    }));
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
        : event.target.value === "Mevduat"
        ? [
            { val: "3Ay", key: "1" },
            { val: "6Ay", key: "2" },
            { val: "12Ay", key: "3" },
          ]
        : []
    );
  };
  return (
    <div>
      {" "}
      <div className="row">
        <tr>
          <td>
            <Input
              className="selec"
              type="select"
              name="select"
              id="exampleSelect"
              defaultValue={text.credit_type}
              onChange={(event) => changeselect(event)}
            >
              <option value="Tür seç">Tür seç</option>
              <option value="1">Konut</option>
              <option value="2">Tüketici</option>
              <option value="3">Mevduat</option>
            </Input>
          </td>
          <td>
            <Input
              defaultValue={text.vades}
              type="select"
              name="select"
              id="exampleSelect"
              className="selects"
              onChange={(e) =>
                setText((prev) => ({
                  ...prev,
                  vades: e.target.value,
                }))
              }
            >
              {vade.map((value, ind) => {
                return (
                  <option value={value.key} key={ind}>
                    {value.val}
                  </option>
                );
              })}
            </Input>
          </td>
          <td>
            <Input
              id="Faiz"
              type="number"
              defaultValue={text.interes}
              placeholder="Faiz Oranı Giriniz"
              onChange={(e) =>
                setText((prev) => ({
                  ...prev,
                  interes: e.target.value,
                }))
              }
            ></Input>
          </td>
          <td>
            <Button
              type="button"
              color="primary"
              className="save"
              onClick={() => save()}
            >
              Saveeee
            </Button>
            <Button
              type="button"
              color="warning"
              onClick={() => intdelete(faizVal.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      </div>
      {/* {calculation.map((val) => {
        console.log(val);
        <Calculation val={val} item={item} />;
      })} */}
    </div>
  );
}

export default İnterests;
// setFaiz((prew)=>[...prew,{
//   id:null,
//   bank_id: item.bank_id,
//   interest: "",
//   time_option: 0,
//   credit_type: 0,
