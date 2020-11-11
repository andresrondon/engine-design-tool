import React from 'react';
import service from './../logic/engine-design-service';

// @TODO: Convert to React dataflow
class NominalTorque extends React.Component {
  infoText = `Modern gasoline engines have a maximum thermal efficiency of about 20% to 35% when used to power a car. 
  In other words, even when the engine is operating at its point of maximum thermal efficiency, 
  of the total heat energy released by the gasoline consumed, about 65-80% of total power is emitted as heat 
  without being turned into useful work, i.e. turning the crankshaft. Approximately half of this rejected heat 
  is carried away by the exhaust gases, and half passes through the cylinder walls or cylinder head into the 
  engine cooling system, and is passed to the atmosphere via the cooling system radiator. Some of the work 
  generated is also lost as friction, noise, air turbulence, and work used to turn engine equipment and appliances 
  such as water and oil pumps and the electrical generator, leaving only about 20-35% of the energy released by 
  the fuel consumed available to move the vehicle.`;

  teInfoText = `As a general rule of thumb, the thermal efficiency of an internal combustion engine will be proportional to its compression ratio. 
  Also, more cylinders will increase friction loss, thus reducing efficiency.`;

  calculateNominalTorque() {
		let bore = 0, stroke = 0, cylinders = 0, thermalEfficiency = service.averageThermalEfficiency;
		bore = parseFloat(document.getElementById('bore').value);
		stroke = parseFloat(document.getElementById('stroke').value);
		cylinders = parseInt(document.getElementById('cylinders').value);
		boost = parseFloat(document.getElementById('boost').value);
		thermalEfficiency = parseFloat(document.getElementById('thermal-efficiency').value) / 100; // percentage

		let engineDisplacement = service.calculateDisplacement(bore, stroke, cylinders);
		let torquePotential = service.calculateNominalTorquePerRevolution(engineDisplacement, boost, thermalEfficiency);

		document.getElementById('torque-potential').innerHTML = torquePotential.toFixed(1);
	}

  render() {
    return (
      <div>
        <p>
          This calculates a nominal torque value per revolution of the crankshaft considering the following: 
          <ul>
            <li>The total volume of the cylinders in each power stroke per revolution in a 4-stroke engine.</li> 
            <li>The boost in intake preassure.</li> 
            <li>An estimated average thermal efficiency.</li>
          </ul>
        </p>
        <label>Bore</label><input type="text" value="0" id="bore" /><br />
        <label>Stroke</label><input type="text" value="0" id="stroke" /><br />
        <label>Cylinders</label><input type="text" value="4" id="cylinders" /><br />
        <label>Boost in psi</label><input type="text" value="0" id="boost" /><br />
        <label>Thermal efficiency</label><input id="thermal-efficiency" type="range" min="20" max="35" value="27.5" step="0.1" /> <span id="thermal-efficiency-display">27.5</span>%<br />
        <p>{this.teInfoText}</p>
        <h3><span id="torque-potential">0.0</span> nominal Torque per Rev</h3>
        <p>{this.infoText}</p>
      </div>
    );
  }
}

export default NominalTorque;