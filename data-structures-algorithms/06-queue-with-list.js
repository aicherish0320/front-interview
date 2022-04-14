"use strict";
/**
 * @description 用链表实现队列
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQueue = void 0;
var MyQueue = /** @class */ (function () {
    function MyQueue() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    MyQueue.prototype.add = function (val) {
        var newNode = {
            value: val,
            next: null
        };
        if (!this.head) {
            this.head = newNode;
        }
        var tailNode = this.tail;
        if (tailNode) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.len++;
    };
    MyQueue.prototype.delete = function () {
        var headNode = this.head;
        if (!headNode) {
            return null;
        }
        if (this.len <= 0) {
            return null;
        }
        var value = headNode.value;
        this.head = headNode.next;
        this.len--;
        return value;
    };
    Object.defineProperty(MyQueue.prototype, "length", {
        get: function () {
            return this.len;
        },
        enumerable: false,
        configurable: true
    });
    return MyQueue;
}());
exports.MyQueue = MyQueue;
var q = new MyQueue();
q.add('a');
q.add('b');
q.add('c');
console.log('q >>> ', q);
console.log('q.delete >>> ', q.delete());
console.log('q1 >>> ', q);
console.log(q.length);
console.log('q.delete2 >>> ', q.delete());
console.log('q.delete3 >>> ', q.delete());
console.log('q.delete4 >>> ', q.delete());
