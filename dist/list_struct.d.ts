/** 列表的数据结构的基类 */
declare class ListDataStructBase<T = unknown> {
    /** 保存的列表 */
    protected m_list: T[];
    constructor();
    /** 列表的长度 */
    get length(): number;
    /** 列表本身 */
    get list(): T[];
    /** 清除列表 */
    clear(): void;
}
/** 队列 */
export declare class Queue<T = unknown> extends ListDataStructBase<T> {
    constructor();
    /** 入队 */
    enqueue(paramItem: T): void;
    /**
     * 出队
     * @returns 返回undefined表示，队列中，已经没有了数据
     */
    dequeue(): T | undefined;
}
/** 堆栈 */
export declare class Stack<T = unknown> extends ListDataStructBase<T> {
    constructor();
    /** 压入一个元素 */
    push(paramItem: T): void;
    /**
     * 弹出一个元素
     * @returns 返回undefined表示，堆栈中，已经没有了数据
     */
    pop(): T | undefined;
}
export {};
