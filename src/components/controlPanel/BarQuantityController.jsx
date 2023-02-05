import styled from 'styled-components';
import { useState, useContext } from 'react';
import PaletteContext from '../../store/palette-context';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & :is(label, p) {
    color: var(--defaultDark);
    font-weight: 700;
  }

  label {
    font-weight: 700;
    font-size: 1.2rem;
  }

  input {
    cursor: pointer;
    margin: 0.8rem;
    width: 20rem;
  }

  p {
    font-size: 1.5rem;
  }

  input {
    height: 21px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: clamp(15rem, 50vw, 40rem);
  }

  input:focus {
    outline: none;
  }

  input::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #a91472;
    border-radius: 5px;
    border: 0px solid #000000;
  }

  input::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 15px;
    width: 41px;
    border-radius: 50px;
    background: #ff459c;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4px;
  }

  input:focus::-webkit-slider-runnable-track {
    background: #a91472;
  }

  input::-moz-range-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #a91472;
    border-radius: 5px;
    border: 0px solid #000000;
  }

  input::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 15px;
    width: 41px;
    border-radius: 50px;
    background: #ff459c;
    cursor: pointer;
  }

  input::-ms-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input::-ms-fill-lower {
    background: #a91472;
    border: 0px solid #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 0px #000000;
  }

  input::-ms-fill-upper {
    background: #a91472;
    border: 0px solid #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 0px #000000;
  }

  input::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 15px;
    width: 41px;
    border-radius: 50px;
    background: #ff459c;
    cursor: pointer;
  }

  input:focus::-ms-fill-lower {
    background: #a91472;
  }

  input:focus::-ms-fill-upper {
    background: #a91472;
  }
`;

const BarQuantityController = () => {
  const [barsQuantity, setBarsQuantity] = useState(5);

  const ctx = useContext(PaletteContext);

  const handleQuantityChange = event => {
    const numberOfBars = event.target.value;
    ctx.updateColorBarsQuantity(numberOfBars);
    setBarsQuantity(numberOfBars);
  };

  return (
    <InputWrapper>
      <label htmlFor='bar-quantity'>Color Bars</label>
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
