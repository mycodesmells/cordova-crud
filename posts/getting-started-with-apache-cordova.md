# Getting Started With Apache Cordova

Long gone are times when Java Script was used only to create simple web pages, or slightly more complicated web applications. Nowadays, thanks to Node, you can build entire full-stack JS apps using the same language for both frontend and backend. Furthermore, you can even build desktop applications (popular example is text-editor Atom). But how about mobile apps? There are a couple of solutions, so today we take a look on Apache Cordova.

### Idea

You might be wondering, how could we create an application for mobile devices using just JS? Well, technically you cant't. But with Apache Cordova handling some native-to-js bindings, you can focus on creating your app's logic and appeareance as if it would be a web page. Cordova is used to wrap that in so called Web View, so that it could be ran just as any other application on the device.

The idea of Apache Cordova and _hybrid_ applications created with them is simple: you create a web page and decide which mobile platforms you want to support. Then, you can take our _page_ and build it to executable files for _android_, _ios_ and _windows_. Sounds impressive, isn't it? Let's take a look on how to set up your environment to get started with your app.

### Installation

First, we need to install cordova via npm:

    npm install -g cordova

Thanks to this last command, you can use `cordova` command from anywhere, so we can jump straight into creating a new project:

    cordova create cordova-crud

If you take a look into a newly created directory, you should see a couple of subdirectories, with `www` as the most important one, as it stores our web application. Another one which will be usefule in the future is `plugins`, which stores.. plugins. Yeah, they are necessary for using some platform-specific or rather device-specific functionalities such as camera, geolocation etc. We are not using it at the moment, but you should definitely be aware of this.

Last but not least is a configuration file - `config.xml` which stores some default values, but once our application grows, we might need to make some changes there.

### Android Support

To make our application available to Android devices, all you need to do is add the OS to a list of supported platforms. You do that just by running a simple command:

    cordova platform add android

Now this wasn't hard, was it? The tricky thing is, that you cannot build your application without an appropriate Android SDK. The fastest way to do is is to go straight to [Android Studio and SDK page](http://developer.android.com/sdk/index.html) and download the whole thing. Once you download and install it, you need to add some environmental variables:

    # ~/.bashrc
    export ANDROID_HOME=/path/to/Android/Sdk
    export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

Thanks to this, you can access Android SDK manager with simple command:

    android

Now you can easily install various SDK versions (so you can target older Android OS versions) or emulators.

### Basic commands

To get started with creating hybrid applications you need to learn two commands. First, to build an _.apk_ file:

    cordova build

You can find the file in `/path/to/project/platforms/android/build/outputs/apk/android-debug.apk`

Constantly compiling, uploading and running our app on the device would be very slow, though. Thankfully, we can run the app on the phone or tablet directly by executing a cordova command:

    cordova run

**Note:** you need to have Developer settings enabled on the device and, obviously connected via USB cable to do that.

    $ cordova run
    ANDROID_HOME=/path/to/Android/Sdk
    JAVA_HOME=/usr/lib/jvm/java-8-oracle
    No target specified, deploying to device 'Baytrail45294766'.

    ... # gradle build happening here

    BUILD SUCCESSFUL

    Total time: 4.359 secs
    Built the following apk(s):
            /opt/workspace/mycodesmells/cordova-crud/platforms/android/build/outputs/apk/android-debug.apk
    Using apk: /opt/workspace/mycodesmells/cordova-crud/platforms/android/build/outputs/apk/android-debug.apk
    LAUNCH SUCCESS

### Running an Emulator

If you don't for some reason don't want to test your app on a real-life Android device, you can create an _Android Virtual Device (AVD)_ instead. First, you need to run ACD Manager:

    android avd

Then you can create your custom emulated device with a wizard (by clicking _Create_ button).

Now you can start your emulator and is should be available for `cordova run` command. To be honest I've had some mixed experiences with emulators, as sometimes I failed to start them, but if you succeed, they are really helpful (even if they are slower than an actual device).

### Debugging

This is something I was worried about at first, because I didn't know how it could be done on mobile device. As it turned out, this is so easy! Just fire up Google Chrome browser and go to an address:

    chrome://inspect/#devices

There you can see that there is our application running, then just click _inspect_ and a new window with developer options pops out. Now you can view, edit and monitor your web page in your hybrid application.

**Note:** in order to see your Web View application via Chrome's inspect page, the device must be using Android 4.4 or above.

### Summary

As you can see, getting started with hybrid applications is extremely easy. There are some problems you will face sooner or later, because the plugins are not always working, you need specific host operating systems to target different mobile platforms, and, finally, your page looks nowhere near the native application. But if you are okay with some extra work, you are in for a treat, as creating simple mobile apps have never been easier for web developers.