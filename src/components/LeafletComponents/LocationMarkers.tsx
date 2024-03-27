import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { fetchMarkers, addMarker, deleteMarker, updateMarker } from "../../api-client";

export interface MarkerData {
  _id?: string;
  tempId?: string;
  position: {
    lat: number;
    lng: number;
  };
  text: string;
}

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/4171/4171097.png",
  iconSize: [38, 38],
});

const LocationMarkers = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useMapEvents({
    click: (e) => {
      const newMarker: MarkerData = {
        tempId: `temp-${Date.now()}`,
        position: e.latlng,
        text: "",
      };
      setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    markerId: string | undefined
  ) => {
    if (!markerId) {
      console.error("Marker ID is undefined or invalid.");
      return;
    }
    const updatedMarkers = markers.map((marker) => {
      if (marker._id === markerId || marker.tempId === markerId) {
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
        console.error("Failed to fetch markers:", error);
      }
    };

    loadMarkers();
  }, []);

  const handleAddMarker = async (tempId: string, text: string) => {
    const markerToSave = markers.find((marker) => marker.tempId === tempId);

    if (!markerToSave) {
      console.error("Marker to save not found.");
      return;
    }

    const markerData = {
      position: markerToSave.position,
      text: text,
    };

    try {
      const savedMarker = await addMarker(markerData);

      setMarkers((currentMarkers) =>
        currentMarkers.map((marker) =>
          marker.tempId === tempId ? savedMarker : marker
        )
      );
    } catch (error) {
      console.error("Failed to add marker:", error);
    }
  };

  const handleDeleteMarker = async (markerId: string, isTemp: boolean) => {
    if (!markerId) {
      console.error("Marker ID is undefined or invalid.");
      return; 
  }
    if (isTemp) {
       
        setMarkers(currentMarkers => currentMarkers.filter(marker => marker.tempId !== markerId));
    } else {
        
        try {
            await deleteMarker(markerId); 
            setMarkers(currentMarkers => currentMarkers.filter(marker => marker._id !== markerId));
        } catch (error) {
            console.error("Failed to delete marker:", error);
        }
    }
}

const handleUpdateMarker = async (markerId: string, newText: string) => {
  const markerToEdit = markers.find(marker => marker._id === markerId || marker.tempId === markerId);
  if (!markerToEdit) {
    console.error("Marker to edit not found.");
    return;
  }

  const updatedMarkerData = {
    ...markerToEdit,
    text: newText, 
  };

 
  delete updatedMarkerData.tempId;

  try {
    const updatedMarker = await updateMarker(markerId, updatedMarkerData);
    setMarkers(currentMarkers =>
      currentMarkers.map(marker => 
        (marker._id === markerId || marker.tempId === markerId) ? updatedMarker : marker
      )
    );
  } catch (error) {
    console.error("Failed to update marker:", error);
  }
};

  return (
    <>
      <MarkerClusterGroup>
        {markers.map((marker) => (
          <Marker
            key={marker._id || marker.tempId}
            position={marker.position}
            icon={customIcon}
          >
            <Popup>
              <textarea
                value={marker.text}
                onChange={(e) =>
                  handleInputChange(e, marker._id || marker.tempId)
                }
                placeholder="Enter your text here"
              />
              <button
                onClick={() =>
                  marker.tempId && handleAddMarker(marker.tempId, marker.text)
                }
              >
                Submit
              </button>
              <button onClick={() => handleDeleteMarker((marker._id || marker.tempId)!, !marker._id)}>Delete</button>
              <button onClick={() => marker._id && handleUpdateMarker(marker._id, marker.text)}>Edit</button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
};

export default LocationMarkers;
