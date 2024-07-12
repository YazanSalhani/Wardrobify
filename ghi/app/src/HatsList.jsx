import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function HatsList(){
    const [hats, setHats] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/hats/";

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setHats(data.hats)
            }
        }
        catch(e) {
            console.error(e)
        }
    }

    async function hatDelete(id){
        const hatUrl = `http://localhost:8090/api/hats/${id}/`;

        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(hatUrl, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="col">
            {hats.length == 0 ?
            <>
                <h1 className="text-center mt-5">"NO HATS!!"</h1>
                <p className="text-center mt-5">Click the button below to add a HAT</p>
                <div className="text-center">
                    <Link className="text-center mt-5 btn btn-primary" to="/hats/new">Create HAT</Link>
                </div>
            </> : hats.map((hat) => {
                    return (
                        <div key={hat.href} className="card mb-3 shadow">
                        <img
                            src={hat.picture_url}
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <ul>
                                <li>Fabric: {hat.fabric}</li>
                                <li>Style: {hat.style}</li>
                                <li>Color: {hat.color}</li>
                                <li>Location:{hat.location.import_href}</li>
                            </ul>
                            <button onClick={() => hatDelete(hat.id)} type="button" className="btn btn-danger">Delete</button>
                        </div>
                        </div>
                    );
                    })}
                </div>
            );
}
export default HatsList;
