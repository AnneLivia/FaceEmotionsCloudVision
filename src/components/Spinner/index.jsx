import { BeatLoader } from 'react-spinners';

const CustomSpinner = ({ color, loading }) => (
  <BeatLoader
    color={color}
    size={10}
    loading
    style={{ visibility: loading ? 'visible' : 'hidden' }}
  />
);

export default CustomSpinner;
