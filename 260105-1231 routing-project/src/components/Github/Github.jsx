import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Github() {

  // Method 1: useing useEffect and useState to fetch data
  // const [data, setData] = useState({});
  // const [followers, setFollowers] = useState([]);
  // useEffect(() => {
  //   const fetchGitHubData = async () => {
  //     try {
  //       const res = await fetch("https://api.github.com/users/SamanPandey-in");
  //       const newData = await res.json();
  //       setData(newData);
  //     } catch (error) {
  //       console.error("Error fetching GitHub data:", error);
  //     }
  //   };

  //   fetchGitHubData();
  // }, []);

  const data = useLoaderData();

  return (
    <>
      <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
        Github followers: {data.followers}
        <img src={data.avatar_url} alt="Git picture" width={300} />
      </div>
    </>
  );
}


// Method 2: Using loader function to fetch data
export const githubApiLoader = async () => {
  const res= await fetch("https://api.github.com/users/SamanPandey-in");
  return res.json();
}