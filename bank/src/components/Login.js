import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Label } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import "../../src/App.css";
import { useState } from "react";
import Bank from "./Bank";

function Login({ value, setToken }) {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [status, setStatus] = useState();
  const onSubmitt = (data) => {
    navigate("/Home");
    console.log(data);
    axios
      .post(
        " http://192.168.0.153/api/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setStatus(response.data.status);
        if (response.data.status !== "error") {
          localStorage.setItem("token", response.data.data);
          setToken(response.data.data);
          console.log(response.data.data);
        } else {
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div id="login">
        <div id="set">
          <form onSubmit={handleSubmit((data) => onSubmitt(data))}>
            <Label>Username</Label>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  defaultValue={"burak.turken"}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  required
                />
              )}
            />
            <Label>Password</Label>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  type=""
                  defaultValue={"as4gbFwsDS@"}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  required
                />
              )}
            />
            <Button id="lgn" type="submit" color="info">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
