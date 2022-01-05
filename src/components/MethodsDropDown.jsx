import React from 'react';
import { useState, useEffect } from 'react';
import dropTriangle from '../images/drop-triangle.svg';
import { motion } from 'framer-motion';
import { dropForm } from '../models/animate';
import '../styles/MethodsDropDown.css';
const MethodsDropDown = (props) => {
  const [open, setOpen] = useState(false);
  const [methods, setMethods] = useState([]);
  // các loại method của linked list
  useEffect(() => {
    const allMethods = [
      'insert',
      'deletetail',
      'addtail',
      'remove',
      'print',
      'set',
      'deletehead',
      'addhead',
    ];

    const filteredList = allMethods.filter(
      (method) => method !== props.currentMethod
    );

    setMethods(filteredList);
  }, [props.currentMethod]);

  
  const handleClick = () => {
    setOpen(!open);
  };

  const handleMethodClick = (e) => {
    props.setCurrentMethod(e.target.id);
    setOpen(!open);
  };

  return (
    <div className='methods-drop-down'>
      <div className='method-current' onClick={handleClick}>
        <span className='current-text'>{props.currentMethod}</span>
        <span>
          <img
            src={dropTriangle}
            alt='triangle'
            className={open ? 'drop-opened' : 'drop-closed'}
          />
        </span>
      </div>
      <motion.ul
        className='method-list'
        style={{ originY: 0 }}
        variants={dropForm}
        initial='initial'
        animate={open ? 'animate' : 'initial'}
      >
        {methods.map((method) => (
          <li
            className='method'
            id={method}
            onClick={handleMethodClick}
            key={method}
          >
            {method}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default MethodsDropDown;
