/* eslint-disable react/destructuring-assignment */
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

    this.state = {
      episode: props.match.params.episodeId,
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
    await axios.get(`https://rickandmortyapi.com/api/episode/${ this.state.episode}`)
      .then(async res => {
        const charactersURL= res.data.characters;
      const characters = await Promise.all(charactersURL.map(async characterURL => {
        const resp = await fetch(characterURL);
        return resp.json();
      }));
      this.setState({
        characters: characters
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
