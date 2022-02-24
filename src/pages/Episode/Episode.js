/* eslint-disable compat/compat */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);
    console.log(props)

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadCharacter();
  };

  async loadCharacter() {
    await axios.get(`https://rickandmortyapi.com/api/episode/1`)
      .then(async res => {
        const charactersURL= res.data.characters;
      //   Promise.all(characters.map(character=>fetch(character))).then(responses =>
      //     Promise.all(responses.map(res2 => res2.text()))
      // ).then(texts => {
      //     console.log(texts)
      // })
      const characters = await Promise.all(charactersURL.map(async characterURL => {
        const resp = await fetch(characterURL);
        return resp.json();
      }));
      this.setState({
        characters: characters,
      });
  })
};

  render() {
    const {characters} =this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.location}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
