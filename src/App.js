import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Select from "./component/Select";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import breed from "./breed.json";
import ReactStars from 'react-stars'

function App() {
  const [cat, setCat] = useState("abys");

  const [item, setItem] = useState([]);
  const getCatData = async () => {
    const key=process.env.API_KEY_CAT
    
    const url = `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${cat}&api_key=${key}&has_breeds=1`;

    try {
      const { data } = await axios.get(url);
      setItem(data);
    } catch (err) {
      console.log("Hata oluştu:" + err);
    }
  };

  useEffect(() => {
    getCatData();
  }, [cat]);
  console.log(breed);
  console.log(cat);
  return (
    <div className="App">
      
      <Carousel className="" showThumbs={false} width={1000} infiniteLoop={true}>
        {item.map((item, index) => (
          <div className="coursel" key={index}>
            <img className="cat-img" src={item.url}></img>
            {breed.map((br, id) => {
              if (br.id === cat) {
                return (
                  <div className="cat-description" key={id}>
                    {br.description}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </Carousel>
      <Select cat={cat} setCat={setCat} item={item}></Select>
      <div className="list">
        {breed.map((br, id) => {
          if (br.id === cat) {
            return (
              <div className="cat-description" key={id}>
                {br.temperament.split(',').map((tem,id)=>{
                  return <li className="list-cat-temperament" key={id}><ReactStars value={3} char="❤" color1="rgba(248, 130, 130, 0.2)" color2="rgba(255,0,0)"></ReactStars>{tem}</li>
                })}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
