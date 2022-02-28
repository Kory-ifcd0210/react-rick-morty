/* eslint-disable compat/compat */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */

import { React, Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";


class Location extends Component {
    constructor(props) {
    super(props);

    this.state = {
        locationId: props.match.params.locationId,
        locationName:"",
        locationType:"",
        locationDimension:"",
        residentsList: [],
    };
}

async componentDidMount() {
    this.loadCharacter();
    }

    async loadCharacter() {
        await axios
            .get(
                `https://rickandmortyapi.com/api/location/${this.state.locationId}`,
            )
        .then(async (res) => {
        this.setState({
            locationName:res.data.name,
            locationType:res.data.type,
            locationDimension:res.data.dimension,
        });
        const residentsURL = res.data.residents
        const residentsList = await Promise.all(
            residentsURL.map(async (residentURL) => {
            const resp = await fetch(residentURL);
            return resp.json();
            }),
        );
        this.setState({
            residentsList: residentsList,
        });
        });
    }

    render() {
    const {
        locationName,
        locationType,
        locationDimension
    }= this.state;
    const { residentsList } = this.state;

    return (
        <Layout>
        <section>
            <div className="row">
                <h3 className="CharacterCard__name"> {locationName}</h3>
            </div>
            <div className="row">
                    <h5 className="col">{locationType}</h5>
                    <h5 className="col">{locationDimension}</h5>
            </div>
            <hr/>
            <div className="row">
            {residentsList.map((resident) => (
                <CharacterCard
                key={resident.id}
                id={resident.id}
                name={resident.name}
                image={resident.image}
                species={resident.species}
                status={resident.status}
                origin={resident.origin}
                location={resident.location}
                />
            ))}
            </div>
        </section>
        </Layout>
    );
    }
}

export default Location;

