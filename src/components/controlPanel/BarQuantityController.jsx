import styled from 'styled-components';
import { useState, useContext } from 'react';
import PaletteContext from '../../store/palette-context';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: var(--defaultDark);
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const BarQuantityController = () => {
  const [barsQuantity, setBarsQuantity] = useState(5);

  const ctx = useContext(PaletteContext);

  const handleQuantityChange = event => {
    setBarsQuantity(event.target.value);
    ctx.updateColorBarsQuantity(barsQuantity);
  };

  return (
    <InputWrapper>
      <label htmlFor='bar-quantity'>Quantity of color bars</label>
      <input
        type='range'
        id='bar-quantity'
        step='1'
        min='1'
        max='10'
        defaultValue={barsQuantity}
        onChange={handleQuantityChange}
      />
      <p>{barsQuantity}</p>
    </InputWrapper>
  );
};

export default BarQuantityController;
