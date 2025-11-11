import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";

function Detect() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [predClass, setPredClass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPredClass("");
    setError("");

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select an image file to upload.");
      return;
    }
    setLoading(true);
    setError("");
    setPredClass("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/image-detection", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPredClass(response.data.detected_class);
    } catch (err) {
      setError("Failed to upload image or get response.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 500, margin: "auto", padding: "20px", textAlign: "center" }}>
        <h2>Trash Image Detection</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <br />
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 15,
              padding: "10px 20px",
              backgroundColor: "#43a047",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2e7d32")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#43a047")}
          >
            {loading ? "Detecting..." : "Detect Trash Type"}
          </button>
        </form>

        {previewUrl && (
          <div style={{ marginTop: 20 }}>
            <h4>Uploaded Image:</h4>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        )}

        {predClass && (
          <div
            style={{
              marginTop: 20,
              backgroundColor: "#e8f5e9",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #43a047",
              display: "inline-block",
            }}
          >
            <strong>Detected Class:</strong> {predClass}
          </div>
        )}

        {error && (
          <div style={{ marginTop: 20, color: "red" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detect;
