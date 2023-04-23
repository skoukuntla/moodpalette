import React from "react";
import styled from "styled-components";
import MooPalImg from "../shop/outfits/cow.png";
import MooLah from "../shop/moolah.png";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoButton = styled.button`
  width: 110px;
  height: 80px;
  border: none;
  background: none;

  img {
    width: 100%;
    height: 100%;
  }
  cursor: pointer;
`;

const LogoText = styled.h2`
  font-size: 30px;
  margin: 0;
  margin-left: 4px;
  color: #222;
  font-weight: 500;
`;

const PointsText = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-left: 4px;
  color: #222;
  font-weight: 500;
  img {
    position: relative;
    margin: 0;
    top: 5px;
    width: 10%;
    height: 10%;
  }
`;


export default function Logo(props) {
  const { user } = useContext(AuthContext);
  return (
    <LogoWrapper>
      <Link to="/home">
        <LogoButton>
          <img src={MooPalImg} alt="Cow Logo" />
        </LogoButton>
      </Link>
      <div>
        <LogoText>Mood Palette</LogoText>
        <div>
          <PointsText>Moo Lahs: {user.mooLahs}<img src={MooLah}/></PointsText>
        </div>
      </div>
    </LogoWrapper>
  );
}
