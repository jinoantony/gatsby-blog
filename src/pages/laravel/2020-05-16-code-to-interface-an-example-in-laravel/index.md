---
slug: '/blog/code-to-interface-an-example-in-laravel'
date: '2020-05-16'
draft: false
title: 'Code to Interface: An Example in Laravel'
author: 'Jino Antony'
category: 'Laravel'
tag: 'Laravel'
description: 'Code to an interface is a technique used in programming where you build your application based on abstractions(interface) and not concretions(classes).'
---

Code to an interface is a technique used in programming where you build your application based on abstractions (interface) and not concretions (classes).

If you are a programmer then you might have heard the phrases like **code to interfaces, not implementations**, **program to interfaces**, **use abstractions instead of concretion**, etc.

It all refers to the same thing. We should code our application in such a way that it should depend on abstractions (interfaces) instead of concretion (classes).

## Why?

This is my exact reaction when I first heard the phrase. Why would I use interfaces instead of classes? Even if I created an interface I would also need to create a class implementing that interface. Isn't it a wastage of time?

Certainly **No**!!

The one constant thing in this world that doesn't change is change itself or to put it otherways **change** is the only **constant**. 

In the case of programming also there is no exception for this rule. Business requirements change over time and so does our code.

So our code must be flexible.

Code to interface makes our code loosely coupled and flexible.

## How?

Consider the code sample below.

```php
class Logger {

    public function log($content) 
    {
        //Logs content to file.
        echo "Log to file";
    }
}
```

This is a simple class that logs content to a file. We can use it in our controller.

```php
class LogController extends Controller
{
    public function log()
    {
        $logger = new Logger;
        $logger->log('Log this');
    }
}
```

But what if we want to log to multiple targets like `db`, `file`, `cloud`, etc.

Then we can change our `LogController` class and `Logger` class to accommodate these changes.

```php
class Logger {

    public function logToDb($content) 
    {
        //Logs content to db.
    }

    public function logToFile($content) 
    {
        //Logs content to file.
    }

    public function logToCloud($content) 
    {
        //Logs content to cloud.
    }
    
}
```

```php
class LogController extends Controller
{
    public function log()
    {
        $logger = new Logger;

        $target = config('log.target');

        if ($target == 'db') {
            $logger->logToDb($content);
        } elseif ($target == 'file') {
            $logger->logToFile($content);
        } else {
            $logger->logToCloud($content);
        }
    }
}
```

Okay, now we can log to different targets. But what if we want to add another target such as log to a `redis` server. We will end up modifying both the `Logger` class and the `LogController` class.

As you can see this quickly get out of our hands and code becomes messy. The `Logger` class quickly became a monolith. This is a nightmare to maintain.

So we need to split things. Following the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles, we can move responsibilities to their corresponding classes.

```php
class DBLogger
{
    public function log()
    {
        //log to db
    }
}

class FileLogger
{
    public function log()
    {
        //log to file
    }
}

class CloudLogger
{
    public function log()
    {
        //log to cloud
    }
}
```

And the Controller is changed to

```php
class LogController extends Controller
{
    public function log()
    {
        $target = config('log.target');

        if ($target == 'db') {
            (new DBLogger)->log($content);
        } elseif ($target == 'file') {
            (new FileLogger)->log($content);
        } else {
            (new CloudLogger)->log($content);
        }
    }
}
```