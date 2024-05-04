import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/profile");
      setPhotos(data.reverse());
    } catch (error) {
      console.error("Failed to fetch profile photos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully.");
      fetchData();
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={onFormSubmit}>
        <input type="file" name="file" onChange={onChangeHandler} />
        <button type="submit">Upload</button>
      </form>

      {photos.length > 0 && (
        <div>
          <h2>Profile Photos</h2>
          {photos.map((photo, index) => (
            <div key={index}>
              <img
                style={{ width: "200px", height: "250px" }}
                src={`data:${photo.type};base64,${photo.data}`}
                alt="Profile"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
