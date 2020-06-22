---
slug: '/blog/multi-user-authentication-using-guards-in-laravel-5.6'
date: '2018-06-18'
draft: false
title: 'Multi-user Authentication Using Guards in Laravel 5.6'
author: 'Jino Antony'
category: 'Laravel'
tag: 'Laravel'
firstLetter: true
canonical: 'https://medium.com/@JinoAntony/multi-user-authentication-using-guards-in-laravel-5-6-f18b4e61bdde'
description: 'User authentication in laravel is pretty much easy. Laravel ships with user authentication scaffolding out of the box. But how can we implement a multi user authentication? Let’s look into multi-user authentication using laravel guards.'
---

User authentication in laravel is pretty much easy. Laravel ships with user authentication scaffolding out of the box. But how can we implement a multi user authentication? Let’s look into multi-user authentication using laravel guards.

Let’s start by creating a fresh laravel installation.

```shell
composer create-project --prefer-dist laravel/laravel multi-auth
```

We have 3 types of users.

1. Admins

1. Subadmins

1. Users

Now let’s create the migrations.

```php
Schema::create('admins', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email',100)->unique();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
});

Schema::create('subadmins', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email',100)->unique();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});

Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('first_name');
    $table->string('last_name');
    $table->string('email',100)->unique();
    $table->string('phone');
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```

If you need to reset passwords then create the “password_resets” table.

```php
Schema::create('password_resets', function (Blueprint $table) {
    $table->string('email',100)->index();
    $table->string('token');
    $table->timestamp('created_at')->nullable();
});
```

Now run the migrations.

```shell
php artisan migrate
```
You also need to create models for your tables using the following command.

```shell
php artisan make:model YourModelName
```

> Note: For laravel authentication to work, your model must extend **Authenticatable.**

```php
<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    /**
        * The attributes that are mass assignable.
        *
        * [@var](http://twitter.com/var) array
        */
    protected $fillable = [
        'name', 'email', 'password',
    ];
}
```

To generate authentication scaffolding run the command.

```shell
php artisan make:auth
```
This command will generate the basic views and controllers for authentication.

Now we can configure the guards. You can read more about guards here: [https://laravel.com/docs/5.6/authentication#adding-custom-guards](https://laravel.com/docs/5.6/authentication#adding-custom-guards)

Open config/auth.php and in the guards section add these gurads.

```php
'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'subadmin' => [
            'driver' => 'session',
            'provider' => 'subadmins',
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],
```

Add these providers to the providers section.

```php
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\User::class,
    ],

    'admins' => [
        'driver' => 'eloquent',
        'model' => App\Admin::class,
    ],

    'subadmins' => [
        'driver' => 'eloquent',
        'model' => App\Subadmin::class,
    ],
],
```

If you have password resets table then add these to the passwords section.

```php
'passwords' => [
    'users' => [
        'provider' => 'users',
        'table' => 'password_resets',
        'expire' => 60,
    ],

    'admins' => [
        'provider' => 'admins',
        'table' => 'password_resets',
        'expire' => 60,
    ],

    'subadmins' => [
        'provider' => 'subadmins',
        'table' => 'password_resets',
        'expire' => 60,
    ],
],
```

Now you have to replicate the auth controllers for your admin model and subadmin model. Just copy the LoginController located at app/Http/Controllers/Auth directory and rename it to AdminLoginController and SubadminLoginController, then add some methods to the newly created controllers.

AdminLoginController.php

`gist:jinoantony/48477327219d05d8b21e4054fa127ebb#AdminLoginController.php`

SubadminLoginController.php

`gist:jinoantony/ad51310701c80bcff6ed96d662615891#SubadminLoginController.php`

You have to do the same procedure for RegisterController and ForgotPasswordController.

The middleware used here is `guest` which is located at app/Http/Middleware/ RedirectIfAuthenticated.php. We need to modify it.

`gist:jinoantony/8d9dfaae199242fbccdd99f65110cfa7#RedirectIfAuthenticated.php`

This middleware help us to redirect the user if authenticated. We can specify the guard and where to redirect by passing those arguments to the middleware.

Now let’s create another middleware for authentication by running the following command.

```shell
php artisan make:middleware AssignGuard
```
`gist:jinoantony/a1a7d682645fd0699cd1b6d3a73a216b#AssignGuard.php`

This middleware checks if the user is authenticated or not. If the user is not authenticated he will be redirected to the login page.

In order the middleware to work we need to register it. For that, go to app/Http/Kernel.php and add the following to the $routeMiddleware array.

```php
'assign.guard' => \App\Http\Middleware\AssignGuard::class,
```
Now we can use the middleware in our routes. Open routes/web.php and add your routes.

`gist:jinoantony/3d86908ff77caa1f8fada650774ec407#web.php`

We also have to replicate the views. Go to resources/views/auth directory and replicate the login views for admin and subadmin. Don’t forget to change the url for login.

That’s it. We have implemented multi-user authentication. You can also add more user levels by adding new guards. The source code is available [on github.](https://github.com/jinoantony/laravel-multi-auth)
