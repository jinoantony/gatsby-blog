---
slug: '/blog/async-vs-sync-nodejs-a-simple-benchmark'
date: '2020-07-05'
draft: false
title: 'Async vs Sync NodeJs: A Simple Benchmark'
author: 'Jino Antony'
category: 'NodeJs'
coverImage: 'async.png'
tag: 'NodeJs'
description: 'Async and sync are probably two of the most heard words among javascript developers, they refer to asynchronous and synchronous programming respectively. But how do they differ in performance? Here is a simple async vs sync benchmark.'
---

Async and sync are probably two of the most heard words among javascript developers, they refer to asynchronous and synchronous programming respectively. Asynchronous programming in javascript can be done using `callbacks`, `Promise`, and `async` and `await`.

Javascript handles asynchronous tasks with the help of [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). We know that it increases performance and doesn't block the rest of the code. But everything is theoretical, how do we know is it actually increases performance?

By doing some benchmarks!!

In this article, we won't discuss how to program asynchronously or synchronously, instead, we are going to run some benchmarks against `sync` and `async` methods.

For the test case, we are going to use the `bcrypt` package which has sync and async methods to hash a given string. We also need `express`.

let's start by installing the dependencies.

```bash
yarn add express bcrypt
```

The following script can be used for benchmarking.

```js
import express from 'express'
import bcrypt from 'bcrypt'

const app = express()

app.get('/sync', (req, res) => {
    let hashed = bcrypt.hashSync('secret', 10)
    return res.send(hashed)
})

app.get('/async', async (req, res) => {
    let hashed = await bcrypt.hash('secret', 10)
    return res.send(hashed)
})

app.listen(3000, () => console.log('Server started on port 3000'))
```

It's a simple express application with two routes both of them will return the hashed value of string "secret". `/sync` route will use `bcrypt.hashSync()` method to hash the value synchronously, while `/async` route use `bcrypt.hash()` method to hash the value asynchronously.

We can now run the benchmark test using [apache bench](https://httpd.apache.org/docs/2.4/programs/ab.html).

> Apache bench is a tool for benchmarking HTTP servers.

## Sync mode benchmark

The following command is used to run the benchmark for sync mode.

```shell
ab -k -c 20 -n 250 "http://localhost:3000/sync"
```

If you don't know what the above command does, it simply calls the apache bench (`ab`) with the URL to be benchmarked (http://localhost:3000/sync) as input and some options( `-k`, `-c`, `-n`).

- `-k` - Enable the HTTP KeepAlive feature
- `-c` - Number of multiple requests to perform at a time.
- `-n` - Number of requests to perform for the benchmarking session

The result is given below.

```text
Concurrency Level:      20
Time taken for tests:   23.247 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      66250 bytes
HTML transferred:       15000 bytes
Requests per second:    10.75 [#/sec] (mean)
Time per request:       1859.754 [ms] (mean)
Time per request:       92.988 [ms] (mean, across all concurrent requests)
Transfer rate:          2.78 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.6      0      10
Processing:    90 1783 414.3   1804    3655
Waiting:       90 1783 414.4   1804    3655
Total:         90 1783 414.5   1804    3655
```

## Async mode benchmark

Now let's benchmark the asynchronous mode.

```shell
ab -k -c 20 -n 250 "http://localhost:3000/async"
```

And the results are as follows.

```text
Concurrency Level:      20
Time taken for tests:   10.141 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      66250 bytes
HTML transferred:       15000 bytes
Requests per second:    24.65 [#/sec] (mean)
Time per request:       811.281 [ms] (mean)
Time per request:       40.564 [ms] (mean, across all concurrent requests)
Transfer rate:          6.38 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.5      0       3
Processing:    97  776 120.5    802     874
Waiting:       95  776 120.6    802     874
Total:         97  776 120.3    802     874
```

## Comparison

| Metrics               | sync                         | async                                              |
|-----------------------|------------------------------|----------------------------------------------------|
| Concurrency Level     | 20                           | 20                                                 |
| Time taken for tests: | 23.247 seconds               | 10.141 seconds                                     |
| Complete requests:    | 250                          | 250                                                |
| Failed requests:      | 0                            | 0                                                  |
| Keep-Alive requests:  | 250                          | 250                                                |
| Total transferred:    | 66250 bytes                  | 66250 bytes                                        |
| HTML transferred:     | 15000 bytes                  | 15000 bytes                                        |
| Requests per second:  | 10.75 [#/sec] (mean)         | 24.65 [#/sec] (mean)                               |
| Time per request:     | 1859.754 [ms] (mean)         | 811.281 [ms] (mean)                                |
| Time per request:     | 92.988 [ms] (mean, across al | 40.564 [ms] (mean, across all concurrent requests) |
| Transfer rate:        | 2.78 [Kbytes/sec] received   | 6.38 [Kbytes/sec] received                         |

As you can see, `async` mode performs better than `sync` mode. The `async` mode handles more request/sec than `sync` mode and its time/request is less compared to that of `sync` mode.

## Conclusion

As per the benchmark results, `async` mode performs better than `sync` mode when performing I/O (even though the test case doesn't perform any I/O operations). Hashing using `bcrypt` is a CPU intensive operation and when hashing strings using bcrypt in async mode, it uses the thread pool and doesn't block the event loop.

Always use `async` mode when your code needs to perform some blocking I/O operations as it doesn't block the event loop.