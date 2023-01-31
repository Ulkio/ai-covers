import React, { useState, useEffect } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCoverClick = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: input,
      }),
    });
    const { message } = await response.json();

    setInput("");
    setLoading(false);
    setCover(message);
  };

  return (
    <div className="bg-zinc-800 h-screen flex flex-col justify-center">
      <h1 className="text-white font-semibold text-6xl text-center">Cover letters made effortlessly.</h1>
      <p className="text-white text-center p-8">Please input the URL of the job offer. Currently supports linkedin</p>
      <div className="flex flex-col justify-center items-center w-full gap-8">
        <form onSubmit={handleSubmit} action="POST" className="flex flex-col justify-center items-center w-full gap-8">
          <input
            type="text"
            className="w-1/3 text-white bg-transparent border-2 border-zinc-300 rounded-full p-4"
            placeholder="Paste a job offer URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white font-semibold p-4 border-2 border-zinc-300 rounded-full hover:scale-105 ease-in duration-100">
            Write my cover letter
          </button>
        </form>
        <div className="flex flex-col w-full justify-center items-center">
          {loading && <img src="/assets/Spinner-1s-200px.svg" className="mix-blend-multiply h-36" />}
          <p className="text-white w-1/2 whitespace-pre-wrap" onClick={handleCoverClick}>
            {cover}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
