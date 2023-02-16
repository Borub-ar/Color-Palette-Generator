import styled from 'styled-components';
import Color from './Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPaintBrush } from '@fortawesome/free-solid-svg-icons';

const Tile = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr min-content;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px -0px 24px -7px rgba(66, 68, 90, 1);

  .name {
    font-weight: 700;
    color: var(--default-dark);
  }

  .palette-colors {
    display: flex;
    align-items: center;
    column-gap: 0.2rem;
    margin-inline: 1rem 4.5rem;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    justify-self: end;
    column-gap: 0.6rem;
  }

  button {
    height: 30px;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
  }

  .delete-button,
  .modify-button {
    width: 3.5rem;
  }

  .delete-button {
    background-color: red;
  }

  .modify-button {
    background-color: var(--main-blue);
  }
`;

const LibraryTile = props => {
  const colors = props.paletteData.colors.map(color => ({ color, id: crypto.randomUUID() }));
  const paletteName = props.paletteData.paletteName;

  return (
    <Tile>
      <p className='name'>{paletteName}</p>

      <div className='palette-colors'>
        {colors.map(color => (
          <Color key={color.id} color={color.color} />
        ))}
      </div>

      <div className='buttons-wrapper'>
        <button className='delete-button' aria-label='Delete this palette'>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className='modify-button' aria-label='Modify this palette'>
          <FontAwesomeIcon icon={faPaintBrush} />
        </button>
      </div>
    </Tile>
  );
};

export default LibraryTile;
