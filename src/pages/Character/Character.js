/* eslint-disable compat/compat */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { React, Component } from "react";

import axios from "axios";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import CharacterInfo from "../../components/CharacterInfo/CharacterInfo";

class Character extends Component {
    constructor(props) {
    super(props);

    this.state = {
        characterId: props.match.params.characterId,
        episodeList: [],
        characterName: "",
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
        .get(
        `https://rickandmortyapi.com/api/character/${this.state.characterId}`,
        )
        .then(async (res) => {
        this.setState({
            characterName: res.data.name,
            characterImg: res.data.image,
            characterSpecies: res.data.species,
            characterStatus: res.data.status,
            characterOriginObj: res.data.origin,
            characterLocationObj: res.data.location,
        });
        const episodesURL = res.data.episode;
        const episodeList = await Promise.all(
            episodesURL.map(async (episodeURL) => {
            const resp = await fetch(episodeURL);
            return resp.json();
            }),
        );
        this.setState({
            episodeList: episodeList,
        });
        });
    }

    render() {
    const {
        characterName,
        characterImg,
        characterSpecies,
        characterStatus,
        characterOriginObj,
        characterLocationObj,
    } = this.state;
    const { episodeList } = this.state;

    return (
        <Layout>
        <section>
            <CharacterInfo
            characterName = {characterName}
            characterImg = {characterImg}
            characterSpecies = {characterSpecies}
            characterStatus = {characterStatus}
            characterOriginObj = {characterOriginObj}
            characterLocationObj = {characterLocationObj}
            />
                <hr/>
            <div className="row">
            <h3 className="CharacterCard__name"> Episodes</h3>
            <hr/>
            {episodeList.map((episode) => (
                <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
                />
            ))}
            </div>
        </section>
        </Layout>
    );
    }
}

export default Character;
