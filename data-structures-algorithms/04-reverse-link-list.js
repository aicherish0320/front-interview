"use strict";
/*
  定义一个 JS 函数，反转单向链表

  链表：
*/
exports.__esModule = true;
function ListNode(val) {
    this.val = val;
    this.next = null;
}
function reverseLinkList(head) {
    var prev = null;
    var cur = head;
    while (cur) {
        var next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}
exports["default"] = reverseLinkList;
var head = new ListNode('a');
var node1 = new ListNode('b');
var node2 = new ListNode('c');
head.next = node1;
node1.next = node2;
console.log(head);
console.log(reverseLinkList(head));
