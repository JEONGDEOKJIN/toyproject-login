import React from "react";
import ButtonNavigateLogin from "../components/ButtonNavigateLogin";
import ButtonNavigateRegister from "../components/ButtonNavigateRegister";
import ButtonNavigateMain from "../components/ButtonNavigateMain";

const Home = () => {


  return (
    <>
      <div className="text-gray-100 bg-gray-900">Home</div>


      <ButtonNavigateLogin/>
      <ButtonNavigateRegister/>
      <ButtonNavigateMain />


    </>
  );
};

export default Home;
