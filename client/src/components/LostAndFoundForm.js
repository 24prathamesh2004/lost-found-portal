import React, { useState, useEffect } from "react";
import "./LostAndFoundForm.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";

const Base_URL = config.baseURL;

function LostAndFoundForm() {
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [concerntype, setConcernType] = useState("lost");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("No authentication token found");
          return;
        }

        const decodedToken = jwtDecode(authToken);
        const id = decodedToken.id || decodedToken.userId || decodedToken.sub;
        setUserId(id);

        const response = await axios.get(`${Base_URL}/fetchuser/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        console.log("User fetch success:", response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const convertToBase64 = (e) => {
    const files = Array.from(e.target.files);

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((imageData) => {
        setImages([...images, ...imageData]);
      })
      .catch((error) => {
        console.error("Error reading images:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      itemname: name,
      itemdescription: description,
      concerntype: concerntype,
      images: images,
    };

    try {
      const response = await axios.post(`${Base_URL}/item/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Item has been added successfully");

      setName("");
      setDescription("");
      setConcernType("lost");
      setImages([]);

      navigate("/my-items/");
    } catch (error) {
      console.error("Error submitting item:", error);
      if (error.response?.data?.errors) {
        alert("Error: " + error.response.data.errors.map(e => e.msg).join(", "));
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="lost-and-found-form">
        <h2>Report Lost or Found Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemname">Item Name:</label>
            <input
              type="text"
              id="itemname"
              name="itemname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemdescription">Item Description:</label>
            <textarea
              id="itemdescription"
              name="itemdescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="concerntype">Concern Type:</label>
            <select
              id="concerntype"
              name="concerntype"
              value={concerntype}
              onChange={(e) => setConcernType(e.target.value)}
              className="form-group1"
              style={{ maxWidth: "105%" }}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="proofPhotos">Proof Photos:</label>
            <input
              type="file"
              id="proofPhotos"
              name="proofPhotos"
              accept="image/*"
              multiple
              onChange={convertToBase64}
            />
            {images.length > 0 && (
              <>
                <b>Preview:</b>
                <div className="image-preview">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      width={100}
                      height={100}
                      src={img}
                      alt={`Preview ${index}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LostAndFoundForm;
