import {log} from "util";

console.log('lesson 3');

// Event loop
// https://learn.javascript.ru/event-loop
// https://habr.com/ru/company/ruvds/blog/340508/
// https://www.youtube.com/watch?v=8aGhZQkoFbQ
// https://www.youtube.com/watch?v=j4_9BZezSUA

// Promise
// https://learn.javascript.ru/promise-basics
// https://www.youtube.com/watch?v=1idOY3C1gYU


// https://jsonplaceholder.typicode.com/posts/1
// https://habr.com/ru/company/oleg-bunin/blog/417461/?_ga=2.54695343.543933152.1602500664-1040035071.1596811661

//Promisы:

// function f() {
// } //рядовая таска
//
// setTimeout(() => console.log('hi'), 5000) //macrotask, выносится в отдельный поток
// console.log('1')
// let p = new Promise((res, rej) => { //microtask
//     //async request
//     if (true) {
//         res(10)
//     } else {
//         rej(0)
//     }
// })
// p.then(res => console.log(res), err => console.log(err)) //microtask
// f() //рядовая таска
// console.log(5)  //рядовая таска
// //порядок выполнения: рядовая таска, все микротаски, еще рядовая (присвоение, объявление переменной,
// // объявление функции, console.log), макротаски
//
// const prom = new Promise((res, rej) => {
//     //async request (object status - pending)
//     res() // resolve (1 arg) if all is - returns promise object (status - fulfilled)
//     rej() // reject (1 arg) if not ok - returns promise object (status - rejected)
// }) //status will never change!
//
// //с возвращаемым "объектом промисов" работаем так, если результат успешный (цепочка промисов):
// prom.then(res => {
//     console.log(res)
//     let tem = res + 10
//     return tem
// }).then(a => {
//     let tem = a * 20
//     return tem
// }).then(b => {
//     console.log(b)
// }, err => { //если ошибка, то err через запятую
//     console.log(err)
//     //another async request  //новый запрос
//     return //another async request result
// }).then(a => { //выполним, если результат нового запроса - успех
//     console.log(a)
// }, err => {  //выполним, если результат нового запроса - ошибка
//     //обработка ошибки another async requesta
// })
//
// //Аналог с catch (вместо err):
// prom
//     .then(res => {
//         console.log(res)
//         let tem = res + 10
//         return tem
//     })
//     .catch(err => {
//         //do something with err
//         return 5
//     })
//     .then(a => {
//         //...
//         const p2 = new Promise()
//         return p2
//     })
//     .catch(err => {
//         ///
//     })
//     .finally(data => { //финал цепочки
//         //отправить данные в редюсер или другие финальные действия
//         //либо снова написать return и обработать результат
//         p2.then(...)
//         return 10
//     }).then(b => {
//     //b = 10
// })
//
// //можно обойтись и без catch(либо err)
// p.then().then().then().catch(err => console.log(err)).then() //несколько операций подряд
// //если первый then вернет ошибку, то сразу выполнится catch.
// //если первый .then сработал значит, уже успешно.
//
// //Лучше отлавливать ошибки после каждого then, чтобы точно знать в каком thene ошибка:
// p.then().catch().then().catch().then().catch(err => console.log(err)).then()
//
// //раньше делали так:
// p.then(res, rej).then(res, rej).then(res, rej).then(res, rej)
// // если p, res (или rej) вернёт ошибку, то сработает следующий rej.
//
// //then может принимать 2 коллбэка. Но можно упрощать, передавая 1 коллбэк и делая цепочку
// //then - catch - then - catch - finally
//
// // promise.all - метод, чтобы много запросов сразу выполнить
//
// //для тестирования либо когда надо сгенерить промис, когда он нужен:
// let prom1 = Promise.resolve(10) //на выходе получается уже зарезолвленный промис (успешный)
// let p1 = Promise.reject(10) //получаем уже зареджектеный промис

(function () {
    setTimeout(() => console.log(1), 100) //macrotask
}) ()
console.log(2) //рядовая таска
new Promise((res, rej) => {
    setTimeout(() => console.log(3), 50) //macrotask
})
function f() { //не выполнится, т.к. мы не вызвали эту функцию.
    console.log(4)
}
Promise.resolve(console.log(5))  //microtask
//результат: 2, 5, 3, 1

// just a plug
export default () => {
};