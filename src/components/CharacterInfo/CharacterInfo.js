import React from "react";

import "./CharacterInfo.scss";


function CharacterInfo({ characterName, characterImg,  characterSpecies, characterOriginObj, characterLocationObj }) {
  return (
    <div className="row">
                <div className="col col-6">
                    <img className="CharacterCard__img" src={characterImg} alt="" />
                </div>
                <div className="col col-4">
                    <h3 className="CharacterCard__name h4"> {characterName}</h3>
                    <ul>
                        <li>{characterSpecies}</li>
                        <li>LOCATION: {characterOriginObj.name}</li>
                        <li>ORIGIN: {characterLocationObj.name}</li>
                    </ul>
                </div>
            </div>
  );
}

export default CharacterInfo;
