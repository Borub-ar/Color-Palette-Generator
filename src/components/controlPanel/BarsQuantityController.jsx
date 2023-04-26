import { useState, useContext } from 'react';
import styled from 'styled-components';

import PaletteContext from '../../store/palette-context';
import device from '../../breakpoints/breakpoints';

const MAX_BARS = 8;
const MIN_BARS = 2;
const STEP = 1;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & :is(label, p) {
    color: var(--default-dark);
    font-weight: 700;
  }

  label {
    font-weight: 700;
    font-size: 1.2rem;
  }

  p {
    font-size: 1.5rem;
  }

  input {
    height: 21px;
    appearance: none;
    margin: 10px 0;
    width: clamp(15rem, 30vw, 40rem);
  }

  input:focus {
    outline: none;
  }

  input::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: #616161;
    border-radius: 5px;
  }

  input::-webkit-slider-thumb {
    height: 15px;
    width: 61px;
    border-radius: 50px;
    background: var(--main-blue);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4px;
  }

  input:focus::-webkit-slider-runnable-track {
    background: #616161;
  }

  input::-moz-range-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: #616161;
    border-radius: 5px;
  }

  input::-moz-range-thumb {
    height: 15px;
    width: 41px;
    border-radius: 50px;
    background: var(--main-blue);
    cursor: pointer;
  }

  input::-ms-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input::-ms-fill-lower {
    background: #616161;
    border-radius: 10px;
  }

  input::-ms-fill-upper {
    background: #616161;
    border-radius: 10px;
  }

  input::-ms-thumb {
    margin-top: 1px;
    height: 15px;
    width: 41px;
    border-radius: 50px;
    background: var(--main-blue);
    cursor: pointer;
  }

  input:focus::-ms-fill-lower {
    background: #616161;
  }

  input:focus::-ms-fill-upper {
    background: #616161;
  }

  @media ${device.mobile} {
    p {
      font-size: 1.2rem;
    }
  }
`;

const BarQuantityController = () => {
  const [barsQuantity, setBarsQuantity] = useState(5);
  const { updateColorBarsQuantity } = useContext(PaletteContext);

  const handleQuantityChange = event => {
    const numberOfBars = event.target.value;
    updateColorBarsQuantity(numberOfBars);
    setBarsQuantity(numberOfBars);
  };

  return (
    <InputWrapper>
      <label htmlFor='bar-quantity'>Color Bars</label>
      <input
        type='range'
        id='bar-quantity'
        step={STEP}
        min={MIN_BARS}
        max={MAX_BARS}
        defaultValue={barsQuantity}
        onChange={handleQuantityChange}
      />
      <p>{barsQuantity}</p>
    </InputWrapper>
  );
};

export default BarQuantityController;
