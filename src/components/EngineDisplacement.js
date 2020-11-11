import React from 'react'
import service from './../logic/engine-design-service';

// @TODO: Convert to React dataflow
class EngineDisplacement extends React.Component {
  calculateDisplacement() {
		let bore = 0, stroke = 0, cylinders = 0;
		bore = Number(document.getElementById('bore').value);
		stroke = Number(document.getElementById('stroke').value);
		cylinders = Number(document.getElementById('cylinders').value);

		let displacement = service.calculateDisplacement(bore, stroke, cylinders);

		document.getElementById('displacement-liters').innerHTML = (displacement / 1000).toFixed(1);
		document.getElementById('displacement-cc').innerHTML = displacement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  render() {
    return (
      <div>
        <label>Bore</label><input type="text" value="0" id="bore" /><br />
        <label>Stroke</label><input type="text" value="0" id="stroke" /><br />
        <label>Cylinders</label><input type="text" value="4" id="cylinders" />
        <button id="calculate">Calculate</button>
        <h3><span id="displacement-liters">0.0</span> L</h3>
        <h4><span id="displacement-cc">0</span> cc</h4>
      </div>
    );
  }
}

export default EngineDisplacement;