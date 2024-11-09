import React, { useState, useEffect, useRef } from 'react';
import './Slider.css'; // Import the corresponding CSS file

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef([]);
  const lastIndex = 2; // Since there are 3 items
  const [quote,setQuote] = useState('INSPIRATION COMES FROM WITHIN YOURSELF,WHEN YOUR POSITIVE GOOD THINGS HAPPEN')

  const items = [
    { image: '/img/1.jpg', heading: 'NEVER', text: quote },
    { image: '/img/2.jpg', heading: 'GIVE', text: quote },
    { image: '/img/3.jpg', heading: 'UP', text: quote }
  ];

  useEffect(() => {
    const setDiameter = () => {
      const slider = document.querySelector('.slider');
      const widthSlider = slider.offsetWidth;
      const heightSlider = slider.offsetHeight;
      const diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
      document.documentElement.style.setProperty('--diameter', `${diameter}px`);
    };

    setDiameter();
    window.addEventListener('resize', setDiameter);

    return () => {
      window.removeEventListener('resize', setDiameter);
    };
  }, []);

  const nextSlide = async () => {
    if (activeIndex < lastIndex) {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',{
            headers: {
              'X-Api-Key': '2ERx9eJDbp7h6L7HQS1B6g==Exfj6295KZBUv4V3'
            },
        }
    )
    
      const data = await response.json()
      setQuote( data[0].quote)
      setActiveIndex(prevIndex => prevIndex + 1);
    }
  };

  const prevSlide = async () => {
    if (activeIndex > 0) {
      
     
      const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',{
        headers: {
          'X-Api-Key': '2ERx9eJDbp7h6L7HQS1B6g==Exfj6295KZBUv4V3'
        },
    }
)

  const data = await response.json()
  setQuote( data[0].quote)
  setActiveIndex(prevIndex => prevIndex - 1);
     


    }
    };

  return (
    <main>
      <header>
        <figure className="logo">
          <img src="https://images.sftcdn.net/images/t_app-icon-m/p/d0a16856-0924-4a75-b623-865833e542db/1706903944/moodmate-share-with-friends-logo" alt="Logo" />
        </figure>
       
      </header>
      <section className="slider">
        <div className="list">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`item ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="image" style={{ '--url': `url(${item.image})` }}></div>
              <div className="content">
                <h2>{item.heading}</h2>
                <p>{item.text}</p>
                
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button id="prev" onClick={prevSlide} className={activeIndex === 0 ? 'd-none' : ''}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
            </svg>
          </button>
          <button id="next" onClick={nextSlide} className={activeIndex === lastIndex ? 'd-none' : ''}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Slider;
