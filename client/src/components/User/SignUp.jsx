import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./SignUp.css";
import API_URL from "../../config/api";

const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isSignUpState, setIsSignUpState] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    photo: "",
  });

  useEffect(() => {
    if (user == null) return;
    navigate("/user/profile");
  }, [user, navigate]);

  const uploadImage = async () => {
    if (!imageFile) {
      throw new Error("No image selected");
    }

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "ParkEase");
    data.append("folder", "Parking");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhj0i3rr1/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error?.message || "Image upload failed");
    }

    return result.secure_url;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUpState) {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const payload = {
        ...formData,
        photo: imageUrl,
      };

      try {
        const response = await axios.post(`${API_URL}/user/signup`, payload, {
          withCredentials: true,
        });

        setUser(response.data.user);

        alert("User Created Successfully");
        navigate("/user/login");
      } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        alert(
          `Signup failed: ${
            error.response?.data.message || error.message.message
          }`,
        );
      }
    } else {
      try {
        const response = await axios.post(`${API_URL}/user/login`, formData, {
          withCredentials: true,
        });
        setUser(response.data.user);
        alert("Login Successful");
        navigate("/parkings");
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        alert(
          error.response?.data?.message || "Login failed. Please try again.",
        );
      }
    }
  };

  return (
    <div className="sign-up-page">
      <h2 className="sign-up-heading">
        {isSignUpState ? "Sign Up" : "Log In"} to ParkEase
      </h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="inputSection">
          <label htmlFor="email" className="input-label">
            Enter E-mail
          </label>
          <input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="sign-up-input"
            required
            autoComplete="email"
          />
        </div>

        <div className="inputSection">
          <label htmlFor="password" className="input-label">
            Enter Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="sign-up-input"
            required
            autoComplete="password"
          />
        </div>

        {isSignUpState && (
          <>
            <div className="inputSection">
              <label htmlFor="name" className="input-label">
                Enter User Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="sign-up-input"
                required
                autoComplete="name"
              />
            </div>

            <div className="inputSection">
              {/* New field for photo */}
              <label htmlFor="photo" className="input-label">
                Profile Photo URL
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                name="photo"
                className="sign-up-input"
                required
              />
            </div>
          </>
        )}

        <div className="buttonSection">
          <button type="submit" className="sign-up-btn">
            {isSignUpState ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>

      <div className="sign-up">
        Or
        <p onClick={(e) => setIsSignUpState(!isSignUpState)}>
          {isSignUpState ? "have an account" : "create a new account"}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
