import React, { useEffect, useState } from 'react';
import './Store.css';
import { toast } from "react-hot-toast";

export default function StoreCards() {
  const [updatedCards, setUpdatedCards] = useState([]);

  // Function to handle the button click
  const redeem = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/awards/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error redeeming award:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/users/awards/not-brought', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if(response.status===400){
            toast.error("Insufficient Balance!Do your Tasks!!")
        }else{
            const data = await response.json();
        

            // Update the cards with the fetched data
            setUpdatedCards(data.notBoughtAwards);
        }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-grid">
      {updatedCards.map((card) => (
        <div key={card._id} className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={card.awardurl} alt="Award" />
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">For: {card.recipient}</p>
            <p className="card-text">
              Coins Required: {card.reqcoin.toLocaleString()} {/* Format the number */}
            </p>
            <button onClick={() => redeem(card._id)} className="btn btn-primary">
              Redeem
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
