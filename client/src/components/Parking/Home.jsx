import { useNavigate } from "react-router-dom";
import HomeCard from "./HomeCard.jsx";
import "./Home.css";
import "./HomeCard.css";

const Home = () => {
  const navigate = useNavigate();

  const parkingSpots = [
    {
      name: "Malls",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdQV6cmgcg8mffOykR9aoWODorbjdW5uIcQ&s",
      detail:
        "Shopping malls attract thousands of visitors daily, making parking a major concern. Our mall parking service ensures youget a secured and well-organized parking spot without any hassle. Whether you're visiting for shopping, dining, or entertainment, our real-time availability feature helps you find the best spot instantly. We offer dedicated spaces for disabled individuals, valet services, and electric vehicle charging stations for convenience. Say goodbye to the frustration of circling around for a parking space—pre-book your mall parking and enjoy a stress-free experience! ",
    },
    {
      name: "Metro Stations",
      image:
        "https://liferepublic.in/images/media/1755782293Pune-Metro-Line-3-train-at-an-elevated-station-with-a-cityscape-background-at-sunset.jpg",
      detail:
        " Metro stations are among the busiest locations, especially during peak hours. Finding a safe and convenient parking spot near metro stations can be difficult, but our smart booking system makes it easy. We provide well-maintained, secure, and affordable parking near major metro stations, so you can park and commute without worries. Our parking areas are equipped with CCTV surveillance, security personnel, and real-time monitoring for your safety. Whether you're a daily commuter or an occasional traveler, our metro station parking ensures a smooth transition from car to metro.",
    },
    {
      name: "Railway Stations",
      image:
        "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/11/08111004/oldest-railway-stations-in-india-2.jpeg",
      detail:
        " Railway stations serve thousands of passengers every day, leading to crowded parking areas. With our advanced parking solution, you can pre-book your spot, ensuring a hassle-free experience. We offer short-term and long-term parking options for travelers, with designated areas for overnight parking. Our facilities are guarded 24/7, well-lit, and equipped with electric charging stations for those traveling in EVs. Whether you're heading out for a short trip or an extended journey, our safe and convenient railway station parking lets you focus on your travels while we take care of your vehicle.",
    },
    {
      name: "Bus Stations",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSFSO6vqzd7sy76C1FSQr_RQ-6CY5CjCDkyg&s",
      detail:
        "Bus terminals are often overcrowded, making it challenging to find secure parking. Our bus station parking service provides a dedicated, well-maintained space for passengers who need a safe place to park their vehicles before catching a bus. Our parking lots are affordable, secure, and easily accessible, making it easier for you to park and travel worry-free. Equipped with CCTV cameras, real-time tracking, and electric vehicle charging stations, our bus station parking ensures your car remains safe while you travel. Whether you're taking a short city bus ride or a long-distance journey, we've got the perfect parking spot for you!",
    },
  ];

  const parkingWorks = [
    {
      name: "Choose your parking type",
      image:
        "https://img.staticmb.com/mbcontent/images/crop/uploads/2022/11/car-parking-space_0_1200.jpg",
      detail:
        " Select the type of parking that best suits your needs—Opened Parking, Normal Parking, or Electric Parking. Whether you need a quick stop or long-term parking, we have the right option for you.",
    },
    {
      name: "Select your preferred location",
      image:
        "https://files.prepinsta.com/wp-content/uploads/2022/02/Location-search-bro.webp",
      detail:
        "Browse through real-time available parking spots near malls, metro stations, railway stations, or bus terminals. Our smart system ensures you get the most convenient and closest parking spot based on your destination.",
    },
    {
      name: "Confirm & make payment",
      image:
        "https://static.vecteezy.com/system/resources/previews/027/570/676/non_2x/confirm-online-payment-by-email-free-vector.jpg",
      detail:
        "Once you've selected your parking spot, proceed with secure online payment. We offer multiple payment options, including credit/debit cards, digital wallets, and UPI, ensuring a seamless transaction.",
    },
    {
      name: "Park hassle-free",
      image:
        "https://res.cloudinary.com/yourparkingspace/image/upload/q_auto,f_auto,w_945,h_520,c_fill/1_1x0_2120x1413_0x520_multi_storey_car_park_19be82d4ca.jpg",
      detail:
        "After booking, simply drive to your reserved spot, show your confirmation, and park without any stress. Enjoy your time while your vehicle is safe in a 24/7 monitored parking area.",
    },
  ];

  const features = [
    {
      name: "24/7 Security",
      image:
        "https://content3.jdmagicbox.com/v2/comp/bangalore/h7/080pxx80.xx80.190928123413.v3h7/catalogue/securer-24-7-security-seevices-bangalore-0pwl9ifl27.jpg",
      detail:
        "Your vehicle's safety is our top priority. Our parking spaces are monitored round-the-clock with CCTV cameras and on-ground security personnel to ensure your car is always protected. You can park worry-free, knowing that our facilities are guarded 24/7.",
    },
    {
      name: "Electric Charging",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFkQuuAsBJKnNYAXA2jqDz1nQ7knVGGMurzQ&s",
      detail:
        "We support sustainable transportation by offering dedicated EV charging stations at all our parking locations. Whether you drive a hybrid or a fully electric vehicle, you can charge your car while you shop, travel, or work without any hassle.",
    },
    {
      name: "Real-time Availability",
      image:
        "https://i0.wp.com/www.chinaiotdevices.com/wp-content/uploads/2024/06/smart-parking-system.jpg?resize=1024%2C509&ssl=1",
      detail:
        " No more frustration in searching for a parking spot! Our real-time tracking system lets you check available parking spaces near your destination. You can book instantly and get directions to your reserved spot for a seamless parking experience.",
    },
    {
      name: "Easy Online Booking",
      image:
        "https://image.slidesharecdn.com/onlineparking-161103004304/75/Online-parking-1-2048.jpg",
      detail:
        " Skip the long queues and manual ticketing—reserve your parking spot online in just a few clicks! Our user-friendly interface allows you to select your preferred parking, confirm the booking, and make secure payments all from your phone or computer.",
    },
    {
      name: "Affordable Pricing",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWEnIO1y3dhbMS8cPWzK3sjWP-zplsiV420g&s",
      detail:
        " We offer the best rates with flexible pricing options, whether you need short-term or long-term parking. Our transparent pricing ensures no hidden charges, making it an economical choice for daily commuters, shoppers, and travelers.",
    },
  ];

  const allParking = {
    name: "All Parkings",
    image:
      "https://img.freepik.com/free-photo/parkinglot-commute-outside-area-auto_1112-984.jpg?semt=ais_hybrid&w=740&q=80",
    detail:
      "Browse all available parking spaces in one place. Find secure, affordable, and well-managed parking near malls, stations, and busy areas. Choose the spot that fits your location and timing—no guesswork.",
  };
  const electricParking = {
    name: "Electric Parking",
    image:
      "https://btcpower.com/wp-content/uploads/2023/04/parkingoftehfuture.jpg",
    detail:
      "Park smarter with dedicated electric vehicle charging spaces. Our EV-friendly parking ensures safe charging, real-time availability, and easy access. Perfect for daily commuters and long trips alike.",
  };
  const newParking = {
    name: "Create Your Parking",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOsErNenTjd7sL--vkFuBofqDqWx8EfpWpgA&s",
    detail:
      "Add and manage your own parking space effortlessly. List location, capacity, and features in just a few steps. Start earning while helping others park stress-free.",
  };

  return (
    <div className="home-container">
      {/* Hero Section */}

      <section className="hero">
        <h1>Find & Book Your Perfect Parking Spot </h1>
        <p>Hassle-free parking at your convenience</p>

        <div className=" featured-parkings">
          <div className="parking-list" onClick={() => navigate("/parkings")}>
            <HomeCard card={allParking} />
          </div>

          <div
            className="parking-list"
            onClick={() => navigate("/electricParking")}>
            <HomeCard card={electricParking} />
          </div>

          <div
            className="parking-list"
            onClick={() => navigate("/parkings/new")}>
            <HomeCard card={newParking} />
          </div>
        </div>
      </section>

      {/* Featured Parkings */}
      <section className="featured-parkings">
        <h2>Popular Parking Spots</h2>
        <div className="parking-list">
          {parkingSpots.map((spot, index) => (
            <HomeCard key={index} card={spot} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="featured-parkings">
        <h2>How It Works?</h2>
        <div className="parking-list">
          {parkingWorks.map((spot, index) => (
            <HomeCard key={index} card={spot} />
          ))}
        </div>
      </section>

      {/* Parking Benefits */}
      <section className="featured-parkings">
        <h2>Why Choose Our Parking?</h2>
        <div className="parking-list">
          {features.map((spot, index) => (
            <HomeCard key={index} card={spot} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
