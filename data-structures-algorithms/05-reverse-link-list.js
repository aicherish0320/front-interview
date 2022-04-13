/**
 * @description 反转一个单向链表
 */
/**
 * 生成单向链表
 * @param arr 链表 value 数组
 * @returns 链表头
 */
var createLinkList = function (arr) {
    var length = arr.length;
    if (!length) {
        throw new Error('array is empty');
    }
    var curNode = {
        value: arr[length - 1]
    };
    if (length === 1) {
        return curNode;
    }
    for (var i = length - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        };
    }
    return curNode;
};
console.log(createLinkList(['a', 'b', 'c']));
