import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';



  export default Chkbx = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    if (toggleCheckBox) {
      //console.log(toggleCheckBox)
    }

    return(
  <CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
  />
    );
  };