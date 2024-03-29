import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/AsteroidPage.scss";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdCallMissed } from "react-icons/md";
import parseAsteroidData from "../helpers/parseAsteroidData";
import SizeComparator from "../SizeComparator/SizeComparator";
import parseDiameterForDisplay from "./../helpers/parseDiameterForDisplay";
import OrbitalData from "../components/OrbitalData";
import LoadingAnim from "../components/LoadingAnim";
import CountUp from "react-countup";
import { IoArrowBackSharp } from "react-icons/io5";
import { GiMeteorImpact } from "react-icons/gi";
import useCurrentQueryStore from "../zustand/useCurrentQueryStore";
import ImpactEnergyVisualizer from "../impact-sim/ImpactEnergyVisualizer";
import useHideCometShower from "../zustand/useHideCometShower";
import { format } from "date-fns";

const AsteroidPage = ({}) => {
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const { id, date } = useParams();
  const { currQuery } = useCurrentQueryStore();
  const { toggleHideCometShower } = useHideCometShower();

  const [asteroid, setAsteroid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (id) {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const API_LINK = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`;
    useEffect(() => {
      fetch(API_LINK)
        .then((response) => response.json())
        .then((data) => {
          setAsteroid(parseAsteroidData(data, date));
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, []);
  } else {
  }

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(
      `/asteroidlist/${
        currQuery.startdate === undefined
          ? format(new Date(), "yyyy-MM-dd")
          : currQuery.startdate
      }/${currQuery.enddate ? currQuery.enddate : "none"}`
    );
  };

  //Two functions instead of a toggle to have the control to turn off
  //the comet shower rendering
  const openMap = () => {
    toggleHideCometShower();
    setMapIsOpen(true);
  };

  const closeMap = () => {
    setMapIsOpen(false);
  };

  if (loading) {
    return <LoadingAnim />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (mapIsOpen) {
    return (
      <ImpactEnergyVisualizer
        name={asteroid.name}
        diameter={(asteroid.diameter_min + asteroid.diameter_max) / 2}
        speedKmH={asteroid.velocity}
        func={closeMap}
      />
    );
  }

  if (asteroid) {
    return (
      <main className="asteroid-page">
        <>
          <div className="navigation-container">
            <button onClick={handleGoBack}>
              <IoArrowBackSharp /> to List
            </button>
            <button onClick={openMap}>
              Crash it into Earth <GiMeteorImpact />
            </button>
          </div>

          <div className="name-plate">
            <h1>{asteroid.name}</h1>
            <p className="id">#{id}</p>
          </div>
          <section className="basic-info">
            <h2>Basic Asteroid Info</h2>
            <div className="basic-info-data">
              <article className="velocity">
                <p>
                  <BsSpeedometer2 />{" "}
                  <CountUp end={asteroid.velocity} delay={0} suffix=" km/h" />
                </p>
              </article>
              <article className="hazard">
                <p>{!asteroid.hazard ? "Safe" : "Hazardous"}</p>
              </article>
              <article className="miss-distance">
                <p>
                  <MdCallMissed /> Miss By:{" "}
                  <CountUp
                    end={asteroid.missDistance}
                    delay={0}
                    suffix=" km"
                    duration={5}
                  />
                </p>
              </article>
            </div>
          </section>
          <section className="size">
            <h2>Size</h2>
            <article className="size-data">
              <p>
                ⌀-min: {parseDiameterForDisplay(asteroid.diameter_min).val}
                {parseDiameterForDisplay(asteroid.diameter_min).unit}
              </p>
              <p>
                ⌀-avg:{" "}
                <span className="avg-size-val">
                  {
                    parseDiameterForDisplay(
                      (parseFloat(asteroid.diameter_min) +
                        parseFloat(asteroid.diameter_max)) /
                        2
                    ).val
                  }
                  {
                    parseDiameterForDisplay(
                      (parseFloat(asteroid.diameter_min) +
                        parseFloat(asteroid.diameter_max)) /
                        2
                    ).unit
                  }
                </span>
              </p>
              <p>
                ⌀-max: {parseDiameterForDisplay(asteroid.diameter_max).val}{" "}
                {parseDiameterForDisplay(asteroid.diameter_max).unit}
              </p>
            </article>
            <h2>Compare the Asteroid Size</h2>
            <p>
              Help visualize how big the asteroid is, the app uses the
              calculated average diameter for comparisons
            </p>
          </section>
          <SizeComparator
            asteroidSize={
              parseFloat(asteroid.diameter_min) +
              parseFloat(asteroid.diameter_max) / 2
            }
          />
          <OrbitalData data={asteroid.orbital_data} />
        </>
      </main>
    );
  }
};

export default AsteroidPage;
