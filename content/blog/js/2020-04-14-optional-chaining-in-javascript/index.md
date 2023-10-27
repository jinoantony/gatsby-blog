---
title: "Optional Chaining In Javascript"
date: "2020-04-14"
draft: false
slug: "/blog/optional-chaining-in-javascript"
tag: "Javascript"
author: "Jino Antony"
coverImage: "chain.jpg"
coverImageTitle: "Photo by Matthew Lancaster on Unsplash"
description: "Optional Chaining is a new feature available in Javascript. It is actually a ES2020 specification. Optional chaining allows developers to write code which are more readable and less verbose."
---

Optional Chaining is a new feature available in Javascript. 
It is actually a ES2020 specification. Optional chaining allows developers to 
write code which are more readable and less verbose.

## What is it?

Optional chaining as it name implies, help us to chain the properties
of an object optionally. That is, we can chain properties of an object to many levels
without having to expressly validate that each reference in the chain is valid.

## What problem does it solve?

Consider the code sample below.

```js
let person = {
  name: "John Doe",
  address: {
    place: "New York",
    city: "New York"
  }
}
```
We can access the person's Place like this

```js
let place = person.address.place
```
But this will throw an error if the address property is missing.

```js
Uncaught TypeError: Cannot read property 'place' of undefined
```

So we have to check if `address` property exists before accessing its children

```js
let place = person.address && person.address.place
```

Ok, but what if we have to access the children attribute of `place`. We have to add validation check for place also.

```js
let place = person.address 
  && person.address.place 
  && person.address.place.name
```
This became a nightmare when we have to access deeply nested objects or attributes.

So let's see how this problem can be solved using optional chaining.

```javascript
let place = person.address?.place?.name
```

Much more readable and neater 🥰

## How does it work?

The `.?` operator functions similar to the `.` chaining operator, except when an attribute or reference is `null` or `undefined`, the expression short-circuits with a value of `undefined`.

For the above one line code, it works like this.

First it check if `person.address` is `nullish` (null or undefined) or not. If it is nullish, then the expression immediately return `undefined` without executing the remaining parts. Otherwise it continues executing the next part of the expression.

## Tell me more

Optional chaining is a great feature to easily access deeply nested object properties without intermediatory condition checks, but it is not limited to that. 

Optional chaining became real handy on several other occasions.

### Optional Chaining with function calls

Optional chaining operator can also validate function calls.
```js
let message = resultObject.getMessage?.()
```

### Dealing with optional callbacks

Optional chaining can also be used to check if a callback is defined.

```js
function fetchApi(url, onSuccess, onError) {
  // if error occured
  onError?.('An error occured')
}
```

### Accessing array items

It can also validate if an array has the specified index.

```js
let item = arr?.[1]
```

## Browser Support

At the time of writing, optional chaining is supported by only a few browsers. You can check the detailed browser compatibility [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#Browser_compatibility)
