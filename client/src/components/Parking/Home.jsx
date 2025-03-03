const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Find & Book Your Perfect Parking Spot 🚗🔍</h1>
        <button>Opened Parking</button>
        <button>Normal Parking</button>
        <button>Electric Parking</button>
      </section>

      {/* Featured Parkings */}
      <section className="featured-parkings">
        <h2>Popular Parking Spots</h2>
        <ul>
          <li>✔️ Mall's</li>
          <li>✔️ Metro Station's</li>
          <li>✔️ Rail Station's</li>
          <li>✔️ Bus Station's</li>
        </ul>
      </section>

      {/* Parking Benefits */}
      <section className="benefits">
        <h2>Why Choose Our Parking?</h2>
        <ul>
          <li>✔️ 24/7 Security</li>
          <li>✔️ Electric Charging</li>
          <li>✔️ Real-time Availability</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Need Help?</h2>
        <button>Contact Support</button>
      </section>
    </div>
  );
};

export default Home;
