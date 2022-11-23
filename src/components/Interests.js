import React, { useEffect } from "react";
import { useState } from "react";
import { Input, Button } from "reactstrap";
import axios from "axios";
import "../../src/App.css";

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
  console.log(token);
  const [selectcreditype, setSelectcredittype] = useState(1);
  const [text, setText] = useState({
    interes: "",
    vades: "",
  });
  console.log(token);
  
  console.log(item);
  console.log(item.interests);

  
  console.log(text.vades);
  useEffect(() => {
  }, [item.interests]);
  const save = () => {
 
 
    console.log({
 
      bank_id: faizVal.bank_id,
      interest: parseFloat(text.interes),
      credit_type: parseInt(selectcreditype),
      time_option: parseInt(text.vades),
    });
   
   
   
    const getInteres=()=>{
      axios
  .get(
    "   http://localhost:81/api/interests",
    {
      headers: {
        Authorization: token,
      },
    }
  )
  .then((res) => {
    console.log(res.data.data);
  })
  .catch((err) => {
    console.log(err);
  });

    }
  
    axios
      .post(
        "   http://localhost:81/api/interests",
        {
          bank_id: faizVal.bank_id,
          interest: parseFloat(text.interes),
          credit_type: parseInt(selectcreditype),
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
  



  console.log(item.id)
  console.log(faizVal.id)
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
      : selectcreditype.type === 3
      ? [
          { val: "3Ay", key: "1" },
          { val: "6Ay", key: "2" },
          { val: "12Ay", key: "3" },
        ]
      : []
  );
  const changeselect = (event) => {
    setSelectcredittype(
      event.target.value === "Konut"
        ? 1
        : event.target.value === "Tüketici"
        ? 2
        : 3
    );
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
              onChange={(event) => changeselect(event)}
            >
              <option value="Tür seç">Tür seç</option>
              <option id="1">Konut</option>
              <option id="2">Tüketici</option>
              <option id="3">Mevduat</option>
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
