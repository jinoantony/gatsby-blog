---
slug: '/blog/setimmediate-vs-process-nexttick-in-nodejs'
date: '2020-06-22'
draft: false
title: 'setImmediate vs process.nextTick in NodeJs'
author: 'Jino Antony'
category: 'NodeJs'
coverImage: 'set-immediate.png'
tag: 'NodeJs'
description: 'setImmediate() and process.nextTick() are two functions which allows us to control the order of execution of our code in the event loop. Both of these functions schedule our callback handlers in the event queue. But they are executed at different phases of the event loop.'
---

NodeJs is famous for its non-blocking, event-driven architecture. Handling asynchronous tasks in node is quite easier than any other server programming language. Node offers several built-in functions to handle asynchronous tasks.

## Asynchronicity

In order to achieve asynchronicity, node uses an event loop. The event loop is a single-threaded semi-infinite loop, which uses an event queue to queue all the io and/or timer callbacks and execute them one by one sequentially. The event queue is not a single queue, rather a collection of queues and heaps.

![Event loop](event-loop.png "Phases of event loop")

The above diagram shows the event loop's order of execution. Each box will be referred to as a phase of the event loop.

## Phases of event loop

Event loop consists of the following phases.

- **Timers** - in this phase callbacks of expired timers added using `setTimeout` or interval functions added using `setInterval` are executed.

- **Pending callbacks** - executes I/O callbacks deferred to the next loop iteration.

- **Idle handlers** - perform some libuv internal stuff, used internally.

- **Prepare handlers** - perform some prep-work before polling for I/O, used internally.

- **I/O poll** - retrieve new I/O events; execute I/O related callbacks.

- **Check handlers** - `setImmediate()` callbacks are invoked here.

- **Close callbacks** - execute close handlers

In this article, we are going to discuss only the **Check handlers** phase of the event loop. If you want to know about the event loop in detail check out the [event loop series](https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810) by Deepal and official nodejs docs [here](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/).

`setImmediate()` and `process.nextTick()` are two functions which allows us to control the order of execution of our code in the event loop. Both of these functions schedule our callback handlers in the event queue. But they are executed at different phases of the event loop.

## setImmediate()

`setImmediate(callback[, ...args])` takes a `callback`  and add it to the event queue( specifially the immediate queue).

```js
setImmediate(() => console.log('Queued using setImmediate'))
```

callbacks scheduled using `setImmediate()` will be executed in the **Check handlers** phase of the event loop.

```js
console.log('Start')

setImmediate(() => console.log('Queued using setImmediate'))

console.log('End')
```

The output of the above script will be

```shell
Start
End
Queued using setImmediate
```

Since the event loop starts processing only if the call stack is empty, the callbacks queued in the event queue will be processed after the script is run to completion.

## process.nextTick()

`process.nextTick(callback[, ...args])` will also takes a `callback` and optional `args` parameters like `setImmediate()` function. But instead of "immediate queue", the callbacks are queued in the "next tick queue".

```js
process.nextTick(() => console.log('Queued using process.nextTick'));
```

Callbacks scheduled using `process.nextTick()` will be processed after the execution of the current phase. That is, the next tick queues are processed in between each phase of the event loop. Also, the next tick queues are processed once the script is run to completion and before the event loop starts.

```js
console.log('Start')

process.nextTick(() => console.log('Queued using process.nextTick'))

console.log('End')
```

The output of the above script will be

```shell
Start
End
Queued using process.nextTick
```

## setImmediate() vs process.nextTick()

Now let's look at the differences between `setImmediate()` and `process.nextTick()` and when to use which.

1. `setTimeout()` is processed in the **Check handlers** phase, while `process.nextTick()` is processed at the **starting of the event loop** and **between each phase** of the event loop.

2. On any given context `process.nextTick()` has higher priority over `setImmediate()`.

```js
setImmediate(() => console.log('I run immediately'))

process.nextTick(() => console.log('But I run before that'))
```

Output:
```shell
But I run before that
I run immediately
```

3. If `process.nextTick()` is called in a given phase, all the callbacks passed to `process.nextTick()` will be resolved before the event loop continues. This will block the event loop and create **I/O Starvation** if `process.nextTick()` is called recursively.

```js
let count = 0

const cb = () => {
    console.log(`Processing nextTick cb ${++count}`)
    process.nextTick(cb)
}

setImmediate(() => console.log('setImmediate is called'))
setTimeout(() => console.log('setTimeout executed'), 100)

process.nextTick(cb)

console.log('Start')
```

Output:

```shell
Start
Processing nextTick cb 1
Processing nextTick cb 2
Processing nextTick cb 3
Processing nextTick cb 4
Processing nextTick cb 5
Processing nextTick cb 6
Processing nextTick cb 7
Processing nextTick cb 8
Processing nextTick cb 9
Processing nextTick cb 10
...
```

As you can see recursive calls to `process.nextTick()` are processed continuously and I/O is starved. So `setImmediate()` and `setTimeout()` callbacks won't be executed. 

4. Unlike `process.nextTick()`, recursive calls to `setImmediate()` won't block the event loop, because every recursive call is executed only on the next event loop iteration.

```js
let count = 0

const cb = () => {
    console.log(`Processing setImmediate cb ${++count}`)
    setImmediate(cb)
}

setImmediate(cb)
setTimeout(() => console.log('setTimeout executed'), 100)

console.log('Start')
```

Output:

```shell
Start
Processing setImmediate cb 1
Processing setImmediate cb 2
Processing setImmediate cb 3
Processing setImmediate cb 4
...
Processing setImmediate cb 503
Processing setImmediate cb 504
setTimeout executed
Processing setImmediate cb 505
Processing setImmediate cb 506
...
```

Here even though `setImmediate()` is called recursively, it won't block the event loop and the `setTimeout()` callback is executed after the specified timeout.

## Use case

As the official docs, always use `setImmediate()`.

> We recommend developers use setImmediate() in all cases because it's easier to reason about.

So when to use `process.nextTick()` ?

Consider the following code snippet.

```js
function readFile(fileName, callback) {

    if (typeof fileName !== 'string') {
        return callback(new TypeError('file name should be string'))
    }

    fs.readFile(fileName, (err, data) => {
        if (err) return callback(err)

        return callback(null, data)
    })
}
```

The problem with this code is that `readFile()` can be synchronous or asynchronous based on the input params. It may result in unpredictable outcomes.

So how can we make it 100% asynchronous? `process.nextTick()` can help us here.

Using `process.nextTick()` we can rewrite the function like this.

```js
function readFile(fileName, callback) {

    if (typeof fileName !== 'string') {
        return process.nextTick(
            callback, 
            new TypeError('file name should be string')
        )
    }

    fs.readFile(fileName, (err, data) => {
        if (err) return callback(err)

        return callback(null, data)
    })
}
```

Now the function is completely asynchronous. It will now throw an error if the filename is not a string, only after running the script to completion and before the event loop starts.

`process.nextTick()` is also useful in other situations where the callback must be executed immediately after the script is run to completion.

## Conclusion

`process.nextTick()` and `setImmediate()` allows the user to schedule callbacks in the event loop. `process.nextTick()` is processed after every phase of the event loop and `setImmediate()` is only processed on the check handler phase of the event loop.

Names of both functions are confusing. `process.nextTick()` fires immediately on the same phase and `setImmediate()` fires on the following iteration or 'tick' of the event loop.