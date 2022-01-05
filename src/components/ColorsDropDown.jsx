import React from 'react';
import { useState, useEffect } from 'react';
import dropTriangle from '../images/drop-triangle.svg';
import { motion } from 'framer-motion';
import { dropForm } from '../models/animate';
import '../styles/ColorsDropDown.css';
//này là navigation để chọn màu cho node
const ColorsDropDown = (props) => {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState([]);

  // bỏ màu vô mảng colors ở dưới là chọn được
  useEffect(() => {
    const colors = [
      'linear-gradient(90deg, #F7A1DF, #F7A1DF',
      'linear-gradient(90deg, #F44336, #F44336',
      'linear-gradient(90deg, #F1C232, #F1C232',
      'linear-gradient(90deg, #26F82D, #26F82D'
    ];

    const filteredColors = colors.filter(
      (color) => color !== props.currentColor
    );

    setColors(filteredColors);
  }, [props.currentColor]);

  
  const handleClick = () => {
    setOpen(!open);
  };

  const handleColorClick = (e) => {
    const target = e.target.closest('.drop-color');
    props.setCurrentColor(target.id);
    setOpen(!open);
  };

  return (
    <div className='colors-drop-down'>
      <div className='color-current' onClick={handleClick}>
        <div
          className='colorbox'
          style={{ background: props.currentColor }}
        ></div>
        <span>
          <img
            src={dropTriangle}
            alt='triangle'
            className={open ? 'drop-opened' : 'drop-closed'}
          />
        </span>
      </div>
      <motion.ul
        className='color-list'
        style={{ originY: 0 }}
        variants={dropForm}
        initial='initial'
        animate={open ? 'animate' : 'initial'}
      >
        {colors.map((color) => (
          <li
            className='drop-color'
            id={color}
            key={color}
            onClick={handleColorClick}
          >
            <div className='colorbox' style={{ background: color }}></div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default ColorsDropDown;
