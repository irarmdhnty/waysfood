import { Card, Container, Image, Row, Col } from "react-bootstrap";
import { Populars } from "../data/Popular";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

export const PopularList = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { data: popularRestaurant, refetch } = useQuery(
    "nearRestaurentCache",
    async () => {
      const response = await API.get("/users?role=partner");
      return response.data.data;
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className=" w-100 ">
        <Row>
          {popularRestaurant?.map((item) => {
            return (
              <Col
                key={item.id}
                className="my-3 col-12 col-md-3"
                style={{ eight: "221px", cursor: "pointer" }}
                onClick={() => {
                  !isLogin
                    ? setShowLoginModal(true)
                    : navigate(`/menu/list/${item.fullName}/${item.id}`);
                }}
              >
                <Card
                  className="my-3 p-3 border-0 shadow"
                  style={{ height: "100px" }}
                >
                  <Row className="d-flex align-items-center">
                    <Col className="col-5">
                      <img
                        src={item?.image}
                        style={{ width: "65px", height: "65px" }}
                      />
                    </Col>
                    <Col className="col-7 ps-0">
                      <Card.Title className="ff-abhaya text-start fw-extra-bold f-24">
                        {item.fullName}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
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
