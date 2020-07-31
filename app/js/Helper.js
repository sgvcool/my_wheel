export { Helper }

class Helper{
  
  createTextTexture(textValue, posX, posY) {
    var basicText = new PIXI.Text(textValue, { fill: "white" });
    basicText.anchor.set(0.5, 0.5);
    basicText.position.set(posX, posY);
  
    return basicText;
  }
  
  getWheelNumberText(textValue, posX, posY, rotation) {
    var numText = new PIXI.Text(textValue, { fill: "black" });
    numText.anchor.set(0.5, 0.5);
    numText.position.set(posX, posY);
    numText.rotation = rotation + Math.PI / 2;
  
    return numText;
  }
  
  degToRadians(deg) {
    return deg * (Math.PI / 180);
  }
}