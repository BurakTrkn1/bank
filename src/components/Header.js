import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";

function Header({}) {
  const navigate = useNavigate();
  const [logout, setLogout] = useState("logout");
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && (
        <header>
          <Button
            id="Hom"
            color="outline-dark"
            onClick={() => navigate("/Home")}
          >
            Home
          </Button>
          <Button
            color="outline-warning"
            id="Hes"
            onClick={() => navigate("/Calculation")}
          >
            Calculation
          </Button>
          <Button className="Log" type="button" onClick={() => navigate("/")}>
            Log out
          </Button>

          <Button id="add" color="info" onClick={() => navigate("/Banks")}>
            Add Bank
          </Button>
        </header>
      )}

      {/* {user &&
        ((
          <Button color="warning" id="Hes">
            Hesaplama
          </Button>
        ),
        (
          <Button className="Log" type="button" onClick={() => navigate("/")}>
            Log out
          </Button>
        ),
        (
          <Button id="add" onClick={() => navigate("/Banks")}>
            Add Bank
          </Button>
        ))} */}
    </div>
  );
}
export default Header;
