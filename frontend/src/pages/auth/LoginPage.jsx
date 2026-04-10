import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const navigate = useNavigate();
  
  function handleOnLoginSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const values = Object.fromEntries(data);
    console.log(values);
  }
  return (
    <div>
      Login Page
      <form method="post" onSubmit={handleOnLoginSubmit}>
        <label>Nom : </label>
        <input id="name" type="text" name="name" />
        <label>Mot de passe : </label>
        <input id="password" type="password" name="password" />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
}

export default LoginPage;
