String.prototype.toCamelCase = function () {
  return this.charAt(0).toLowerCase() + this.slice(1).replace(/\s/g, '');
}