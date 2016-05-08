# Platorm Specific Actions In Cordova

Even though Cordova has been designed with a "write once, run on every platform" idea in mind, sooner or later comes that time when you need to perform something specific to Android or iOS. This short post explains how to do it quickly using an easy example of exiting an application.

### One of these things doesn't belong here

Not actually _things_, but platforms. This odd kid on the block is definitely _browser_. If you are equipped with a state-of-the art mobile device with the latest Android version, or a cool shiny iPhone 6, you probably prefer to stick with it during the whole development cycle. But chances are that your device is not quite fast, doesn't have the OS you need or it might not exist at all. That's what a _browser_ platform is for. But the problem is that nearly everything works differently in your desktop's browser than on any mobile device.

### Closing an application

Allowing the user to exit your application is something that you should never forget about. Obviously, a user can press a button to _go back_, or go to the main menu and then close your app via their device's manager, but this, honestly, stinks. It looks like you forgot that somebody could dare to finish using your product, and it doesn't look professional. Yep, I've seen such apps and it was so confusing how to exit them properly!

In order to allow our users to exit, we need to add an appropriate method to our `MenuController`:

    app.controller('MenuController', function ($scope, Database) {
        ...
        $scope.exit = function () {
            navigator.app.exitApp();
        };
    });

If you run this on Android device, it works perfectly. How about a browser platform? Here comes platform-specific quirks.

### What is a current platform?

As long as you want to check if you are using _browser_ or not, you just need to check if `navigator.app` object is present:

    if (navigator.app) {
        navigator.app.exitApp();
    } else {
        window.close();
    }

And now it looks good on both `browser` and `android`. What if you want to be more specific? What if you don't want to show a joke to the user, but don't want to joke about Microsoft with Windows users? You can always check what value is stored in `cordova.platformId` proerty. It is exactly the same as a platform you add when creating your cordova app.

    switch (cordova.platformId) {
        case android:
            console.log('Hello, Android User!');
            return;
        case windows:
            console.log('Hello, Windows User!');
            return;
        case ios:
            console.log('Hello, iOS User!');
            return;
    }

### Summary

To sum up, I would strongly recommend you to try to avoid `if`-ing or `switch`-ing your code depending on the platform. The code looks messy when you do that, it's harder to maintain and test, and it might lead to using different plugins on each platform which quickly can turn your application into a nightmare. But in the end, if you absolutely need to do it, you can, without much effort.

The code of this example is available [on Github](https://github.com/mycodesmells/cordova-crud).
