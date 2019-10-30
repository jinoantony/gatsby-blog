---
path: '/blog/multi-user-api-authentication-using-laravel-jwt'
date: '2019-01-15'
title: 'Multi-User API Authentication Using Laravel JWT'
author: 'Jino Antony'
tag: 'Laravel'
description: 'RESTful API development using Laravel is quite easy. Laravel provides built-in support for API development using Laravel Passport and a rich ecosystem with tons of packages makes development a breeze.'
---

RESTful API development using Laravel is quite easy. Laravel provides built-in support for API development using Laravel Passport and a rich ecosystem with tons of packages makes development a breeze. Here we are going to use JWT for API authentication. JWT stands for JSON Web Tokens. You can read more about JWT [here](https://jwt.io/).

## Getting Started

Let’s get started by installing a fresh Laravel application.

```bash
    composer create-project --prefer-dist laravel/laravel multi-jwt-auth
```
For using JWT in laravel there is a popular package called [jwt-auth](https://github.com/tymondesigns/jwt-auth) created by [Sean Tymon](https://github.com/tymondesigns). Let’s install that package also.

```bash
    composer require tymon/jwt-auth 1.0.*
```

> Note: This article is only for Laravel version > 5.4 . You can read the full documentation [here](https://jwt-auth.readthedocs.io/en/develop)

Next, publish the config file using the command

```bash
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

This will publish a config file config/jwt.php that allows you to configure the basics of this package.

Now we need to set a secret key for the encryption and decryption of JWT tokens. For that run the below artisan command.

```bash
    php artisan jwt:secret
```

This will update your .env file with something like JWT_SECRET=foobar

## The Use Cases

We have 3 types of users.

1. Admins

2. Subadmins

3. Users (Normal users)

Let’s create the migrations.

![](https://cdn-images-1.medium.com/max/2516/1*iJS80l6Li_gMWDkq-9i3Pg.png)

Now run the migrations.

```bash
    php artisan migrate
```

Create corresponding models.

<!-- <iframe src="https://medium.com/media/f7ab7f8007017b4599dc4155c82062aa" frameborder=0></iframe> -->
> Note: Be sure to implement the JWTSubject contract.

### Configuring the Auth Guard

jwt-auth works by extending laravel’s auth system. So we need to configure the auth guards.

Open config/auth.php and add these guards.

```php
    'guards' => [

            'admins' => [
                'driver' => 'jwt',
                'provider' => 'admins',
            ],

            'subadmins' => [
                'driver' => 'jwt',
                'provider' => 'subadmins',
            ],

            'users' => [
                'driver' => 'jwt',
                'provider' => 'users',
            ],
     ],
```

Now let’s configure the provider details. Add these to the providers section.

```php
    'providers' => [

            'admins' => [
                'driver' => 'eloquent',
                'model' => App\Admin::class,
            ],

            'subadmins' => [
                'driver' => 'eloquent',
                'model' => App\Subadmin::class,
            ],

            'users' => [
                'driver' => 'eloquent',
                'model' => App\User::class,
            ],
    ],
```

### What is this guards Really? 😇

So let’s understand what these configurations imply.

Laravel uses guards for authentication. They define how the system should store and retrieve information about your users. We have defined 3 guards admins, subadmins, and users. Each guard has a driver and a model. The driver config tells the guard to use which method to authenticate users (usually session or api). The provider config indicates to which model the user is authenticated against and the driver used for the database connection. This is configured in the providers section.

You can also add more guards if you have more user hierarchies. If you need to know more about guards check out this [blog](https://mattstauffer.com/blog/multiple-authentication-guard-drivers-including-api-in-laravel-5-2).

Now let's configure the jwt settings. Open config/jwt.php and set the lock_user property to true.

```php
    'lock_subject' => true,
```

What this does is it instruct jwt to check if the user is authenticated against the correct table. This is done by adding a hash value of the table name to the generated token.

Now let’s create a custom middleware to instruct laravel to use the correct guard per route. Run the below artisan command to create a middleware.

```bash
    php artisan make:middleware AssignGuard
```

<!-- <iframe src="https://medium.com/media/6831fabb4782d54248d634aa85c34d5f" frameborder=0></iframe> -->

In order the middleware to work, we need to register it. For that, go to app/Http/Kernel.php and add the following to the $routeMiddleware array.

```php
    'assign.guard' => \App\Http\Middleware\AssignGuard::class,
```

Now add the middleware to the routes.

<!-- <iframe src="https://medium.com/media/3d0a9a8f91ef22d5539a6b7e53847560" frameborder=0></iframe> -->

And that’s it. We have implemented multi-user authentication using jwt. If you have any queries feel free to ask in the comments section. Thank you.
