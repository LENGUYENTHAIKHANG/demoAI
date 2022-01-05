import React from 'react';
import { useState, useEffect, useRef } from 'react';
import MethodsDropDown from './MethodsDropDown';
import ColorsDropDown from './ColorsDropDown';
import '../styles/ToolBar.css';

const ToolBar = ({
  setCurrentMethod,
  currentMethod,
  setCurrentColor,
  currentColor,
  value,
  setValue,
  setIndex,
  indexValue,
  updateNodes,
  length,
}) => {
  const [valid, setValid] = useState(true);
  const ref = useRef();
  let inputs;

  useEffect(() => {
    ref.current.focus();
  }, []);

  // event handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentMethod === 'remove' || currentMethod === 'set') {
      if (length > 0 && length > indexValue) {
        setValid(true);
        updateNodes();
      } else {
        setValid(false);
      }
    } else if (currentMethod === 'insert') {
      if (length >= indexValue) {
        setValid(true);
        updateNodes();
      } else {
        setValid(false);
      }
    } else {
      setValid(true);
      updateNodes();
    }
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleIndexChange = (e) => {
    const currentValue = e.target.value;
    const regex = /^\d+$/;

    if (regex.test(currentValue)) {
      setIndex(parseInt(currentValue));
    } else if (currentValue === '') {
      setIndex('');
    } else {
      setValid(false);
    }
  };

  if (currentMethod === 'addtail' || currentMethod === 'addhead') {
    inputs = (
      <>
        {' '}
        <div className='color-container'>
          <div className='label'>Chọn màu</div>
          <ColorsDropDown
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
        </div>
        <div className='value-container'>
          <label htmlFor='value-input' className='label'>
            Giá trị
          </label>
          <input
            type='text'
            ref={ref}
            value={value}
            id='value-input'
            className='value-input'
            onChange={handleValueChange}
          />
        </div>
      </>
    );
  } else if (currentMethod === 'set' || currentMethod === 'insert') {
    inputs = (
      <>
        <div className='color-container'>
          <div className='label'>Chọn màu</div>
          <ColorsDropDown
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
        </div>
        <div className='value-container'>
          <label htmlFor='value-input' className='label'>
            Giá trị
          </label>
          <input
            type='text'
            ref={ref}
            value={value}
            id='value-input'
            className='value-input'
            onChange={handleValueChange}
          />
        </div>

        <div className='index-container'>
          <label htmlFor='index-input' className='label'>
            Vị trí
            {valid === false ? (
              <span className='valid'>
                {currentMethod === 'set'
                  ? `(0 - ${length - 1})`
                  : `(0 - ${length})`}
              </span>
            ) : null}
          </label>
          <input
            type='text'
            className='index-input'
            value={indexValue}
            id='index-input'
            onChange={handleIndexChange}
          />
        </div>
      </>
    );
  } else if (currentMethod === 'remove') {
    inputs = (
      <>
        <div className='index-container'>
          <label htmlFor='index-input' className='label'>
            Vị trí
            {valid === false ? (
              <span className='valid'>{`(0 - ${length - 1})`}</span>
            ) : null}
          </label>
          <input
            type='text'
            value={indexValue}
            id='index-input'
            className='index-input'
            onChange={handleIndexChange}
          />
        </div>
      </>
    );
  }

  return (
    <form className='tool-bar' onSubmit={handleSubmit}>
      <div className='method-container'>
        <div className='label'>Phương thức</div>
        <MethodsDropDown
          setCurrentMethod={setCurrentMethod}
          currentMethod={currentMethod}
        />
      </div>

      {inputs ? inputs : null}

      <div className='submit-container'>
        <button className='submit'>Chạy</button>
      </div>
    </form>
  );
};

export default ToolBar;
