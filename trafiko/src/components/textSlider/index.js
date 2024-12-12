import { CleanedDataForTextSliderFromTheApiCall } from "./apiCall-textSlider.js";
import {TextSliderCanvas} from "./canvas.js";

export default document.addEventListener('DOMContentLoaded', () => {
    // Crea el canvas directamente en el body
    const textSlider = new TextSliderCanvas(CleanedDataForTextSliderFromTheApiCall, {
        height: 50,
        backgroundColor: 'rgba(0,0,0,1)',
        fontSize: 17,
        speed: 0.8,
    });
});