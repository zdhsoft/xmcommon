/*
 * javascript的数组实际上是一个集数组，列队，堆栈功能的合集，在这里做一下简单封装，用于专注某种数据结构。
 */
/** 列表的数据结构的基类 */
class ListDataStructBase<T = unknown> {
    /** 保存的列表 */
    protected m_list: T[];

    public constructor() {
        this.m_list = [];
    }
    /** 列表的长度 */
    public get length() {
        return this.m_list.length;
    }
    /** 列表本身 */
    public get list() {
        return this.m_list;
    }
    /** 清除列表 */
    public clear() {
        this.m_list = [];
    }
}

/** 队列 */
export class Queue<T = unknown> extends ListDataStructBase<T> {
    public constructor() {
        super();
    }
    /** 入队 */
    public enqueue(paramItem: T) {
        this.m_list.push(paramItem);
    }
    /**
     * 出队
     * @returns 返回undefined表示，队列中，已经没有了数据
     */
    public dequeue() {
        return this.m_list.shift();
    }
}
/** 堆栈 */
export class Stack<T = unknown> extends ListDataStructBase<T> {
    public constructor() {
        super();
    }
    /** 压入一个元素 */
    public push(paramItem: T) {
        this.m_list.push(paramItem);
    }
    /**
     * 弹出一个元素
     * @returns 返回undefined表示，堆栈中，已经没有了数据
     */
    public pop() {
        return this.m_list.pop();
    }
}
