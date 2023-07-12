import React from "react";
import breed from "../breed.json";
function Select({setCat}) {
    
  return (
    <div className="selectArea">
      <select onChange={(e) => setCat(e.target.value)}>
        {breed.map((catBreed, index) => {
          return (
            <option key={index} value={catBreed.id}>
              {catBreed.name}
            </option>
          );
        })}
      </select>
      
    </div>
  );
}

export default Select;
