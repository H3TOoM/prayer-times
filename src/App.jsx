import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timings, setTimings] = useState({});
  const [token, setToken] = useState(false);

  const fetchPrayerTimes = () => {
    if (!country || !city) {
      alert("Please enter both country and city names");
      return;
    }
    axios
      .get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`
      )
      .then((response) => {
        setTimings(response.data.data.timings);
        console.log(response.data.data.timings);
      });

    setToken(true);
  };

  return (
    <div className="bg-[#AF8F6F] flex flex-col items-center mt-10 w-[90%] max-w-[500px] m-auto p-5 text-center rounded-lg shadow-md">
      <div>
        <h1 className="text-[#F8F4E1] font-semibold text-[24px] sm:text-[30px]">
          PRAYER TIMES
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-5 flex-wrap">
          <input
            type="text"
            placeholder="enter country name"
            className="border-0 outline-none bg-[#F8F4E1] p-2 rounded-md capitalize text-[#74512D]"
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter city name"
            className="border-0 outline-none bg-[#F8F4E1] p-2 rounded-md capitalize text-[#74512D]"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button
          className="bg-[#F8F4E1] rounded-md px-8 py-2 mt-5 capitalize text-[#74512D] cursor-pointer"
          onClick={fetchPrayerTimes}
        >
          search
        </button>

        {/* prayer times */}
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-4 text-[#F8F4E1] font-semibold text-[16px] sm:text-[18px]">
            <li>Fajr: {token ? timings.Fajr : "00:00"} AM</li>
            <li>Sunrise: {token ? timings.Sunrise : "00:00"} AM</li>
            <li>Dhuhr: {token ? timings.Dhuhr : "00:00"} PM</li>
            <li>Asr: {token ? timings.Asr : "00:00"} PM</li>
            <li>Maghrib: {token ? timings.Maghrib : "00:00"} PM</li>
            <li>Isha: {token ? timings.Isha : "00:00"} PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
