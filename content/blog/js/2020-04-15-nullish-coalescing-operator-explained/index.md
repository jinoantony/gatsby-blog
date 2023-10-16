---
title: "Nullish Coalescing Operator Explained"
date: "2020-04-19"
draft: false
slug: "/blog/nullish-coalescing-operator-explained"
tag: "Javascript"
author: "Jino Antony"
description: "Nullish coalescing operator is a new operator in javascript, which is actually an ES2020 specification. It is a logical operator which returns its RHS operand when the LHS operand is nullish (null or undefined), otherwise returns its LHS operand."
tags:
  - "Tag"
---

Nullish coalescing operator is a new operator in javascript, which is actually an ES2020 specification. It is a short-circuiting operator much like the `&&` and `||` operators.

## What is it?

Nullish coalescing operator (`??`) is a logical operator that returns its RHS operand when the LHS operand is `nullish` (null or undefined), otherwise returns its LHS operand.

```js
const name = null ?? 'John Doe'
// output: John Doe
```

## Why do we need it?

Prior to nullish coalescing operator, the logical OR (`||`) operator is used to check for nullish values.

```js
const name = null || 'John Doe'
// output: John Doe
```
But the problem is `||` check for `truthy` or `falsy` value. That is it returns RHS operand when LHS operand is `falsy` (null, undefined, false, 0, '', NaN), otherwise it returns LHS operand.

```js
const name = '' || 'John Doe'
// output: John Doe

const name = '' ?? 'John Doe'
// output: ''
```

To better understand the problem, consider the following code sample.

```js
function joinArray(array, delimiter) {
  delimiter = delimiter || ',';
  return arr.join(delimiter);
}
```

In this example, the `delimiter` parameter is optional. `,` will be the default value if no value is passed for the delimiter parameter. But there is a bug in this code. What happens if we want to join the array without any delimiters, that is using '' as the parameter?

```js
let joined = joinArray(['Find', 'the', 'bug'], '');
// expected output: Findthebug
// actual output: Find,the,bug
```

As you can see, the expected output is 'Findthebug', but the actual output is 'Find,the,bug'. This is because the `||` operator only checks if the operands are `truthy` or `falsy` and the empty string (`''`) evaluates to false. So the RHS operand, comma (`,`) in this case is returned.

We can fix this bug easily by replacing `||` with `??`.

```js
function joinArray(array, delimiter) {
  delimiter = delimiter ?? ',';
  return arr.join(delimiter);
}
```

And we get the correct results.

```js
let joined = joinArray(['Find', 'the', 'bug'], '');
// output: Findthebug
```

## Note on Chaining with AND or OR operators

It is not possible to chain AND (&&) and OR (||) operators directly with `??`. Combining this will throw a syntax error.

```js
const name = null || undefined ?? 'John Doe'
//Uncaught SyntaxError: Unexpected token '??
```

If you need you to combine them, then you must wrap one of the operator groups in parenthesis.

```js
const name = (null || undefined) ?? 'John Doe'
```

This will remove the ambiguity and anyone reading the code can immediately understand what it does. Happy Coding!