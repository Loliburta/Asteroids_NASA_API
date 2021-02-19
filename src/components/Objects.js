import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ChooseSvg } from "./ChooseSvg";
const apiKey = process.env.REACT_APP_NASA_KEY;

const Objects = () => {
  const [objectsInfo, setObjectsInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  let date = new Date().toJSON().slice(0, 10).replace(/-/g, "-");


  useEffect(() => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        setObjectsInfo(result.near_earth_objects[date]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-site">
          <ClipLoader size={150} color={"#462fc4"} loading={loading} />
        </div>
      ) : (
        <div className="whole">
          <div className="title">
            <div className="titl">Today's Asteroids</div>

            <div className="title-date">{date}</div>
          </div>

          {objectsInfo !== null ? (
            objectsInfo.map((asteroid) => {
              return (
                <>
                  <div className="name-div">
                    <a href={asteroid.nasa_jpl_url} className="name-link">
                      Asteroid{" "}
                      <div className="asteroid-name">{asteroid.name}</div>
                    </a>
                  </div>
                  <div className="asteroid">
                    <div className="text">
                      <p className="p0">
                        Relative Velocity{" "}
                        <div className="asteroid-name">
                          {Math.round(
                            asteroid.close_approach_data[0].relative_velocity
                              .kilometers_per_hour
                          )}{" "}
                          km/h
                        </div>
                      </p>
                      <p>
                        Estimated Diameter{" "}
                        <div className="asteroid-name">
                          {Math.round(
                            asteroid.estimated_diameter.meters
                              .estimated_diameter_min
                          )}{" "}
                          -{" "}
                          {Math.round(
                            asteroid.estimated_diameter.meters
                              .estimated_diameter_max
                          )}{" "}
                          meters
                        </div>
                      </p>
                      <p>
                        Miss Distance{" "}
                        <div className="asteroid-name">
                          {Math.round(
                            asteroid.close_approach_data[0].miss_distance
                              .astronomical * 10000000
                          ) / 10000000}{" "}
                          au
                        </div>
                      </p>
                      <p>
                        Absolute Magnitude{" "}
                        <div className="asteroid-name">
                          {asteroid.absolute_magnitude_h} H
                        </div>
                      </p>
                      <p>
                        {asteroid.is_potentially_hazardous_asteroid
                          ? "Potentialy Hazardous"
                          : "Not Hazardous"}
                      </p>
                    </div>
                    <div className="asteroid-div">
                      {ChooseSvg(
                        Math.round(
                          asteroid.estimated_diameter.meters
                            .estimated_diameter_min
                        )
                      )}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h2>No Data Fetched</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Objects;
