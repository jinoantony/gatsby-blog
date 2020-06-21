---
slug: '/blog/setimmediate-vs-process-nexttick-in-nodejs'
date: '2020-06-21'
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

Event loop consist of the following phases.

- **Timers** - in this phase callbacks of expired timers added using `setTimeout` or interval functions added using `setInterval` are executed.

- **Pending callbacks** - executes I/O callbacks deferred to the next loop iteration.

- **Idle handlers** - perform some libuv internal stuff, used internally.

- **Prepare handlers** - perform some prep-work before polling for I/O, used internally.

- **I/O poll** - retrieve new I/O events; execute I/O related callbacks.

- **Check handlers** - `setImmediate()` callbacks are invoked here.

- **Close callbacks** - execute close handlers

In this article, we are going to discuss only the **Check handlers** phase of the event loop. If you want to know event loop in detail check out the [event loop series](https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810) by Deepal and official nodejs docs [here](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/).

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

