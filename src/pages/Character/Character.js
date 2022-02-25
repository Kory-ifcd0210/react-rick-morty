/* eslint-disable compat/compat */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { React,  Component } from "react";

import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard";



class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characterId: props.match.params.characterId,
        episodeList: [],
        characterName:  "",
        characterImg: "",
        characterSpecies: "",
        characterStatus: "",
        characterOriginObj: "",
        characterLocationObj: "",
    };
  }

  async componentDidMount() {
    this.loadCharacter();
  }

  async loadCharacter() {
    await axios
      .get(`https://rickandmortyapi.com/api/character/${this.state.characterId}`)
      .then(async (res) => {
          console.log(res)
        this.setState({
            characterName:  res.data.name,
            characterImg: res.data.image,
            characterSpecies:  res.data.species,
            characterStatus:  res.data.status,
            characterOriginObj:  res.data.origin,
            characterLocationObj:  res.data.location,
        })
        const episodesURL = res.data.episode;
        const episodeList = await Promise.all(
            episodesURL.map(async (episodeURL) => {
            const resp = await fetch(episodeURL);
            return resp.json();
          }),
        );
        console.log(this.state)
        this.setState({
            episodeList: episodeList,
        });
      });
  }

  render() {
    const { characterId, characterName, characterImg, characterSpecies, characterStatus, characterOriginObj, characterLocationObj  } = this.state;
    const { episodeList } = this.state;
    console.log(characterLocationObj)

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
          <CharacterCard
                  key={characterId}
                  id={characterId}
                  name={characterName}
                  image={characterImg}
                  species={characterSpecies}
                  status={characterStatus}
                  origin={characterOriginObj}
                  location={characterLocationObj}
                />
            {episodeList.map((episode) => (
                <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            )
            )}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Character;
