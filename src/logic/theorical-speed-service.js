var self = {};
self.revToRad = 2 * Math.PI;
self.minuteToHour = 1 / 60;
self.inchToMilimeter = 25.4;
self.milimeterToKilometer = 1e-6;
self.milimeterToMile = 6.2137e-7;

self.calculateVehicleSpeed = (rpm, gearRatio, finalDrive, tires) => {
  let wheelRadiusMm = self.calculateWheelRadiusMm(tires);
  return rpm / gearRatio / finalDrive * self.revToRad * wheelRadiusMm / self.minuteToHour;
}

self.calculateWheelRadiusMm = (tires) => {
  let rimMm = Number(tires.split("R")[1]) * self.inchToMilimeter;
  let tireWidthMm = Number(tires.split("R")[0].split("/")[0]);
  let tireHeightMm = tireWidthMm * Number(tires.split("R")[0].split("/")[1]) / 100;

  return (rimMm / 2) + tireHeightMm;
}

self.convertMmToMile = (mm) => mm * self.milimeterToMile

self.convertMmToKilometer = (mm) => mm * self.milimeterToKilometer

export default self;