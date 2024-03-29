import React from "react";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdCallMissed } from "react-icons/md";
import CountUp from "react-countup";
import parseDiameterForDisplay from "../helpers/parseDiameterForDisplay";
import { GiMeteorImpact } from "react-icons/gi";
import useHideCometShower from "../zustand/useHideCometShower";

import { Link } from "react-router-dom";
import "../styles/components/CompactAsteroid.scss";

const CompactAsteroid = ({ asteroid, orderBy, impactFunc, index }) => {
  const { name, speed, date, hazard, id, missDistance, diameter } = asteroid;
  const { toggleHideCometShower } = useHideCometShower();
  const handleImpactCallback = (event) => {
    toggleHideCometShower();
    impactFunc(event, index);
  };

  return (
    <article className="compact-asteroid" id={id}>
      <div className="date-container">
        <p className="date">{date}</p>
      </div>
      <div className="asteroid-data">
        <h3>{name}</h3>
        <p>
          <BsSpeedometer2 />{" "}
          <CountUp
            end={speed}
            delay={0}
            suffix=" km/h"
            duration={0.1}
            style={{ color: `${orderBy === "speed" ? "#ff870e" : "inherit"}` }}
          />
        </p>

        <p>
          <MdCallMissed />{" "}
          <CountUp
            end={missDistance}
            delay={0}
            suffix=" km"
            duration={2}
            style={{
              color: `${orderBy === "missDistance" ? "#ff870e" : "inherit"}`,
            }}
          />
        </p>
        <p>
          ⌀{" "}
          <CountUp
            end={parseDiameterForDisplay(diameter).val}
            delay={0}
            suffix={parseDiameterForDisplay(diameter).unit}
            duration={2}
            style={{
              color: `${orderBy === "diameter" ? "#ff870e" : "inherit"}`,
            }}
          />
        </p>
        <p className={hazard ? "is-hazard" : "is-safe"}>
          {hazard ? "Hazardous" : "Safe"} for Earth
        </p>
      </div>
      <div className="btn-container">
        <Link to={`/asteroid/${id}/${date}`} className="cta-button">
          View Details
        </Link>
        <button className="impact-button" onClick={handleImpactCallback}>
          <GiMeteorImpact />
        </button>
      </div>
    </article>
  );
};

export default CompactAsteroid;
