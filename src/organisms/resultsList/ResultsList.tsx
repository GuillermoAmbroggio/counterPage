import React from 'react';
import useColorsCounter from '../../hooks/useColorsCounter';
import './resultsList.css';

type Icolors =
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'grey';

export type IResultListData = Array<{
  color: Icolors;
  quantity: number;
  range: string;
}>;

export const initialState: IResultListData = [
  { color: 'purple', quantity: 0, range: '60 - 52' },
  { color: 'blue', quantity: 0, range: '51 - 42' },
  { color: 'green', quantity: 0, range: '41 - 32' },
  { color: 'yellow', quantity: 0, range: '31 - 22' },
  { color: 'orange', quantity: 0, range: '21 - 12' },
  { color: 'red', quantity: 0, range: '11 - 0' },
  { color: 'grey', quantity: 0, range: 'No click' },
];

interface IResultsList {
  dbCounter?: IResultListData;
  counterClick?: number;
}
const ResultsList: React.FC<IResultsList> = ({
  dbCounter = initialState,
  counterClick,
}) => {
  const colorClicked = useColorsCounter(counterClick ?? 0);
  return (
    <div className="container-resultsList">
      <h1>Resultados acumulados:</h1>
      <table>
        <tr>
          <th>Segundos</th>
          <th>Color</th>
          <th>Clicks</th>
        </tr>
        {dbCounter.map((e) => {
          const isColorWhite =
            e.color === 'blue' || e.color === 'green' || e.color === 'purple';
          return (
            <tr
              style={{
                backgroundColor: e.color,
                color: isColorWhite ? 'white' : undefined,
              }}
            >
              <td>{e.range}</td>
              <td>{e.color}</td>
              <td>{e.quantity}</td>
            </tr>
          );
        })}
      </table>
      {counterClick ? (
        <div className="footer-text">
          <h3>
            Gracias por participar, tu click se registro en el segundo{' '}
            {counterClick}, tu color asignado es el{' '}
          </h3>
          <div
            style={{
              backgroundColor: colorClicked,
              height: '20px',
              width: '20px',
              marginLeft: 12,
              borderColor: 'black',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ResultsList;
