---
title: How Composer Autoloads PHP Files
date: '2020-04-26'
draft: false
slug: /blog/how-composer-autoloads-php-files
tag: PHP
author: Jino Antony
description: >-
  Composer is an application-level dependency manager for PHP. Dependency simply
  means libraries/packages your application depends upon. Apart from managing
  the dependencies, composer will also autoload the files needed for the application.
coverImage: composer.png
---

Composer is an application-level dependency manager for PHP. Dependency simply means libraries/packages your application depends upon. Apart from managing the dependencies, composer will also autoload the files needed for the application. Most of the frameworks (Laravel, Symfony, etc) use composer and it's autoloading by default.

## What is autoloading?

Autoloading means the automatic loading of the files required for your project/application. That is including the files required for your application without explicitly including it with `include()` or `require()` functions.

> Autoloading allows us to use PHP files without the need to require() or include() them and is considered a hallmark of modern-day programming.


## Why do we need it?

Including files using `include()` or `require()` will be ok if your project contains less no. of files. But most of the real-world applications contain a huge no. of files. So including files using the above-mentioned functions will become a tedious task. It will become even more difficult if our project depends on a lot of external libraries/packages.

So we need an easy way of loading files. Autoloading can help us here. 

## How It works?

Let's take a look at a simple autoloader.

```php
class Autoloader
{
    public function autoLoad($className) 
    {
        //logic for finding class path
        include $fullyResolvedPath;
    }
}

spl_autoload_register(['Autoloader', 'autoLoad']);

$obj = new DemoClass;
```
Here we used the built-in php function `spl_autoload_register()` to register our autoload function. What this does is it tells php

"Hey if you can't find the class yourself, let me find it for you. If I can't find it, then throw an error."

Inside the autoloader we provided, we can find the path to the class and then include it using the `include()` function.

## Types of autoloading

Composer supports the following types of autoloading.

1. Classmap
2. PSR-0
3. PSR-4
4. Files

Autoloading types and its rule can be defined in the `composer.json` file. You can configure multiple types of autoloading in a single application. Among these [PSR-4](https://www.php-fig.org/psr/psr-4/) and [PSR-0](https://www.php-fig.org/psr/psr-0/) are the autoloading standards proposed by the [PHP-FIG](https://www.php-fig.org/) Group.

### Classmap

Classmap as its name implies creates a mapping of all the classes inside the specified directories into a single key => value array, which can be found in the generated file `vendor/composer/autoload_classmap.php`. The automatic file generation happens on `composer install/update`.

```json
{
    "autoload": {
        "classmap": ["src/", "lib/", "Something.php"]
    }
}
```

The mapping is done by scanning for all classes inside `.php` and `.inc` files in the specified directories. This is the fastest way of autoloading since it uses array lookup for finding the classes.

### PSR-0

This is the PSR standard for autoloading files before PSR-4 and it is now **Deprecated**. You can define the PSR-0 rules in the config file as a mapping from namespace to paths, relative to the package/application root.

```json
{
    "autoload": {
        "psr-0": {
            "Acme\\Foo\\": "src/",
            "Vendor\\Namespace\\": "src/",
            "Vendor_Namespace_": "src/"
        }
    }
}
```

All PSR-0 references are combined into a single key => value array, which can be found in the generated file`vendor/composer/autoload_namespaces.php`. During autoloading PSR-0 looks for the namespace in the generated array and resolves the path from its value.

For example, `Acme\Foo\Bar` would resolve to `src/Acme/Foo/Bar.php`. PSR-0 also supports underscores(`_`) in class names. Each `_` character in the class name is converted to a `DIRECTORY_SEPARATOR`. So that `Acme_Foo_Bar` would also be resolved to `src/Acme/Foo/Bar.php`.

### PSR-4

PSR-4 is currently the recommended way of autoloading since it offers greater ease of use.

```json
{
    "autoload": {
        "psr-4": {
            "Acme\\Foo\\": "src/",
            "Vendor\\Namespace\\": ""
        }
    }
}
```

Unlike PSR-0 underscores **will not** be converted to `DIRECTORY_SEPARATOR` and the namespace prefix is not present in the path.

For example, `Acme\Foo\Bar` would resolve to `src/Bar.php`.

All the PSR-4 references are combined, during install/update into a single key => value array, which can be found at `vendor/composer/autoload_psr4.php`.

### Files

Classmap, PSR-0, and PSR-4 deal with classes only. If you want to autoload functions, you can use `files` autoloading. This can be useful to load your helper functions. These files will be loaded on every request.

```json
{
    "autoload": {
        "files": ["src/helpers.php"]
    }
}
```

## Note on Classmap and PSR-4

Classmap autoloading is the fastest among autoloaders since it loads classes from the prebuilt array. But the problem with classmap is that you need to regenerate the classmap array every time you create a new class file. So in the development environment PSR-4 autoloading will be the most suited one.

PSR-4 autoloading will be slower compared to classmap because, it needs to check the filesystem before resolving a classname conclusively. But in production you want things to be as fast as possible.

For this reason, composer offers classmap generation from PSR-4. Classmap generation converts all PSR-4/PSR-0 rules into classmap rules. So autoloading will be faster. If a PSR-4 class is not found in the generated classmap, the autoloading fallback to PSR-4 rules.

Classmap generation can be enabled in any of the following ways.

- Set `"optimize-autoloader": true` inside the config key of composer.json
- Call `install` or `update` with `-o` / `--optimize-autoloader`
- Call `dump-autoload` with `-o` / `--optimize`

## Putting it all together

Now we can look into how composer autoloads our files combining all these autoloaders. First of all, we need to include composer's `autoload.php` file.

```php
require __DIR__.'/../vendor/autoload.php';
```

It requires another file `composer/autoload_real.php` and calls the `getLoader()` method on the generated composer autoloader class.

```php
require_once __DIR__ . '/composer/autoload_real.php';

return ComposerAutoloaderInitcac18dc222d8ea1e03bdef8b44290883::getLoader();
```

In the `getLoader()` method, composer loads all autoloader arrays which are generated on `composer install/update` or on `composer dump-autoload` and it also registers the autoload function using the `spl_autoload_register()` which is mentioned earlier.

```php
// autoload_real.php
public static function getLoader()
{
    // ...
    self::$loader = $loader = new \Composer\Autoload\ClassLoader();
    // Loads all autoloader arrays
    $loader->register(true);
    // ...
    return $loader;
}
```

The `register()` method in `ClassLoader` class register the autoload function `loadClass()`.

```php
class ClassLoader
{
    public function register($prepend = false)
    {
        spl_autoload_register(array($this, 'loadClass'), true, $prepend);
    }
}
```

The `loadClass()` method is simple. It calls another method `findFile()` with the class name and if the method returns a valid file path, then it class another helper function `includeFile()` with the file path, which simply includes the file at the given file path.

```php
public function loadClass($class)
{
    if ($file = $this->findFile($class)) {
        includeFile($file);

        return true;
    }
}
```

The `findFile()` method is responsible for finding the file path. Since its implementation is a little bit complex, we won't discuss it here. But all you need to know is that it checks for file path lookup in the following way.

1. Check if classmap contains the specified class if found return immediately with the file path.
2. If the file is not found in classmap, psr-4 lookup is made, if found return with the generated file path.
3. If the psr-4 lookup is not successful, psr-0 lookup is made, if found return with the generated file path.

That's it. Composer does a good job of autoloading your files and provides you with a variety of options to configure them and make development a breeze.