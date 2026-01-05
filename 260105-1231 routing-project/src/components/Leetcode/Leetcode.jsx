import React, { useState, useEffect } from "react";

export default function LeetCodeCard() {
  const [profile, setProfile] = useState(null);
  const [solved, setSolved] = useState(null);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const fetchLeetData = async () => {
      try {
        // Profile
        const profileRes = await fetch(
          "https://alfa-leetcode-api.onrender.com/samanpandey/profile"
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Solved stats
        const solvedRes = await fetch(
          "https://alfa-leetcode-api.onrender.com/samanpandey/solved"
        );
        const solvedData = await solvedRes.json();
        setSolved(solvedData);

        // Submission calendar for 2025
        const calendarRes = await fetch(
          "https://alfa-leetcode-api.onrender.com/samanpandey/calendar?year=2025"
        );
        const calendarData = await calendarRes.json();
        setCalendar(calendarData);
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
      }
    };

    fetchLeetData();
  }, []);

  if (!profile || !solved) {
    return (
      <div className="text-center p-6 text-gray-700">
        Loading LeetCode stats...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={profile.avatar ?? "https://leetcode.com/static/images/LeetCode_Shared.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-yellow-400"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.username}</h2>
          <p className="text-sm text-gray-300">Global Ranking: {profile.ranking}</p>
        </div>
      </div>

      {/* Solved Stats */}
      <div className="bg-gray-700 p-4 rounded-md space-y-2">
        <h3 className="font-semibold text-lg">Solved Questions</h3>
        <p>Total: {solved.totalSolved}</p>
        <ul className="flex justify-between text-sm">
          <li>Easy: {solved.easySolved}</li>
          <li>Medium: {solved.mediumSolved}</li>
          <li>Hard: {solved.hardSolved}</li>
        </ul>
      </div>

      {/* Badges */}
      {profile.badges && profile.badges.length > 0 && (
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="font-semibold text-lg mb-2">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge, index) => (
              <div
                key={index}
                className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs"
                title={badge.name}
              >
                {badge.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar */}
      {calendar && calendar.length > 0 && (
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="font-semibold text-lg mb-2">Submission Calendar 2025</h3>
          <div className="grid grid-cols-53 gap-0.5">
            {calendar.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded ${
                  day.count === 0
                    ? "bg-gray-900"
                    : day.count < 3
                    ? "bg-green-200"
                    : day.count < 6
                    ? "bg-green-400"
                    : "bg-green-600"
                }`}
                title={`Date: ${day.date}, Submissions: ${day.count}`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}