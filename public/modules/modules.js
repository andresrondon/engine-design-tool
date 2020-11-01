var modules = {};

modules.navModule = (function () {
	var self = {};

	self.navItems = [];

	self.getNav = new Promise((resolve, reject) => {
		setTimeout(() => {
			self.navItems.push('Engine Displacement');
			self.navItems.push('Nominal Torque');
			self.navItems.push('Theorical Speed');
			// TODO: Calculate BMEP - Brake Mean Effective Preassure
			self.navItems.push('About');
			resolve();
		}, 250);
	})

	self.setNav = function () {
		let target = document.getElementsByTagName('nav')[0];
		for (let item of self.navItems) {
			let el = document.createElement('button');
			el.innerText = item
			el.onclick = () => { self.navigateToPage(item) };
			target.appendChild(el);
		}
	}

	self.navigateToPage = function (pageName) {
		services.fileService.getServerFile(pageName.toCamelCase() + '.html', content => {
			document.getElementById('title').innerHTML = pageName;
			document.getElementById('content').innerHTML = content;
			setTimeout(() => { modules[pageName.toCamelCase() + 'Module'].init(); }, 1);
		})
	}

	self.init = function () {
		self.getNav.then(self.setNav);
	}

	return self;
})()

modules.engineDisplacementModule = (function () {
	var self = {};
	var service = services.engineDesignService;

	self.calculateDisplacement = function () {
		let bore = 0, stroke = 0, cylinders = 0;
		bore = Number(document.getElementById('bore').value);
		stroke = Number(document.getElementById('stroke').value);
		cylinders = Number(document.getElementById('cylinders').value);

		let displacement = service.calculateDisplacement(bore, stroke, cylinders);

		document.getElementById('displacement-liters').innerHTML = (displacement / 1000).toFixed(1);
		document.getElementById('displacement-cc').innerHTML = displacement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	self.init = function () {
		document.getElementById('calculate').onclick = self.calculateDisplacement;
	}

	return self;
})();

modules.nominalTorqueModule = (function () {
	var self = {};
	var service = services.engineDesignService;

	self.calculateNominalTorque = function () {
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

	self.init = function () {
		for (let element of document.getElementsByTagName('input')) {
			element.oninput = self.calculateNominalTorque;
		}

		document.getElementById('thermal-efficiency').oninput = (event) => {
			document.getElementById('thermal-efficiency-display').innerHTML = event.target.value;
			self.calculateNominalTorque();
		};
		
	}

	return self;
})();

modules.theoricalSpeedModule = (function () {
	var self = {};
	var service = services.theoricalSpeedService;

	
	self.init = function () {
		self.gears = [];
		for (let element of document.getElementsByTagName('input')) {
			element.oninput = self.calculateSpeed;
		}

		document.getElementById('rpm').oninput = (event) => {
			document.getElementById('rpm-display').innerHTML = event.target.value;
			self.calculateSpeed();
		};

		document.getElementById('add-gear').onclick = self.addGear;

		document.getElementById('max-rpm').onchange = (event) => {
			document.getElementById('rpm').max = event.target.value;
		}
	}

	self.calculateSpeed = function () {
		try {
			let rpm = Number(document.getElementById('rpm').value);
			let gearRatio = Number(document.getElementsByClassName('selected-gear')[0].value);
			let finalDrive = Number(document.getElementById('final-drive').value);
			let tires = document.getElementById('tires').value;
			var speedInMm = service.calculateVehicleSpeed(rpm, gearRatio, finalDrive, tires);

			document.getElementById('result-kmph').innerHTML = Math.round(service.convertMmToKilometer(speedInMm));
			document.getElementById('result-mph').innerHTML = Math.round(service.convertMmToMile(speedInMm));
		} catch (e) {

		}
	}

	self.addGear = function () {
		var gear = { id: self.gears.length + 1, ratio: 1 };
		self.gears.push(gear);

		var element = self.createGearElement(gear);
		element.onclick = self.selectGear;
		document.getElementById('gears').appendChild(element);
	}

	self.createGearElement = function (gear) {
		let html = `<div class="gear-slot"><label>${gear.id}</label><input id="${gear.id}" value="${gear.ratio}">:1</div>`;
		var template = document.createElement('template');
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}

	self.selectGear = function () {
		let className = 'selected-gear';
		if (document.getElementsByClassName(className)[0])
			document.getElementsByClassName(className)[0].classList.remove(className);

		this.childNodes[1].classList.add(className);
		self.calculateSpeed();
	}

	return self;
})();

modules.aboutModule = (function () {
	var self = {};

	self.init = function () { }

	return self;
})();