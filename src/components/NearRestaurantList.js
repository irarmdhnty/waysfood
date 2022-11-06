import { useContext, useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext, UserContext } from "../contexts/LoginContext";
import { NearRestaurant } from "../data/NearRestaurant";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { useQuery } from "react-query";
import { API } from "../config/api";

export const NearRestaurantList = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { data: partner, refetch } = useQuery(
    "nearRestaurentCache",
    async () => {
      const response = await API.get("/users?role=partner");
      console.log(response.data.data);
      return response.data.data;
    }
  );

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      {partner?.map((item) => {
        return (
          <Card
            key={item.id}
            width="18 rem"
            className="shadow mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              !isLogin
                ? setShowLoginModal(true)
                : navigate(`/menu/list/${item.fullName}/${item.id}`);
            }}
          >
            <Card.Body className="align-items-center">
              <Image src={item?.image} width="100%" />
              <Card.Title className="mt-3">{item.fullName}</Card.Title>
              <Card.Text>0,6 km</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      <Login
        show={showLoginModal}
        setShow={setShowLoginModal}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setShowRegister={setShowRegisterModal}
      />
      <Register
        show={showRegisterModal}
        setShow={setShowRegisterModal}
        setShowLogin={setShowLoginModal}
      />
    </>
  );
};
