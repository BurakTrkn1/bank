import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";
import "../../src/App.css";
import Bank from "./Bank";
function Modals({ datas, setDatas, modal, setModal, error, setError, token }) {
  const { handleSubmit, control } = useForm();
  const toggle = () => setModal(!modal);

  const getBanks = () => {
    axios
      .get(" http://localhost:81/api/banks", {
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

  const add = (data) => {
    console.log(token);
    // console.log(JSON.stringify(localStorage.getItem("token")));
    axios
      .post(
        "   http://localhost:81/api/banks",
        {
          bank_name: data.banks,
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

    console.log(token);
    setError("");
  };

  return (
    <div>
      <style></style>

      <Modal isOpen={modal} toggle={toggle}>
        <form onSubmit={handleSubmit((data) => add(data))}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Label id="modaltitle">Bank</Label>
            <Controller
              control={control}
              name="banks"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input onChange={onChange} onBlur={onBlur} selected={value} />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Add
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

export default Modals;
