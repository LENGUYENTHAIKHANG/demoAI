import { v4 as uuidv4 } from 'uuid';

var c_delay=0;
var delay_time=100;
export default class SinglyLinkedList {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
    this.length = 0;
  }
  addtail(value, color) {
    const newNode = new Node(value, color);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }
  deletetail() {
    if (this.length === 0) {
      return undefined;
    }
    if (this.length === 1) {
      this.length = 0;
      this.head = null;
      this.tail = null;
      return undefined;
    }

    let node = this.head;
    const previousTail = this.tail;

    
    while (node.next !== this.tail) {
      node = node.next;
    }
    this.tail = node;
    this.tail.next = null;
    this.length -= 1;
    return previousTail;
  }
  deletehead() {
    if (this.length === 0) {
      return undefined;
    }
    const currentHead = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return currentHead;
    }
    this.head = this.head.next;
    this.length -= 1;
    return currentHead;
  }
  addhead(value, color) {
    const newNode = new Node(value, color);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else {
      const currentHead = this.head;
      this.head = newNode;
      this.head.next = currentHead;
      this.length += 1;
    }

    return this;
  }
  get(index) {
    if (this.length === 0 || this.length - 1 < index) {
      return null;
    }
    let node = this.head;

    for (let i = 0; i < index; i += 1) {
      node = node.next;
    }
    return node;
  }
  set(value, color, index) {
    const positionNode = this.get(index);
    if (positionNode) {
      positionNode.value = value;
      positionNode.color = color;
      return true;
    }
    return false;
  }
  insert(value, color, index) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      this.addhead(value, color);
      return true;
    }
    if (index === this.length) {
      this.addtail(value, color);
      return true;
    }
    const node = new Node(value, color);
    let current = this.head;
    let previous = this.head;

    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
    }

    previous.next = node;
    node.next = current;
    this.length += 1;
  }
  remove(index) {
    if (this.length === 0 || index < 0 || index > this.length - 1) {
      return null;
    }
    if (index === 0) {
      this.deletehead();
      return true;
    }
    if (index === this.length - 1) {
      this.deletetail();
      return true;
    }
    const before = this.get(index - 1);
    const removed = before.next;

    before.next = removed.next;
    this.length -= 1;

    return removed;
  }
  print() {
    if (this.length === 0) {
      return true;
    }
    let node = this.head;
    
    var result = new Array();
    for (let i = 0; i < this.length; i++) {
      result.push(node.value)
      node=node.next;
    }
    alert("List bao gồm: " + result);
  }
}

class Node {
  constructor(value, color) {
    this.value = value;
    this.next = null;
    this.key = uuidv4();
    this.color = color;
  }
}
