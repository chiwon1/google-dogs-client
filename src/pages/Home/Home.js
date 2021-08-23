import React from "react";
import "./styles.css";
import axios from "axios";
import { CONSTANTS } from "../../constants/constants";

function Home(props) {
  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
      .then(response => {
        if (response.data.success) {
          props.history.push("/login");
        } else {
          alert('로그아웃 하는데 실패 했습니다.');
        }
      });
  };

  return (
    <div className="container">
      Home
      <button onClick={onClickHandler}>
        {CONSTANTS.LOGOUT}
      </button>
    </div>
  );
}

export default Home;
