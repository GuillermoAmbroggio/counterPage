import React, { useEffect, useState } from 'react';
import { Button } from '../../atoms';
import Counter from '../../atoms/counter/Counter';
import useColorsCounter from '../../hooks/useColorsCounter';
import { ResultsList } from '../../organisms';
import {
  initialState,
  IResultListData,
} from '../../organisms/resultsList/ResultsList';
import './newSection.css';
import Swal from 'sweetalert2';

const NewSection: React.FC = () => {
  const [counter, setCounter] = useState(60);

  /* Estado para guardar informacion cuando se presiona el boton */
  const [stopCounter, setStopCounter] = useState<{
    status: boolean;
    counterClick: number | undefined;
  }>({ status: false, counterClick: undefined });

  /* Estado que simula una base de dato para guardas las estadisticas */
  const [dbStop, setdbStop] = useState<IResultListData>(initialState);

  const [viewResults, setViewResults] = useState(false);

  /* Estado que maneja el tiempo de los falsos clicks */
  const [fakeSecondsClicks, setFakeSecondsClicks] = useState<
    undefined | number
  >(undefined);

  /* Hooks que se usa para cambiar el color del boton en funcion del tiempo*/
  const colorSelected = useColorsCounter(counter);

  /* Reviso el storage para cargar informacion si hubiera almacenada */
  useEffect(() => {
    const stopCounterStorage = localStorage.getItem('counter');
    const dbStopStorage = localStorage.getItem('dbCounter');

    if (stopCounterStorage) {
      const values = JSON.parse(stopCounterStorage);
      setStopCounter(values);
      setViewResults(values.status ? true : false);
    }
    if (dbStopStorage) {
      const values = JSON.parse(dbStopStorage);
      setdbStop(values);
    }
  }, []);

  /* Maneja el contador, lo disminuye y simula los falsos clicks */
  useEffect(() => {
    const idInterval = setInterval(() => {
      setCounter((count) => count - 1);
    }, 1000);

    if (counter <= 0) {
      clearInterval(idInterval);
    }
    if (!fakeSecondsClicks) {
      const randomInt = Math.floor(Math.random() * (60 - 1 + 1)) + 1;
      setFakeSecondsClicks(randomInt);
    }
    if (counter === fakeSecondsClicks) {
      fakeHandleClick();
      setFakeSecondsClicks(undefined);
    }
    return () => {
      clearInterval(idInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, stopCounter.status]);

  const fakeHandleClick = () => {
    const db = dbStop.map((e) => {
      if (e.color === colorSelected) {
        return { ...e, quantity: e.quantity + 1 };
      } else {
        return e;
      }
    });
    setdbStop(db);

    localStorage.setItem('dbCounter', JSON.stringify(db));
    setCounter(60);
  };

  const handleClick = () => {
    if (!stopCounter.status) {
      setStopCounter({ status: true, counterClick: counter });
      Swal.fire({
        title: `Tu Click se registrará a los  ${counter} s.`,
        text: 'Estas de acuerdo? No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          const db = dbStop.map((e) => {
            if (e.color === colorSelected) {
              return { ...e, quantity: e.quantity + 1 };
            } else {
              return e;
            }
          });
          setStopCounter({ status: true, counterClick: counter });
          setdbStop(db);
          localStorage.setItem(
            'counter',
            JSON.stringify({ status: true, counterClick: counter })
          );
          localStorage.setItem('dbCounter', JSON.stringify(db));
          setViewResults(true);
          setCounter(60);
          Swal.fire({
            title: 'Se registró tu click, gracias por participar',
            icon: 'success',
          });
        } else {
          setStopCounter({ status: false, counterClick: undefined });
        }
      });
    }
  };
  return (
    <div className="container-newSection">
      <Counter
        counter={counter}
        onClick={handleClick}
        disabled={stopCounter.status}
      />

      {viewResults ? (
        <>
          <ResultsList
            dbCounter={dbStop}
            counterClick={stopCounter.counterClick}
          />
          <Button
            className="button-statistics"
            title={'Ocultar estadisticas'}
            onClick={() => {
              setViewResults(false);
            }}
          />
        </>
      ) : (
        <Button
          className="button-statistics"
          title={'Mostrar estadisticas'}
          onClick={() => {
            setViewResults(true);
          }}
        />
      )}
      <h3 className="stop-clicks-text" onClick={() => setFakeSecondsClicks(-1)}>
        Parar simulación de clicks
      </h3>
    </div>
  );
};

export default NewSection;
