import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find & Book Your Perfect Parking Spot 🚗🔍</h1>
        <p>Hassle-free parking at your convenience</p>
        <div className="parking-options">
          <button onClick={() => navigate("/parkings")}>All Parkings</button>
          <button onClick={() => navigate("/electricParking")}>Electric Parking</button>
          <button onClick={() => navigate("/parkings/new")}>Create Your Parking</button>
        </div>
      </section>

      {/* Featured Parkings */}
      <section className="featured-parkings">
        <h2>Popular Parking Spots</h2>
        <div className="parking-list">
          <div>
            <h3>✔️ Malls</h3>
            <p>
              Shopping malls attract thousands of visitors daily, making parking
              a major concern. Our mall parking service ensures you get a
              secured and well-organized parking spot without any hassle.
              Whether you're visiting for shopping, dining, or entertainment,
              our real-time availability feature helps you find the best spot
              instantly. We offer dedicated spaces for disabled individuals,
              valet services, and electric vehicle charging stations for
              convenience. Say goodbye to the frustration of circling around for
              a parking space—pre-book your mall parking and enjoy a stress-free
              experience!
            </p>
          </div>
          <div>
            <h3>✔️ Metro Stations</h3>
            <p>
              Metro stations are among the busiest locations, especially during
              peak hours. Finding a safe and convenient parking spot near metro
              stations can be difficult, but our smart booking system makes it
              easy. We provide well-maintained, secure, and affordable parking
              near major metro stations, so you can park and commute without
              worries. Our parking areas are equipped with CCTV surveillance,
              security personnel, and real-time monitoring for your safety.
              Whether you're a daily commuter or an occasional traveler, our
              metro station parking ensures a smooth transition from car to
              metro.
            </p>
          </div>

          <div>
            <h3>✔️ Railway Stations</h3>
            <p>
              Railway stations serve thousands of passengers every day, leading
              to crowded parking areas. With our advanced parking solution, you
              can pre-book your spot, ensuring a hassle-free experience. We
              offer short-term and long-term parking options for travelers, with
              designated areas for overnight parking. Our facilities are guarded
              24/7, well-lit, and equipped with electric charging stations for
              those traveling in EVs. Whether you're heading out for a short
              trip or an extended journey, our safe and convenient railway
              station parking lets you focus on your travels while we take care
              of your vehicle.
            </p>
          </div>
          <div>
            <h3>✔️ Bus Stations</h3>
            <p>
              Bus terminals are often overcrowded, making it challenging to find
              secure parking. Our bus station parking service provides a
              dedicated, well-maintained space for passengers who need a safe
              place to park their vehicles before catching a bus. Our parking
              lots are affordable, secure, and easily accessible, making it
              easier for you to park and travel worry-free. Equipped with CCTV
              cameras, real-time tracking, and electric vehicle charging
              stations, our bus station parking ensures your car remains safe
              while you travel. Whether you're taking a short city bus ride or a
              long-distance journey, we've got the perfect parking spot for you!
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="featured-parkings">
        <h2>How It Works?</h2>
        <div className="parking-list">
          <div>
            <h3> 📝 Choose your parking type</h3>
            <p>
              Select the type of parking that best suits your needs—Opened
              Parking, Normal Parking, or Electric Parking. Whether you need a
              quick stop or long-term parking, we have the right option for you.
            </p>
          </div>

          <div>
            <h3>📍 Select your preferred location</h3>
            <p>
              Browse through real-time available parking spots near malls, metro
              stations, railway stations, or bus terminals. Our smart system
              ensures you get the most convenient and closest parking spot based
              on your destination.
            </p>
          </div>

          <div>
            <h3>✅ Confirm & make payment</h3>
            <p>
              Once you've selected your parking spot, proceed with secure online
              payment. We offer multiple payment options, including credit/debit
              cards, digital wallets, and UPI, ensuring a seamless transaction.
            </p>
          </div>

          <div>
            <h3>🚗 Park hassle-free!</h3>
            <p>
              After booking, simply drive to your reserved spot, show your
              confirmation, and park without any stress. Enjoy your time while
              your vehicle is safe in a 24/7 monitored parking area.
            </p>
          </div>
        </div>
      </section>

      {/* Parking Benefits */}
      <section className="featured-parkings">
        <h2>Why Choose Our Parking?</h2>
        <div className="parking-list">
          <div>
            <h3>✔️ 24/7 Security</h3>
            <p>
              Your vehicle’s safety is our top priority. Our parking spaces are
              monitored round-the-clock with CCTV cameras and on-ground security
              personnel to ensure your car is always protected. You can park
              worry-free, knowing that our facilities are guarded 24/7.
            </p>
          </div>

          <div>
            <h3>✔️ Electric Charging</h3>
            <p>
              We support sustainable transportation by offering dedicated EV
              charging stations at all our parking locations. Whether you drive
              a hybrid or a fully electric vehicle, you can charge your car
              while you shop, travel, or work without any hassle.
            </p>
          </div>
          <div>
            <h3>✔️ Real-time Availability</h3>
            <p>
              No more frustration in searching for a parking spot! Our real-time
              tracking system lets you check available parking spaces near your
              destination. You can book instantly and get directions to your
              reserved spot for a seamless parking experience.
            </p>
          </div>
          <div>
            <h3>✔️ Easy Online Booking</h3>
            <p>
              Skip the long queues and manual ticketing—reserve your parking
              spot online in just a few clicks! Our user-friendly interface
              allows you to select your preferred parking, confirm the booking,
              and make secure payments all from your phone or computer.
            </p>
          </div>

          <div>
            <h3>✔️ Affordable Pricing</h3>
            <p>
              We offer the best rates with flexible pricing options, whether you
              need short-term or long-term parking. Our transparent pricing
              ensures no hidden charges, making it an economical choice for
              daily commuters, shoppers, and travelers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-parkings">
        <h2>Need Help?</h2>
        <p>Our support team is available 24/7!</p>
        <p>📧 support@parkinghub.com</p>
        <p>📞 +123-456-7890</p>
      </section>
    </div>
  );
};

export default Home;
