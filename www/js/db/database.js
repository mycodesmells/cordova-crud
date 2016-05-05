(function () {

    angular.module('database', [])
        .factory('Database', function () {

            var db = window.sqlitePlugin.openDatabase({
                name: 'crud.db',
                location: 'default'
            });
            db.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER, name TEXT, age INTEGER)', []);

            function getCount(done) {
                db.executeSql('SELECT COUNT(*) as count FROM items', [], function (result) {
                    done(null, result.rows.item(0).count);
                }, function (err) {
                    done(err);
                });
            }

            return {
                getCount: getCount
            }

        });

})();