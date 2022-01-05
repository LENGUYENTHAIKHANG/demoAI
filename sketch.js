let tree = null;
let controlDiv;
let controlBar;
let insertForm;
let insertButton;
let deleteForm;
let deleteButton;
let searchForm;
let searchButton;
let printInOrderButton;
let printPreOrderButton;
let printPostOrderButton;
let undoButton;
let animationSpeedSliderLabel;
let animationSpeedSlider;
let lastMsg = '';
let printOutput = '';
let value;
let BST;
let payload;

function enableUI() {
  insertForm.removeAttribute('disabled');
  insertButton.removeAttribute('disabled');
  deleteForm.removeAttribute('disabled');
  deleteButton.removeAttribute('disabled');
  searchForm.removeAttribute('disabled');
  searchButton.removeAttribute('disabled');
  printPreOrderButton.removeAttribute('disabled');
  printInOrderButton.removeAttribute('disabled');
  printPostOrderButton.removeAttribute('disabled');
  undoButton.removeAttribute('disabled');
  animationSpeedSlider.removeAttribute('disabled');
}

function disableUI() {
  insertForm.attribute('disabled', '');
  insertButton.attribute('disabled', '');
  deleteForm.attribute('disabled', '');
  deleteButton.attribute('disabled', '');
  searchForm.attribute('disabled', '');
  searchButton.attribute('disabled', '');
  printPreOrderButton.attribute('disabled', '');
  printInOrderButton.attribute('disabled', '');
  printPostOrderButton.attribute('disabled', '');
  undoButton.attribute('disabled', '');
  animationSpeedSlider.attribute('disabled', '');
}

function setAnimSpeed() {
  const animDelay = Math.abs(animationSpeedSlider.value());
  payload = ['Set Animation Speed', animDelay];
  BST.postMessage(payload);
}

function undo() {
  payload = ['Undo'];
  BST.postMessage(payload);
  BST.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
  };
  undoButton.attribute('disabled', ''); 
}

function displayNode(curr) {
  if (curr != null) {
    ellipseMode(CENTER);
    textAlign(CENTER);
    stroke('black');
    strokeWeight(3);
    if (curr.left != null) line(curr.x, curr.y, curr.left.x, curr.left.y);
    if (curr.right != null) line(curr.x, curr.y, curr.right.x, curr.right.y);
    noStroke();
    fill('red');
    if (curr.highlighted) ellipse(curr.x, curr.y, 40, 40);
    fill(231, 173, 173);
    ellipse(curr.x, curr.y, 30, 30);
    fill('black');
    text(curr.data, curr.x, curr.y + 5);
    displayNode(curr.left);
    displayNode(curr.right);
  }
}

function printPreOrder() {
  disableUI();
  lastMsg = '';
  printOutput = '';
  payload = ['Print Pre Order'];
  BST.postMessage(payload); 
  BST.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
    printOutput += event.data[2];
    if (event.data[3] === 'Finished') enableUI();
  };
  return 0;
}

function printInOrder() {
  disableUI();
  lastMsg = '';
  printOutput = '';
  payload = ['Print In Order'];
  BST.postMessage(payload); 
  BST.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
    printOutput += event.data[2];
    if (event.data[3] === 'Finished') enableUI();
  };
  return 0;
}

function printPostOrder() {
  disableUI();
  lastMsg = '';
  printOutput = '';
  payload = ['Print Post Order'];
  BST.postMessage(payload); 
  BST.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
    printOutput += event.data[2];
    if (event.data[3] === 'Finished') enableUI();
  };
  return 0;
}

function insert() {
  lastMsg = '';
  printOutput = '';
  value = parseInt(insertForm.value(), 10);
  insertForm.value('');
  if (isNaN(value) === true) return undefined;
  disableUI();
  payload = ['Insert', value, width];
  BST.postMessage(payload); 
  BST.onmessage = function (event) {
    tree = event.data[0]; 
    lastMsg = event.data[1];
    if (event.data[2] === 'Finished') enableUI();
  };
  return 0;
}

function del() {
  lastMsg = '';
  printOutput = '';
  value = parseInt(deleteForm.value(), 10);
  deleteForm.value('');
  if (isNaN(value) === true) return undefined;
  disableUI();
  payload = ['Delete', value];
  BST.postMessage(payload);
  BST.onmessage = function (event) {
    tree = event.data[0]; 
    lastMsg = event.data[1]; 
    if (event.data[2] === 'Finished') enableUI();
  };
  return 0;
}

function find() {
  lastMsg = '';
  printOutput = '';
  value = parseInt(searchForm.value(), 10);
  searchForm.value('');
  if (isNaN(value) === true) return undefined;
  disableUI();
  payload = ['Find', value];
  BST.postMessage(payload); 
  BST.onmessage = function (event) {
    tree = event.data[0]; 
    lastMsg = event.data[1];
    if (event.data[2] === 'Finished') enableUI();
  };
  return 0;
}

function addControls(type, name, onClick) {
  let element;
  switch (type) {
    case 'Input':
      element = createInput();
      element.size(60);
      break;
    case 'Button':
      element = createButton(name);
      element.mousePressed(onClick);
      break;
    case 'Slider':
      element = createSlider(-2000, -500, -1000, 20);
      element.mouseReleased(onClick);
      element.touchEnded(onClick);
      break;
    case 'Label':
      element = createP(name);
      element.class('control-label');
      break;
    default: break;
  }
  const tableEntry = createElement('td');
  tableEntry.child(element);
  controlBar.child(tableEntry);
  return element;
}

function setup() {

  BST = new Worker('BST.js');

  
  controlDiv = createDiv();
  controlDiv.parent('mainContent');
  controlDiv.id('controlSection');
  controlBar = createElement('table');
  controlDiv.child(controlBar);
  insertForm = addControls('Input', '', '');
  insertButton = addControls('Button', 'Thêm', insert);
  deleteForm = addControls('Input', '', '');
  deleteButton = addControls('Button', 'Xóa', del);
  searchForm = addControls('Input', '', '');
  searchButton = addControls('Button', 'Tìm', find);
  printPreOrderButton = addControls('Button', 'PreOrder', printPreOrder);
  printInOrderButton = addControls('Button', 'InOrder', printInOrder);
  printPostOrderButton = addControls('Button', 'PostOrder', printPostOrder);
  undoButton = addControls('Button', 'Quay lại', undo);
  animationSpeedSliderLabel = addControls('Label', 'Tốc độ :', '');
  animationSpeedSlider = addControls('Slider', '', setAnimSpeed);
  const canvas = createCanvas(1024, 500);
  canvas.parent('mainContent');
  textSize(15);
}

function draw() {
  background('white');
  displayNode(tree);
  fill('black');
  textAlign(LEFT);
  text(lastMsg, 30, 50);
  text(printOutput, 30, 70);
}
