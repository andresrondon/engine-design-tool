var self = {};
self.psiToAtmospheres = 0.068046;
self.averageThermalEfficiency = 0.275;

self.calculateDisplacement = (bore, stroke, numberOfCylinders) => 
    Math.round(Math.PI * bore * bore * stroke / 4 * numberOfCylinders / 1000)

self.calculateNominalTorquePerRevolution = (engineDisplacement, boostInPsi, thermalEfficiency) => {
    thermalEfficiency = thermalEfficiency || self.averageThermalEfficiency;

    let netAtmospheres = boostInPsi * self.psiToAtmospheres + 1;
    let powerStrokesPerRevPerCylinder = 1 / 2; // In a 4-stroke engine.
    let nominalValue = engineDisplacement * powerStrokesPerRevPerCylinder * netAtmospheres * thermalEfficiency;

    return nominalValue;
}

export default self;