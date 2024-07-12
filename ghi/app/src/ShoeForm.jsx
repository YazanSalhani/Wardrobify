import { useState, useEffect } from "react";

function ShoeForm() {
  const [bins, setBins] = useState([]);
  
  const fetchData = async () => {
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }
  }
  
  const [manufacturer, setManufacturer] = useState('');
  function handleManufacturerChange(event) {
    const value = event.target.value;
    setManufacturer(value);
  }
  
  const [modelName, setModelName] = useState('');
  function handleModelNameChange(event) {
    const value = event.target.value;
    setModelName(value);
  }
  
  const [color, setColor] = useState('');
  function handleColorChange(event) {
    const value = event.target.value;
    setColor(value);
  }
  
  const [pictureUrl, setPictureUrl] = useState('');
  function handlePictureUrlChange(event) {
    const value = event.target.value;
    setPictureUrl(value);
  }
  
  const [bin, setBin] = useState('');
  function handleBinsChange(event) {
    const value = event.target.value;
    setBin(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.manufacturer = manufacturer;
    data.model_name = modelName;
    data.color = color;
    data.picture_url = pictureUrl;
    data.bin = `/api/bins/${bin}/`;

    const shoeUrl = 'http://localhost:8080/api/shoes/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    try {
      const response = await fetch(shoeUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();

        setManufacturer('');
        setModelName('');
        setColor('');
        setPictureUrl('');
        setBin('');
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch(error) {
      console.error('Fetch error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Shoe</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="form-floating mb-3">
            <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" required type="text" id="manufacturer" className="form-control" />
            <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={handleModelNameChange} value={modelName} placeholder="Model Name" required type="text" id="model-name" className="form-control" />
            <label htmlFor="model_name">Model</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" id="color" className="form-control" />
            <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture Url" required type="text" id="picture-url" className="form-control" />
            <label htmlFor="picture_url">Picture Url</label>
            </div>
            <div className="mb-3">
              <select onChange={handleBinsChange} value={bin} required name="bin" id="bin" className="form-select">
                <option value="">Choose a Bin</option>
                {bins.map(bin => {
                  return (
                    <option key={bin.id} value={bin.id}>
                      {bin.bin_number}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShoeForm;
