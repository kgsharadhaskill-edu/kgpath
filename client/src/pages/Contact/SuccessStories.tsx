import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";

interface Booking {
  name: string;
  created_at: string;
}

interface Story {
  name: string;
  story: string;
  time: string;
}

interface ApiResponse {
  recent: Booking[];
  total_bookings: number;
  avg_rating: number;
}

const SuccessStories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${API_URL}fetch-bookings.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data: ApiResponse = await response.json();

        const formattedStories: Story[] = data.recent.map((booking) => ({
          name: booking.name,
          story: "Reached out and booked a guidance call.",
          time: getTimeAgo(new Date(booking.created_at)),
        }));

        setStories(formattedStories);
        setTotalBookings(data.total_bookings);
        setAvgRating(data.avg_rating);
      } catch (err) {
        console.error("Failed to fetch success stories:", err);
        setError("Could not load recent activity. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [API_URL]);

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} years ago`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} months ago`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} days ago`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;
    return "Just now";
  };

  const renderContent = () => {
    if (isLoading) return <p className="text-center text-gray-500">Loading recent activity...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (stories.length === 0)
      return <p className="text-center text-gray-500">No recent activity to show.</p>;

    return stories.map((story, i) => (
      <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <p className="text-lg text-gray-700 italic">"{story.story}"</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold text-indigo-600">- {story.name}</p>
          <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{story.time}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-slate-50 py-12 rounded-xl border border-gray-200">
      <SectionTitle title="Recent Activity" subtitle="Your journey starts with a simple conversation." />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 px-6">{renderContent()}</div>

      {/* ✅ Dynamic Social Proof */}
      <div className="mt-8 text-center text-gray-500 px-6">
        Social Proof:{" "}
        <span className="font-bold text-gray-800">{totalBookings} students</span> contacted us this
        week. Avg satisfaction:{" "}
        <span className="text-yellow-500">
          ★★★★☆ {avgRating.toFixed(1)}/5
        </span>
      </div>
    </div>
  );
};

export default SuccessStories;
