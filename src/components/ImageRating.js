import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingBar from './RatingBar';

const ImageRating = () => {
  
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noiseRating, setNoiseRating] = useState(null);
  const [abstractRating, setAbstractRating] = useState(null);

  const currentImageId = gallery[currentIndex];
  const currentImageSrc = `/data/${currentImageId}.jpg`;

  const fetchGallery = async () => {
    try {
      const response = await axios.get('http://34.165.95.161:8000/search');
      setGallery(response.data); 
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchGallery(); 
  }, []);

  const handleSave = async () => {
    if (!noiseRating || !abstractRating) {
      alert('יש לדרג את שני המדדים לפני שמירה.');
      return;
    }

    const data = {
      image_id: currentImageId.toString(),
      noisy: noiseRating,
      abstract: abstractRating
    };

    try {
      const response = await axios.post('http://34.165.95.161:8000/insert', data);
      console.log(response.data); // אם תקבל true, אז הנתונים נשמרו בהצלחה
    } catch (error) {
      console.error('Error saving data:', error);
    }

    setNoiseRating(null);
    setAbstractRating(null);

    if (currentIndex < gallery.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('סיימת לדרג את כל התמונות!');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>דרג תמונה</h2>
      {gallery.length > 0 && (
        <img
          src={currentImageSrc}
          alt={`Image ${currentImageId}`}
          style={{
            maxWidth: '500px',
            width: '100%',
            height: 'auto',
            maxHeight: '500px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        />
      )}

      <RatingBar label="רעש" value={noiseRating} onChange={setNoiseRating} />
      <RatingBar label="אבסטרקטיות" value={abstractRating} onChange={setAbstractRating} />

      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '30px'
        }}
      >
        שמור והמשך
      </button>
    </div>
  );
};

export default ImageRating;
