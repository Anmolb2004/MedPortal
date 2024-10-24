import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocateUs = () => {
  const [userLocation, setUserLocation] = useState([30.7142622, 76.7133175]); // Default location (known point)
  const [sortedHospitals, setSortedHospitals] = useState([]); // State to store sorted hospitals
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // List of hospital locations
  const hospitalLocations = [
    { name: "Sector 11 Branch", lat: 30.7679441, lng: 76.7857261 },
    { name: "Mohali Branch", lat: 30.7142622, lng: 76.7133175 },
    { name: "Panchkula Branch", lat: 30.72883, lng: 76.94716 },
  ];

  // Custom icon for markers
  const customIcon = L.icon({
    iconUrl: "./location.jpeg", // Make sure the image path is correct
    iconSize: [30, 40], // Adjust size as per your image dimensions
    iconAnchor: [15, 40], // Adjust anchor so the marker appears correctly
  });
  const customIconHospital = L.icon({
    iconUrl: "./locatehospital.jpeg", // Make sure the image path is correct
    iconSize: [30, 40], // Adjust size as per your image dimensions
    iconAnchor: [15, 40], // Adjust anchor so the marker appears correctly
  });

  // Function to calculate distance between two points using the Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  useEffect(() => {
    // Initialize the map only once
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(userLocation, 13);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        zoom: 13,
        minZoom: 3,
        maxZoom: 18,
      }).addTo(mapInstance.current);

      // Add initial user marker
      L.marker(userLocation, { icon: customIcon })
        .addTo(mapInstance.current)
        .bindPopup("You are here!")
        .openPopup();

      // Add hospital markers
      hospitalLocations.forEach((hospital) => {
        L.marker([hospital.lat, hospital.lng], { icon: customIconHospital })
          .addTo(mapInstance.current)
          .bindPopup(`<b>${hospital.name}</b>`);
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null; // Reset the map instance
      }
    };
  }, []); // Run only once on mount

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(newLocation);

        if (mapInstance.current) {
          mapInstance.current.setView(newLocation, 13); // Update the map view to the user's location

          // Clear existing markers
          mapInstance.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              mapInstance.current.removeLayer(layer);
            }
          });

          // Add marker at the new user location
          L.marker(newLocation, { icon: customIcon })
            .addTo(mapInstance.current)
            .bindPopup("You are here!")
            .openPopup();
        }

        // Add hospital markers again after clearing
        hospitalLocations.forEach((hospital) => {
          L.marker([hospital.lat, hospital.lng], { icon: customIconHospital })
            .addTo(mapInstance.current)
            .bindPopup(`<b>${hospital.name}</b>`);
        });

        // Sort hospital locations based on proximity to user's location
        const sorted = hospitalLocations
          .map((hospital) => ({
            ...hospital,
            distance: calculateDistance(
              newLocation[0],
              newLocation[1],
              hospital.lat,
              hospital.lng
            ),
          }))
          .sort((a, b) => a.distance - b.distance); // Sort by proximity

        setSortedHospitals(sorted); // Update the sorted hospital list
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <div style={{ display: "flex", marginTop: "10vh" }}>
      {/* Sidebar for displaying sorted hospitals */}
      <div
        style={{
          width: "300px",
          padding: "20px",
          backgroundColor: "#f8f9fa", // Light background color for a cleaner look
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for better separation
          borderRight: "1px solid #ddd", // Add border to the right for separation
          height: "100vh", // Full height of the viewport
          overflowY: "auto", // Scrollable if content exceeds height
          position: "fixed", // Fixes the sidebar in place when scrolling the map
          top: 0,
          left: 0,
          paddingTop: "30vh",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#007bff",
            marginBottom: "20px",
          }}
        >
          Nearby Hospital Branches
        </h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sortedHospitals.map((hospital, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#fff", // White background for list items
                borderRadius: "8px", // Rounded corners for list items
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for better separation
                transition: "transform 0.2s", // Add slight hover effect
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <strong style={{ fontSize: "16px", color: "#333" }}>
                {hospital.name}
              </strong>
              <br />
              <span style={{ color: "#666" }}>
                {hospital.distance.toFixed(2)} km away
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={mapRef}
        style={{
          height: "100vh",
          width: "calc(100% - 300px)",
          marginLeft: "300px",
          marginTop: "0",
        }}
      />
    </div>
  );
};

export default LocateUs;