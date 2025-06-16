import React from "react";

const OrderMap = ({ address }) => {
  let mapQuery = address && address.trim() !== "" ? address : null;

  const [userLocation, setUserLocation] = React.useState(null);
  React.useEffect(() => {
    if (!mapQuery && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, [mapQuery]);

  let mapSrc =
    "https://maps.google.com/maps?q=World&t=&z=2&ie=UTF8&iwloc=&output=embed";
  if (mapQuery) {
    mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
      mapQuery
    )}&t=&z=4&ie=UTF8&iwloc=&output=embed`;
  } else if (userLocation) {
    mapSrc = `https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=10&output=embed`;
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: 400,
        height: 400,
        borderRadius: 16,
        overflow: "hidden",
        margin: 0,
        padding: 0,
        background: "#fff",
      }}
    >
      <iframe
        title="Order Delivery Map"
        width="100%"
        height="400"
        style={{
          border: 0,
          borderRadius: 16,
          display: "block",
          background: "#eee",
        }}
        loading="lazy"
        allowFullScreen
        src={mapSrc}
      ></iframe>
    </div>
  );
};

export default OrderMap;
