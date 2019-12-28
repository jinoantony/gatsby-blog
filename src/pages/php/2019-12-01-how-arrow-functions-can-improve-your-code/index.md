---
title: "How Arrow Functions Can Improve Your Code"
date: "2019-12-01"
draft: false
slug: "/blog/how-arrow-functions-can-improve-your-code"
tag: "PHP"
author: "Jino Antony"
description: "Arrow Functions aka Short Closures is a new feature available in PHP 7.4. The new version of PHP comes with various new features, out of which arrow functions are the most awaited one. In this article I want to show you how arrow functions can improve your code."
coverImage: "code.jpg"
tags:
  - "Tag"
---

Arrow Functions aka Short Closures is a new feature available in PHP 7.4. The new version of PHP comes with various new features, out of which arrow functions are the most awaited one. In this article I want to show you how arrow functions can improve your code.

## Syntax

Ok, let's start by analysing the syntax for arrow function.

```php
fn($arg) => $arg
```

Looks a bit weird. But it's pretty awesome once you get over it. To understand what the above code does, we can take a look at it's equivalent normal function.

```php
function ($arg) {
    return $arg;
}
```

Yeah, the function just takes an argument and returns it. So arrow function is a normal function with a special `fn` keyword and no return statement? Probably Not!

## Features

These are some notable features of arrow functions.

- They start with the `fn` keyword.
- They can have only one expression.
- No `return` keyword.
- They inherit outer scope.

Arrow functions are quite known in the JS community. However short closures in PHP is not same as arrow functions in JS. As the name suggests short closures are intended to use as simple [Closures](https://www.php.net/manual/en/class.closure.php) and they are not a replacement for normal functions.

So let's look into how short closures can improve your code.

### PHP

Consider the below code sample. It's just a program to transform an array of names to capitalized valid names.

```php
$names = ['alex', 'john', null, 'michael'];

$validNames = array_filter($names, function($name) {
  return !is_null($name);
});
// ['alex', 'john', 'michael']

$capitalizedNames = array_map(function($name) {
  return ucfirst($name);
}, $validNames);
// ['Alex', 'John', 'Michael']
```
Now we can use arrow functions to transform the above code.

```php
$names = ['alex', 'john', null, 'michael'];

$validNames = array_filter($names, fn($name) => !is_null($name));
$capitalizedNames = array_map(fn($name) => ucfirst($name), $validNames);
```
🥰 Much neater and readable.

### Laravel

This can be transformed

```php
$apiKey = config('app.api_key');

$this->app->bind(PaymentInterface::class, function ($app) use ($apiKey) {
  return new Stripe($apikey);
});
```
to this

```php
$apiKey = config('app.api_key');

$this->app->bind(PaymentInterface::class, fn($app) => new Stripe($apikey));
```
As you can see there is no need to pass the outer scope variable using the `use` keyword.

When using eloquent, this can be transformed

```php
$place = 'New York';

$users = User::whereHas(['address' => function($q) use ($place) {
  $q->where('place', $place);
}])
->get();
```
into this
```php
$place = 'New York';

$users = User::whereHas([
    'address' => fn($q) => $q->where('place', $place)
])->get();
```

Arrow functions will make you write less code and are more readable. While it's still not possible to write multi-line arrow functions in PHP, it may be possible in future versions.