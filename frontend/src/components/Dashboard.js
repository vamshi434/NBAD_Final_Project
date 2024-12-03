import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Clean Energy Innovations</h1>
      
      {/* Summary Section */}
      <p>
        Over the last six months, clean energy technologies have seen significant advancements,
        including breakthroughs in solar energy efficiency, next-generation wind turbines, and
        large-scale battery storage solutions. Among these, perovskite solar cells have reached
        record-breaking efficiency levels, making them a strong competitor to traditional silicon
        cells. Similarly, floating wind farms are being deployed in deeper waters, harnessing wind
        energy where conventional turbines cannot operate. On the energy storage front, solid-state
        batteries are paving the way for more sustainable energy grids by offering higher capacity,
        reduced costs, and enhanced safety compared to lithium-ion batteries.
      </p>
      <p>
        These developments represent a paradigm shift in global energy policies, reducing dependency
        on fossil fuels and accelerating the transition to a net-zero carbon economy. Countries like
        Germany, Japan, and the United States are heavily investing in these technologies, marking
        an era of innovative renewable energy solutions.
      </p>
      <p>
        Source:{" "}
        <a
          href="https://www.energy.gov/eere/innovation"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.energy.gov/eere/innovation
        </a>
      </p>

      {/* Technical Details Section */}
      <h2>Technical Overview</h2>
      <p>
        This project is built using the MERN stack (MongoDB, Express, React, Node.js) to create a
        single-page application (SPA). The frontend is served through NGINX on port 80, while the
        backend runs on Node.js with Express on port 3000. JWT-based authentication ensures secure
        access to protected routes. Chart.js is used to create dynamic data visualizations, while
        RESTful APIs handle communication between the frontend and backend. Environment variables,
        managed via dotenv, ensure the secure handling of sensitive information like the JWT secret
        key.
      </p>
    </div>
  );
};

export default Dashboard;
