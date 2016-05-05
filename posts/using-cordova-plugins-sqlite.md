# Using Cordova Plugins - SQLite

You can't go far when creating hybrid applications with Cordova without the use of external plugins. Since basically all applications have to store some data somewhere, in this post we'll take a look on how to set up an SQLite plugin that allows us to store and manage data in our application.

### Application

We already have a raw, sample-based Cordova application, which we [created last time](http://mycodesmells.com/post/getting-started-with-apache-cordova/), but we need to have some kind of idea what we want to do. Our app will be super simple, as we want the ability to save some data items, browse them, edit and delete. As time goes by, we might be adding some new features, but that's all for now.

In order to do that, we need some 3rd party solution for data storage. Fortunately, Cordova docs are pretty good and you can quickly find a page on [data storage](https://cordova.apache.org/docs/en/latest/cordova/storage/storage.html). All of the sudden, with the very first thing we want to do with Codova, we face the problem we thought will never come. It's not that easy to create exactly the same code base for Android, iOS and Windows devices! If you take look on that docs page, you'll see that suggested plugins are often not supported on one of the platforms. Our choice will be [cordova-sqlite-ext](https://github.com/litehelpers/cordova-sqlite-ext) as it seems to provide the best support.

### Setting up the plugin

We first need to add the plugin to Cordova configuration with a simple

    cordova plugin add cordova-sqlite-ext

And now we can use the plugin in our code. But how exactly? Can it work with an Angular application? In the world of hybrid apps, Angular 1.x is still the way to go, so it has to work somehow. There is something important you have to realize at this point: you need to start your Angular application after the `deviceready` event is fired by the device. In order to start the application manually, instead of automatically, you need to do two things:

- remove `ng-app` attribute from your application's root HTML element
- call angular bootstrap manually somewhere in the code (`crud` is the name of our main module):


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['crud']);
    });

With this in mind, we can change the default `js/index.js` file to start angular app manually:

    var cordovaApp = {

        initialize: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['crud']);
            });
        }

    };

    cordovaApp.initialize();

Then in our `database` module we need to open the connection with our SQLite database, create some tables and we can start using it:

    angular.module('database', [])
        .factory('Database', function () {

            var db = window.sqlitePlugin.openDatabase({
                name: 'crud.db',
                location: 'default'
            });
            db.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER, name TEXT, age INTEGER)', []);

            function getCount(cb) {
                db.executeSql('SELECT COUNT(*) as count FROM items', [], function (result) {
                    cb(result.rows.item(0).count);
                });
            }

            return {
                getCount: getCount
            }

        });

Then in our main module we can import `database` and start using the API for _items_ table:

    var app = angular.module('crud', ['database']);

    app.controller('MenuController', function($scope, Database) {

        Database.getCount(function(err, count){
            $scope.$apply(function(){
                if (err) {
                    return;
                }
                $scope.count = count;
            });
        });

    });

And with some tricks with bootstrap, some styling we can see the end result with _Browse_ button displaying the current count of items in the database.

<image src="https://raw.githubusercontent.com/mycodesmells/cordova-crud/master/posts/images/menu-with-count-0.png" height="500px" />

As we don't have the logic to add anything yet, I've inserted one item programatically,

    db.executeSql('INSERT INTO items(id, name, age) VALUES (?, ?, ?)', [1, "timmy", 40]);

and it has been reflected in the UI:

<image src="https://raw.githubusercontent.com/mycodesmells/cordova-crud/master/posts/images/menu-with-count-1.png" height="500px" />

The code of this example is available [on Github](https://github.com/mycodesmells/cordova-crud).
