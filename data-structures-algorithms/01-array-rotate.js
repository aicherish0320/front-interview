"use strict";
exports.__esModule = true;
exports.rotate2 = exports.rotate1 = void 0;
/*
  将一个数组旋转 k 步
  输入一个数组 [1, 2, 3, 4, 5, 6, 7]
  k = 3，即旋转3步
  输出 [5, 6, 7, 1, 2, 3, 4]
*/
// ! 思路1：把末尾的元素挨个 pop，然后 unshift 到数组前面
// 时间复杂度：O(n^2)  空间复杂度：O(1)
function rotate1(arr, k) {
    var length = arr.length;
    if (!k || length === 0)
        return arr;
    var step = Math.abs(k % length);
    for (var i = 0; i < step; i++) {
        var n = arr.pop();
        if (n) {
            arr.unshift(n);
        }
    }
    return arr;
}
exports.rotate1 = rotate1;
// ! 思路2：把数组拆分，最后 concat 拼接到一起
// 时间复杂度：O(1)  空间复杂度：O(n)
function rotate2(arr, k) {
    var length = arr.length;
    if (!k || length === 0)
        return arr;
    var step = Math.abs(k % length);
    var part1 = arr.slice(-step);
    var part2 = arr.slice(0, length - step);
    var part3 = part1.concat(part2);
    return part3;
}
exports.rotate2 = rotate2;
// 性能测试
var arr1 = [];
for (var i = 0; i < 10 * 10000; i++) {
    arr1.push(i);
}
console.time('arr1');
rotate1(arr1, 9 * 10000);
console.timeEnd('arr1');
var arr2 = [];
for (var i = 0; i < 10 * 10000; i++) {
    arr2.push(i);
}
console.time('arr2');
rotate2(arr2, 9 * 10000);
console.timeEnd('arr2');
