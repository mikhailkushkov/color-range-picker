export default class ColorPicker {
  constructor(domWrapper) {
    this.rangeInput = domWrapper.querySelector(
      ".color-picker-color-range input"
    );
    this.gradientDisplay = domWrapper.querySelector(".color-picker-gradient");
    this.rgbInput = domWrapper.querySelector(".rgb-input");

    //jede Farbe kann max 255 schritte haben

    //hier definieren wir die Farbtöne, diff - ist dynamisch und wird ersetzt durch den slider input
    //Farbton
    this.gradientMap = [
      "rgb(255, DIFF, 0)",
      "rgb(DIFF, 255, 0)",
      "rgb(0, 255, DIFF)",
      "rgb(0, DIFF, 255)",
      "rgb(DIFF, 0, 255)",
      "rgb(255, 0, DIFF)",
    ];

    //Farbton
    this.currentHue = "rgb(155, 0, 0)";

    this.registerHandlers();
  }

  registerHandlers() {
    this.rangeInput.addEventListener("input", (e) =>
      this.selectHue(e.target.value)
    );
  }

  //value - eine Zahl wo der Slider sich gerade befindet
  selectHue(value) {
    value = parseInt(value);

    //macht komma weg
    //255 - maximale wert in farbspektrum
    //in welchem farbton sind wir?
    const currentRangeStepIndex = Math.floor(value / 255);

    //in welchem schritt in farbton sind wir
    let currentStepValue = value - 255 * currentRangeStepIndex;

    //gerade zahl oder nicht gerade
    if (currentRangeStepIndex % 2 !== 0) {
      currentStepValue = 255 - currentStepValue;
    }

    this.currentHue = this.gradientMap[currentRangeStepIndex].replace(
      "DIFF",
      currentStepValue
    );
    this.render();
  }

  render() {
    this.gradientDisplay.style.backgroundImage = `linear-gradient(rgba(0,0,0,0),#000),linear-gradient(90deg,#fff, ${this.currentHue})`;
    this.rgbInput.value = this.currentHue;
    this.rgbInput.style.color = this.rgbInput.value;
  }
}

//TODO: statt DIFF einen canvas zu holen, und in einem canvas kann man die Farbe mit Koordinaten holen
