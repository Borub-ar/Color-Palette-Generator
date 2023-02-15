import styled from 'styled-components';

const Tile = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px -0px 24px -7px rgba(66, 68, 90, 1);

  .palette-colors {
    display: flex;
    align-items: center;
    column-gap: 0.2rem;
    width: 100%;
    max-width: 50%;
    margin-inline: 1rem 3rem;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    margin-left: auto;
  }
`;

const ColorBar = styled.div`
  flex: 1;
  height: 30px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const LibraryTile = props => {
  const colors = props.paletteData.colors.map(color => ({ color, id: crypto.randomUUID() }));
  const paletteName = props.paletteData.paletteName;

  return (
    <Tile>
      <p>{paletteName}</p>

      <div className='palette-colors'>
        {colors.map(color => (
          <ColorBar key={color.id} className='color-bar' color={color.color}></ColorBar>
        ))}
      </div>

      <div className='buttons-wrapper'>
        <button>Delete</button>
        <button>Modify</button>
      </div>
    </Tile>
  );
};

export default LibraryTile;
