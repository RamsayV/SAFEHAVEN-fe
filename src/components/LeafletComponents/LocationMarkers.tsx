import { useEffect, useState} from "react";
import {
  Marker,
  Popup,
  useMapEvents,
  
} from "react-leaflet";
import L, {LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import {fetchMarkers, addMarker, deleteMarker} from "../../api-client"



export interface MarkerData {
    id: number;
    position: LatLng,
    text: string;
  }

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/4171/4171097.png",
    iconSize: [38, 38]
  });


const LocationMarkers = () => {
const [markers, setMarkers] = useState<MarkerData[]>([])

    useMapEvents({
        click: (e) => {
          const newMarker: MarkerData = {
            id: Date.now(),
            position: e.latlng,
            text: "" 
          };
          setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
        }
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
        const updatedMarkers = markers.map((marker) => {
          if (marker.id === id) {
            return { ...marker, text: e.target.value };
          }
          return marker;
        });
        setMarkers(updatedMarkers);
      };

      useEffect(() => {
        const loadMarkers = async () => {
          try {
            const markersData = await fetchMarkers();
            setMarkers(markersData);
          } catch (error) {
            console.error('Failed to fetch markers:', error);
            
          }
        };
    
        loadMarkers();
      }, []);

    
  return (
    <>
      <MarkerClusterGroup>
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>
              <textarea
                value={marker.text}
                onChange={(e) => handleInputChange(e, marker.id)}
                placeholder="Enter your text here"
              />
              <button>
                Submit
              </button>
              <button>Delete</button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  )
}

export default LocationMarkers