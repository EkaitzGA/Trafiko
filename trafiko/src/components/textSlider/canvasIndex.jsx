import TextSlider from './canvas';
import { CleanedDataForTextSliderFromTheApiCall } from './apiCall-textSlider';

function canvasIndex() {
  const options = {
    height: 50,
    backgroundColor: 'rgba(0,0,0,1)',
    fontSize: 17,
    speed: 0.8,
  };

  return (
    <TextSlider 
      apiDataFunction={CleanedDataForTextSliderFromTheApiCall}
      options={options}
    />
  );
}

export default canvasIndex