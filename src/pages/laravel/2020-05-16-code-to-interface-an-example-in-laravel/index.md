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

The one constant thing in this world that doesn't change is change itself or to put it, in other words, **change** is the only **constant**. 

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

Much better. Now if we want to add other targets for logging we can create a new class and add it to the `if-else` in the Controller.

But still, our controller is responsible for choosing a logger. For the controller, it doesn't need to be aware of different loggers and choose between them. It only needs a logger class with a `log()` method for logging content.

### Interface for the win

This is an apt situation for using an interface. So what is an [interface](https://www.cs.utah.edu/~germain/PPS/Topics/interfaces.html)?

> An interface is a description of the actions that an object can do.

Coming to our example, the controller needs only a logger class with a `log()` method. So our interface must describe that it must have a `log()` action.

```php
interface Logger
{
    public function log($content);
}
```

As you can see it contains only function declaration and not its implementation, which is why it is called as `abstraction`.

When implementing an interface, the class which implements the interface must provide the implementation details of the abstract methods defined in the interface.

In our example, any class which implements the `Logger` interface must provide the implementation details for the abstract method `log()`.

We can then type-hint this interface in our controller.

```php
class LogController extends Controller
{
    public function log(Logger $logger)
    {
        $logger->log($content);
    }
}
```

Now the controller doesn't care which type of logger is passed to it. All it needs to know is that it must implement the `Logger` interface.

So we need to modify our logger classes to implement this interface.

```php
class DBLogger implements Logger
{
    public function log()
    {
        //log to db
    }
}

class FileLogger implements Logger
{
    public function log()
    {
        //log to file
    }
}

class CloudLogger implements Logger
{
    public function log()
    {
        //log to cloud
    }
}
```

We can now add more loggers without touching the existing code. All we have to do is create a new class that implements our `Logger` interface.

```php
class RedisLogger implements Logger
{
    public function log()
    {
        //log to redis
    }
}
```

Our code is now flexible and loosely coupled. We can swap the implementations any time we want without touching the existing code.

## Dependency Injection

When using a framework like Laravel, we can leverage its [Service Container](https://laravel.com/docs/7.x/container) to automatically inject the implementations for the interface.

Since Laravel supports [method-injection](https://laravel.com/docs/7.x/controllers#dependency-injection-and-controllers) out of the box, we only need to [bind the interface to its implementation](https://laravel.com/docs/7.x/container#binding-interfaces-to-implementations).

First, we need to create a configuration file for the logger. So create a file `config/log.php`

```php
<?php

return [
    'default' => env('LOG_TARGET', 'file'),

    'file' => [
        'class' => App\Log\FileLogger::class,
    ],

    'db' => [
        'class' => App\Log\DBLogger::class,
    ],

    'redis' => [
        'class' => App\Log\RedisLogger::class,
    ]
];
```

And in your `AppServiceProvider.php` inside `app/Providers` add the following code.

```php
class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $default = config('log.default');
        $logger = config("log.{$default}.class");

        $this->app->bind(
            App\Contracts\Logger::class, // the logger interface
            $logger
        );
    }
}
```

What this does is, it reads the default logger from the config file, and binds it to the `Logger` interface. So whenever we request `Logger` interface, the container resolves it a returns the default logger instance.

Since the default logger is specified using `env()` helper we can use different loggers in different environments like `file` in `local` environment and `db` in `production`.