import React from "react";

export default function Card() {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src="https://gifdb.com/images/high/animated-cat-gif-file-2384kb-yl5va57ikcmp8wm7.gif"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
