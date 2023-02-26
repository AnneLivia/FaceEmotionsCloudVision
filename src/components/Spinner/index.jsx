import { RiseLoader } from 'react-spinners';

const CustomSpinner = ({ color, loading }) => (
  <RiseLoader
    color={color}
    size={10}
    loading
    style={{ visibility: loading ? 'visible' : 'hidden' }}
  />
);

export default CustomSpinner;
