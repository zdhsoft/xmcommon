"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = exports.Queue = void 0;
/*
 * javascript的数组实际上是一个集数组，列队，堆栈功能的合集，在这里做一下简单封装，用于专注某种数据结构。
 */
/** 列表的数据结构的基类 */
class ListDataStructBase {
    constructor() {
        this.m_list = [];
    }
    /** 列表的长度 */
    get length() {
        return this.m_list.length;
    }
    /** 列表本身 */
    get list() {
        return this.m_list;
    }
    /** 清除列表 */
    clear() {
        this.m_list = [];
    }
}
/** 队列 */
class Queue extends ListDataStructBase {
    constructor() {
        super();
    }
    /** 入队 */
    enqueue(paramItem) {
        this.m_list.push(paramItem);
    }
    /**
     * 出队
     * @returns 返回undefined表示，队列中，已经没有了数据
     */
    dequeue() {
        return this.m_list.shift();
    }
}
exports.Queue = Queue;
/** 堆栈 */
class Stack extends ListDataStructBase {
    constructor() {
        super();
    }
    /** 压入一个元素 */
    push(paramItem) {
        this.m_list.push(paramItem);
    }
    /**
     * 弹出一个元素
     * @returns 返回undefined表示，堆栈中，已经没有了数据
     */
    pop() {
        return this.m_list.pop();
    }
}
exports.Stack = Stack;
