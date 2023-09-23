import React from 'react';

function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">About Our Accommodation Service</h1>
        <p className="text-gray-600">
          Welcome to [Your Accommodation Name]! We are your home away from home, dedicated to providing exceptional experiences and comfortable stays for our guests.
        </p>
        <p className="text-gray-600 mt-4">
          Our [City Name] location offers a range of beautifully furnished rooms and suites to suit every traveler's needs. Whether you're here for business or leisure, we have the perfect room for you.
        </p>
        <p className="text-gray-600 mt-4">
          At [Your Accommodation Name], we take pride in our commitment to outstanding hospitality. Our friendly and professional staff are here to ensure your stay is memorable and stress-free.
        </p>
        <p className="text-gray-600 mt-4">
          Explore our website to discover our room options, amenities, and reservation process. We look forward to hosting you and making your stay in [City Name] exceptional.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
