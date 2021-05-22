import React, { useEffect, useState, useRef } from "react";

import "./Maps.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/maps.js";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibWludHVqdXBhbGx5IiwiYSI6ImNrZHNsMGdiZDEwbm0yd3BibHhzMWJzc2EifQ.Kk0Ih8YQrDqCJEWwpbkEIA";

const useStyles = makeStyles(componentStyles);

const Maps = () => {
  const classes = useStyles();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(85.6762581434793);
  const [lat, setLat] = useState(20.14401529809813);
  const [zoom, setZoom] = useState(14);

  let div = document.createElement("div");
  div.classList.add("marker");
  div.innerText = "IIT Bhubaneshwar";

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([85.6762581434793, 20.14401529809813])
      .addTo(map.current);

    var marker = new mapboxgl.Marker(div, {
      color: "red",
    })
      .setLngLat([85.6762581434793, 20.14401529809813])
      .addTo(map.current);
  });

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card id="institute-map" classes={{ root: classes.cardRoot }}>
              {/* <MapWrapper /> */}
              <div ref={mapContainer} style={{ height: "400px" }} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Maps;
