import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup,GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import 'leaflet-draw/dist/leaflet.draw.css';
import axios from "axios";
import L from "leaflet";

function Component1() {
  const [polygon, setPolygon] = useState(null);
  const [intersectingTiles, setIntersectingTiles] = useState([]);
  const [tileData, setTileData] = useState([]);

  const _onCreate = async (e) => {
    const polygon = e.layer;
    // console.log(e)

    // Convert the polygon to GeoJSON.
    const geojson = polygon.toGeoJSON();
    setPolygon(geojson);
    console.log(polygon);

    // fetch geojson data from file
    await axios
      .get("karnataka.geojson")
      .then((response) => {
        const tileData1 = response.data;
        console.log(tileData1);
        setTileData(tileData1);
        
        const intersectionTiles = tileData1.features.filter((tile) => {
            const tilePolygon = L.geoJSON(tile.geometry);
            console.log(tilePolygon);
            return tilePolygon.getBounds().intersects(polygon.getBounds());
          });
      
          setIntersectingTiles(intersectionTiles);
      })
      .catch((error) => {
        console.error("Error loading tile data:", error);
      });
  };

  return (
    <div>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={7}
        style={{ height: "90vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            //   onEdited={this._onEditPath}
            onCreated={_onCreate}
            //   onDeleted={this._onDeleted}
            draw={{
              polygon: true,
            }}
          />
        </FeatureGroup>
        {/* <GeoJSON data={polygon} style={{ color: 'blue' }} /> */}
          {intersectingTiles.map((tile, index) => (
            <GeoJSON data={tile.geometry} key={index} style={{ color: 'red' }} />
          ))}
      </MapContainer>
    </div>
  );
}

export default Component1;
