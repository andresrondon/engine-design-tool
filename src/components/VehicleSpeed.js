import React from 'react';
import service from './../logic/theorical-speed-service';

// @TODO: Convert to React dataflow
class VehicleSpeed extends React.Component {
  gears = [];
  
  calculateSpeed() {
    let rpm = Number(document.getElementById('rpm').value);
    let gearRatio = Number(document.getElementsByClassName('selected-gear')[0].value);
    let finalDrive = Number(document.getElementById('final-drive').value);
    let tires = document.getElementById('tires').value;
    var speedInMm = service.calculateVehicleSpeed(rpm, gearRatio, finalDrive, tires);

    document.getElementById('result-kmph').innerHTML = Math.round(service.convertMmToKilometer(speedInMm));
    document.getElementById('result-mph').innerHTML = Math.round(service.convertMmToMile(speedInMm));
	}

	addGear() {
		var gear = { id: this.gears.length + 1, ratio: 1 };
		this.gears.push(gear);

		var element = createGearElement(gear);
		element.onclick = selectGear;
		document.getElementById('gears').appendChild(element);
	}

	createGearElement(gear) {
		let html = `<div class="gear-slot"><label>${gear.id}</label><input id="${gear.id}" value="${gear.ratio}">:1</div>`;
		var template = document.createElement('template');
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}

	selectGear() {
		let className = 'selected-gear';
		if (document.getElementsByClassName(className)[0])
			document.getElementsByClassName(className)[0].classList.remove(className);

		this.childNodes[1].classList.add(className);
		calculateSpeed();
	}

  render() {
    return (
      <div>
        <div>
          <label>Engine RPM</label>
          Max RPM <input id="max-rpm" placeholder="Redline" type="number" value="7000" />
          <input id="rpm" type="range" min="0" max="7000" value="1000" step="10" /> <span id="rpm-display">1000</span> RPM
        </div>
        <div>
          <label>Transmission Gears</label>
          <div id="gears">
            <div id="add-gear">
              <label>+</label>
            </div>
          </div>
        </div>
        <div>
          <label>Final Drive (differential)</label>
          <input id="final-drive" type="number" step="0.1" />:1
        </div>
        <div>
          <label>Tires (example: "195/50R15")</label>
          <input id="tires" />
        </div>
        <div>
          <p><span readonly id="result-kmph"></span> km/h</p>
          <p><span readonly id="result-mph"></span> mph</p>
        </div>
      </div>
    );
  }
}

export default VehicleSpeed;