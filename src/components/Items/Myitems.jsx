import React, { useEffect, useState } from 'react';
import './Myitems.css';

export default function MyCards() {
  // Array containing card data
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/users/awards/brought', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        const data = await response.json();
        console.log(data);

        // Update the cards with the fetched data
        setCardData(data.awards)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="card-grid">
      {cardData.map((card, index) => (
        <div key={index} className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={card.awardurl} alt="Award" />
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">Recipient: {card.recipient}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
