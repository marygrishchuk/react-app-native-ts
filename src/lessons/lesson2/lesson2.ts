console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0

// let param = 10
//
// function f(a, b, c, n) {
//     console.log(a)
//     function f1() {
//         console.log(param)
//         let a = 10
//     }
//     f1()
// }

// let a = 10
//
// function f(a: number) {
//     function f1() {
//         let a = 10
//         let b = 100
//         let c = 100
//         console.log(a)
//         c = a + b
//     }
//     f1()
// }
//
// f(a)

//Описание функции в жизни:
//sum - суммирует 2 числа
//a - число 1
//b - число 2
//возвращает сумму 2х чисел
// function sum(a, b) {
//     return a + b
//     //1000 - методом подбора определил, что с 1с код работает прекрасно
//     setTimeout(() => {}, 1000)
// }

// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9
function sum(n: number) {
    return function (n2: number) {
        return n + n2
    }
}

console.log(sum(3)(6))

let sum3 = sum(3)
console.log(sum3(6))

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3
// Решение:
// function makeCounter() {
//     let count = 0
//     return function () {
//         return ++count
//     }
// }
// const counter = makeCounter();
// console.log(counter()); // 1
// console.log(counter()); // 2
// const counter2 = makeCounter();
// console.log(counter2()); // 1
// console.log(counter()); // 3


// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;
// Решение:
function makeCounter(n: number) {
    let count = n
    return {
        increase: function () {
            return ++count
        }, //это объект без this, неважно, стрелочная или нет
        decrease: () => --count,
        reset: () => {
            count = 0
            return count
        },
        set: (num: number) => {
            count = num
            return count
        },
        getCount: () => count
    }
}

let counter = makeCounter(5)
console.log(counter) //выводит в консоль объект, возвращаемый функцией,
//не будет видна переменная count!
console.log(counter.increase()) //6
console.log(counter.decrease()) //5
console.log(counter.decrease()) //4
console.log(counter.getCount()) //4
console.log(counter.set(50)) //50
console.log(counter.reset()) //0
let counter2 = makeCounter(9) //независимый счетчик
console.log(counter2.increase()) //10
console.log(counter2.decrease()) //9
console.log(counter2.decrease()) //8

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы (в первых скобках указано кол-во слагаемых):
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

function superSum(num: number) { //вызов с 1-ми скобками
    if (num === 0) return 0
    if (num === 1) return (n: number) => n  //если кол-во слагаемых = 1, то здесь точка выхода

    let _arguments: number[] = []  //этот массив считает, сколько аргументов пришло,
    // здесь мы аккумулируем аргументы с помощью присваивания внутри helpera!
    function helper(...args: number[]) { //функция принимает любое кол-во аргументов
        //helper вызывается при втором вызове (со вторыми скобками)
        _arguments = [..._arguments, ...args] //копируем данные из _arguments (если есть)
        // и расширяем их данными (параметрами), переданными в helper
        // и записываем их в переменную _arguments снаружи (замыкание)
        if (_arguments.length >= num) { //num из замыкания
            _arguments.length = num  //обрубили кол-во слагаемых до значения num,
            // просто переприсвоив длину (обрезав "лишний хвост" в конце массива)
            return _arguments.reduce((acc: number, number) => acc + number)
        } else { //пока недостаточно слагаемых, будет возвращаться функция helper, чтоб взять еще из ()!
            return helper //рекурсия
        }
    }

    return helper
}

console.log(superSum(0))
//@ts-ignore
// поставили, т.к. TypeScript не знает, как типизировать каррирование.
console.log(superSum(1)(5))
//1 попадает в num, а 5 попадает в n.

//@ts-ignore
console.log(superSum(3)(2)(5, 3))
//@ts-ignore
console.log(superSum(3)(2, 5)(3, 9)) //кол-во слагаемых 4, а должно быть 3


function test(...args: number[]) { // переменная ...args содержит массив параметров функции
    console.log(args)  //получаем массив с цифрой 2: [2]
}

test(2);
//Rest-оператор:
// const [one, two, ...rest] = [1, 2, 3, 5] //rest-оператор закинет 3 и 5 в 'rest'!

//Тест скорости выполнения нашей функции:
(() => {
    const start = Date.now()
    //@ts-ignore
    superSum(76)(1, 4, 7)(8, 4)(8, 4)(1, 2, 7)(4, 4, 7)(1, 4)(7, 4)(3, 6, 7)
    (3, 6, 7)(1, 4, 7)(8, 4)(8, 4)(1, 2, 7)(4, 4, 7)(1, 4)(7, 4)(3, 6, 7)(3, 6, 7)
    (1, 4)(7, 4)(3, 6, 7)(3, 6, 7)(1, 4)(7, 4)(3, 6, 7)(3, 6, 7)(1, 4)(7, 4)(3, 6, 7)(3, 6, 7);
    const end = Date.now()
    //@ts-ignore
    console.log('result: ', end - start);
})();
//отрабатывает очень быстро, т.к. логика слишкам простая, поэтому получаем 0 - 2 милисекунды в консоли.

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion
// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// ...
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

//Recursion
function sumTo(n: number): number {
    if (n === 1) return n  //точка выхода из рекурсии
    return n + sumTo(n - 1)
}

// "Хвостовая рекурсия" в JS пока не работает, поэтому стек будет точно так же заполняться:
// function sumTo(n: number, acc: number = 0): number { //acc будет хранить промежут. значения
//     if (n === 1) return n + acc  //выход из рекурсии
//     return sumTo(n - 1, acc + n)
// }

console.log(sumTo(100))
// console.log(sumTo(3))
// Если бы "Хвостовая рекурсия" в JS была реализована, то каждый раз возвращалась и вызывалась бы
// новая функция, и стек был бы на одном уровне (не переполнялся бы)!
// Но тут, как и прежде, функция не сможет вернуть значение пока не посчитает внутреннюю функцию

// Task 06*
// Написать функцию, которая повторяет функционал метода flat массива на всю глубину.

// Для развёртвания многомерных массивов используем рекурсию, reduce и concat
const arrayToFlatten = [1, 2, [3, 4, [5, 6]]];

function flatDeep(array: any, depth = 1) {
    return depth > 0
        ? array.reduce((acc: any, value: any) => acc.concat(
            Array.isArray(value)
            ? flatDeep(value, depth - 1)
            : value
        ), [])
        : array.slice();
};
console.log(flatDeep(arrayToFlatten, Infinity));
// [1, 2, 3, 4, 5, 6]


// just a plug
export default () => {
};