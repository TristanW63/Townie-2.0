import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  lat: null,
  long: null,
});

export const FriendContext = createContext({
    userId: null,
    });

    export function FriendContextProvider({ children }) {
        const [userId, setUserId] = useState(null);
        return (
          <FriendContext.Provider value={userId}>
            {children}
          </FriendContext.Provider>
        );
      }

export function UserContextProvider({ children }) {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [location, setLocation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLocation({ lat, long });
  }, [lat, long]);

  return (
    <UserContext.Provider value={location}>
      {children}
    </UserContext.Provider>
  );
}
