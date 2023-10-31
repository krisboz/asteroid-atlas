import React from "react";
import OrbitVisualizer from "./OrbitVisualizer";
import getAsteroidPropertyDescription from "../helpers/getAsteroidPropDescription";
import parsePropertyName from "../helpers/parsePropertyName";
import "../styles/OrbitalData.scss";
import Collapsible from "react-collapsible";
import OrbitCanvas from "./OrbitCanvas";

/**
 * 
 *   const orbital_data = {
            first_observed: 
        observations_used: 
        description: 
        period: 
        aphelion: 
        perihelion: 
        jupiter_tisserand_invariant: 
        inclination: 
        eccentricity: 
        mean_motion: 
        semi_major_axis: 
        ascending_node_longitude: 
  };
 */
const OrbitalData = ({ data }) => {
  console.log("THIS ONE", data);

  return (
    <section className="orbital-data">
      <h2>Orbital Data</h2>
      <article className="orbit-basic-data">
        <div className="description-container">
          <p>{data.description}</p>
        </div>

        <div className="basic-data-container">
          <p>First observed: {data.first_observed}</p>
          <p>Orbit Type: {data.type}</p>
          <p>Observations: {data.observations_used}</p>
          <p>Orbit duration: {Math.round(data.period)} days</p>
        </div>
      </article>
      <article className="nerd-data">
        <div className="nameplate">
          <h3>Orbital data for nerds</h3>
          <p>click on any of the properties to find out more</p>
        </div>

        <div className="properties">
          {Object.entries(data.for_nerds).map((el) => {
            return (
              <Collapsible trigger={`${parsePropertyName(el[0])}: ${el[1]}`}>
                <p className="coll-desc">
                  {getAsteroidPropertyDescription(el[0])}
                </p>
              </Collapsible>
            );
          })}
        </div>
      </article>
    </section>
  );
};

export default OrbitalData;