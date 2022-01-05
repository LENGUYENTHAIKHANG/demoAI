import React from 'react';
import arrow from '../images/arrow.svg';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Node.css';

const Node = ({ value, next, index,color }) => {
  return (
    <AnimatePresence>
      <motion.div
        color='pink'
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className='node'
      >
        <div className='content'>
          <div className='index'>{index}</div>
          <div className='object' style={{ background: color }}></div>
          <div className='info'>
            <div className='value'>Giá trị: {value}</div>
          </div>
        </div>
        <div className='arrow'>
          <img src={arrow} alt='right arrow' />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Node;
