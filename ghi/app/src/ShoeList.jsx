import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShoeList() {
  const [shoes, setShoes] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/shoes/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes);
    }
  };

  async function DeleteShoe(shoeId) {
    console.log(shoeId);
    const url = `http://localhost:8080/api/shoes/${shoeId}/`;
    const fetchOptions = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="col mb-4">
      <h1 className="text-center mt-2">Need to make a new shoe?</h1>
      <div className="text-center mt-2 mb-4">
        <Link to="/shoes/new" className="btn btn-primary mb-4">
          Click Here
        </Link>
      </div>
      {shoes.length == 0 ? (
        <>
          <h1 className="text-center mt-5">There are no shoes to be displayed</h1>
          <p className="text-center mt-5">Click below to add a shoe</p>
          <div className="text-center">
            <Link className="text-center btn btn-primary" to="/shoes/new">
              Create shoe
            </Link>
          </div>
        </>
      ) : (
        shoes.map((shoe, idx) => {
          return (
            <>
              <div key={idx} className="card m-3 shadow">
                <img src={shoe.picture_url} className="card-img-top" />
                <div className="card-body mt-3">
                  <ul>
                    <li>Manufacturer: {shoe.manufacturer}</li>
                    <li>Model: {shoe.model_name}</li>
                    <li>Color: {shoe.color}</li>
                    <li>Bin: {shoe.bin.import_href}</li>
                  </ul>
                  <button
                    onClick={() => DeleteShoe(shoe.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}

export default ShoeList;

// <h1 className="text-center mt-2">Need to make a new shoe?</h1>
// <div className="text-center mt-2 mb-4">
//   <Link to="/shoes/new" className="btn btn-primary">Click Here</Link>
// </div>
