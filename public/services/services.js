var services = {}

services.fileService = (function () {
    var self = {};

    self.getServerFile = function (fileName, callback) {
        var client = new XMLHttpRequest();
        client.open('GET', '/' + fileName);
        client.onreadystatechange = function () {
            callback(client.responseText);
        }
        client.send();
    }

    return self;
})();

services.engineDesignService = (function () {
    var self = {};
    self.psiToAtmospheres = 0.068046;
    self.averageThermalEfficiency = 0.275;
    /* self.kgPerCcOfAir = 1.292917e-6;
    //self.kgPerCcOfGasoline= 7.489e-4;
    self.joulesPerKgOfGasoline = 46.7e+6;
    //self.joulesPerCcOfGasoline = 31773.67;
    self.idealAirFuelRatio = 14.7; // 14.7:1
    self.maxPowerAirFuelRatio = 12.6; // 12.6:1
    //self.oxygenInAir = 0.20946; */

    self.calculateDisplacement = function (bore, stroke, numberOfCylinders) {
        return Math.round(Math.PI * bore * bore * stroke / 4 * numberOfCylinders / 1000);
    }

    self.calculateNominalTorquePerRevolution = function (engineDisplacement, boostInPsi, thermalEfficiency, airFuelRatio) {
        thermalEfficiency = thermalEfficiency || self.averageThermalEfficiency;
        //airFuelRatio = airFuelRatio || self.idealAirFuelRatio;
        
        let netAtmospheres = boostInPsi * self.psiToAtmospheres + 1;
        let powerStrokesPerRevPerCylinder = 1 / 2; // In a 4-stroke engine.
        let nominalValue = engineDisplacement * powerStrokesPerRevPerCylinder * netAtmospheres * thermalEfficiency

        return nominalValue;
        //return self.convertJoulesInStrokeToNmOfTorque(self.calculateJoules(engineDisplacement / 2 * netAtmospheres, airFuelRatio)) * thermalEfficiency;
    }

    /*self.convertJoulesInStrokeToNmOfTorque = function (joules) {
        return joules * Math.PI;
    }*/

    /*self.calculateJoules = function (airVolume, airFuelRatio) {
        let massOfAir = airVolume * 0.8 * self.kgPerCcOfAir;
        let massOfGasoline = massOfAir / airFuelRatio;
        return massOfGasoline * self.joulesPerKgOfGasoline;
    }*/

    return self;
})();

services.theoricalSpeedService = (function () {
    var self = {};
    self.revToRad = 2 * Math.PI;
    self.minuteToHour = 1 / 60;
    self.inchToMilimeter = 25.4;
    self.milimeterToKilometer = 1e-6;
    self.milimeterToMile = 6.2137e-7;

    self.calculateVehicleSpeed = function (rpm, gearRatio, finalDrive, tires) {
        let wheelRadiusMm = self.calculateWheelRadiusMm(tires);        
        return rpm / gearRatio / finalDrive * self.revToRad * wheelRadiusMm / self.minuteToHour;
    }

    self.calculateWheelRadiusMm = function (tires) {
        let rimMm = Number(tires.split("R")[1]) * self.inchToMilimeter;
        let tireWidthMm = Number(tires.split("R")[0].split("/")[0]);
        let tireHeightMm = tireWidthMm * Number(tires.split("R")[0].split("/")[1]) / 100;
        
        return (rimMm / 2) + tireHeightMm;
    }

    self.convertMmToMile = function (mm) {
        return mm * self.milimeterToMile;
    }

    self.convertMmToKilometer = function (mm) {
        return mm * self.milimeterToKilometer;
    }

    return self;
})();

String.prototype.toCamelCase = function () {
    return this.charAt(0).toLowerCase() + this.slice(1).replace(/\s/g, '');
}