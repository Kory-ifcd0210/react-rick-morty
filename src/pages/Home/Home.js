/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import axios from 'axios';

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    page: 1,
    paginationInfo: null,
    episodes: [],
    hasLoaded: false,
    hasError: false,
    errorMessage: null,
    }
  };

  async componentDidMount() {
    this.loadEpisodes();
  };

  async loadEpisodes() {
    await axios.get(`https://rickandmortyapi.com/api/episode?page=1`)
      .then(res => {
        this.setState({
          episodes: res.data.results,
          hasLoaded:true,
        });
      })
  };

  render() {
    const {hasLoaded, hasError, episodes} = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
