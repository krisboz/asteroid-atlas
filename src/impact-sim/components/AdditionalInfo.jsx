import "../styles/AdditionalInfo.scss";
import OtherEffects from "./OtherEffects";

const AdditionalInfo = ({ speed, size, calculatedValues }) => {
  // The asteroid that wiped out the dinosaurs
  const chicxulub = {
    name: "Chicxulub",
    diameter: 17_000, // meters
    speed: 72_000, // km/h
    energyGJ: 3e14, // ~3×10^23 J converted to gigajoules
  };

  const hiroshimaEnergy = 0.015; // megatonnes TNT

  // Smarter comparison function
  const calcComparison = (newnum, basenum) => {
    if (newnum === basenum) {
      return { type: "same", text: "the same as" };
    }

    const ratio = newnum / basenum;
    const percentageDiff = ((newnum - basenum) / basenum) * 100;

    // If values are within ~±95%, use percentage difference
    if (Math.abs(percentageDiff) < 95) {
      return {
        type: "percentage",
        percentage: Math.abs(percentageDiff).toFixed(2),
        quantity: percentageDiff < 0 ? "less" : "more",
      };
    }

    // Otherwise, use ratio form
    if (ratio < 1) {
      return {
        type: "ratio",
        text: `${(1 / ratio).toFixed(2)} times less`,
      };
    } else {
      return {
        type: "ratio",
        text: `${ratio.toFixed(2)} times more`,
      };
    }
  };

  // Calculated differences between current asteroid and Chicxulub
  const chicDiff = {
    size: calcComparison(size, chicxulub.diameter),
    energy: calcComparison(calculatedValues.energy.gj, chicxulub.energyGJ),
    speed: calcComparison(speed, chicxulub.speed),
  };

  return (
    <article className="additional-info">
      <div className="title-container">
        <h2>Additional Info</h2>
      </div>
      <section className="more-data">
        <div className="data-thing">
          <p>
            Energy released would be equal to{" "}
            {calculatedValues.tnt.mt > 1
              ? `${Math.round(calculatedValues.tnt.mt).toLocaleString(
                  "hr-HR"
                )} megatonnes `
              : `${Math.round(calculatedValues.tnt.t)} tonnes `}
            of TNT
          </p>
          <ul>
            <li>
              That is{" "}
              {Math.floor(
                calculatedValues.tnt.mt / hiroshimaEnergy
              ).toLocaleString()}{" "}
              times the Hiroshima bomb
            </li>
            <li>
              TNT Equivalent is calculated with the kinetic energy value from
              its speed and size
            </li>
          </ul>
        </div>

        <div className="data-thing">
          <p>
            An energy value like this one would equal to an earthquake at{" "}
            {calculatedValues.richterScale.toFixed(3)} on the Richter scale.
          </p>
          <ul>
            <li>Earthquakes are a result of enormous amounts of energy</li>
            <li>
              Because of that it may seem that a large impact produces very
              little seismic activity
            </li>
          </ul>
        </div>

        <div className="data-thing">
          <p>
            Compared to Chicxulub (the asteroid that wiped out the dinosaurs):
          </p>
          <ul>
            <li>
              Its size is{" "}
              {chicDiff.size.type === "percentage"
                ? `${chicDiff.size.percentage}% ${chicDiff.size.quantity}`
                : chicDiff.size.text}
            </li>
            <li>
              Traveling with{" "}
              {chicDiff.speed.type === "percentage"
                ? `${chicDiff.speed.percentage}% ${chicDiff.speed.quantity}`
                : chicDiff.speed.text}{" "}
              speed
            </li>
            <li>
              Would impact with{" "}
              {chicDiff.energy.type === "percentage"
                ? `${chicDiff.energy.percentage}% ${chicDiff.energy.quantity}`
                : chicDiff.energy.text}{" "}
              energy
            </li>
          </ul>
        </div>
      </section>
      <OtherEffects />
    </article>
  );
};

export default AdditionalInfo;
