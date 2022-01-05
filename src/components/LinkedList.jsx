import React from 'react';
import { useState, useEffect } from 'react';
import Node from './Node';
import ToolBar from './ToolBar';
import Model from '../models/methods';
import { AnimateSharedLayout } from 'framer-motion';
import '../styles/LinkedList.css';
//File này là chỉnh của linked list
const initialList = new Model();

export default function LinkedList () {
  
  const [list, setList] = useState([]);

  
  const [currentMethod, setCurrentMethod] = useState('insert');

  
  const [value, setValue] = useState('');
  const [indexValue, setIndex] = useState('');

  
  const [currentColor, setCurrentColor] = useState(
    'linear-gradient(#f7a1df, #f7a1df)'
  );

  const [changeColor] = useState(
    'linear-gradient(90deg, #f7a1df, #f7a1df)'
  )

  
  const [length, setLength] = useState(3);

  useEffect(() => {
    listToArray();
  }, []);

  const listToArray = () => {
    const array = [];
    let node = initialList.head;

    while (node) {
      array.push(node);
      node = node.next;
    }

    setList(array);
  };

  
  const updateNodes = (e) => {
    switch (currentMethod) {
      case 'addtail':
        initialList.addtail(value, currentColor);
        break;
      case 'deletetail':
        initialList.deletetail();
        break;
      case 'deletehead':
        initialList.deletehead();
        break;
      case 'addhead':
        initialList.addhead(value, currentColor);
        break;
      case 'set':
        initialList.set(value, currentColor, indexValue);
        break;
      case 'insert':
        initialList.insert(value, currentColor, indexValue);
        break;
      case 'remove':
        initialList.remove(indexValue);
        break;
      case 'print':
        initialList.print();
        break;
      default:
        break;
    }
    setLength(initialList.length);
    listToArray();
  };


  return (
    <div className='linked-list' >
      <div className='wrapper'>
        <h3>Danh sách liên kết</h3>
        <ToolBar
          setCurrentMethod={setCurrentMethod}
          currentMethod={currentMethod}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          setValue={setValue}
          setIndex={setIndex}
          updateNodes={updateNodes}
          value={value}
          indexValue={indexValue}
          length={length}
        />
        <AnimateSharedLayout>
          <section className='node-container'>
            {list.map((method, index) => {
              return (
                <Node
                  key={method.key}
                  value={method.value}
                  next={method.next ? index+1 : 'null'}
                  index={index}
                  color={method.color}
                />
              );
            })}
          </section>
        </AnimateSharedLayout>
      </div>
    </div>
  );
}
