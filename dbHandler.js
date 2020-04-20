module.exports = {

  /**
   * Runs a query as a Promise and returns a Promise
   *
   * @param
   * @return a Promise resolving to the values asked
   */
  run: function (db, query) {
    return new Promise((resolve, reject) => {
      db.query(query)
        .then(res => {
          console.log('\x1b[33m>> ' + query + '\x1b[0m');
          resolve(res.rows);
        })
        .catch(err => {
          console.error('\x1b[31mDB ERROR >> ' + query + '\x1b[0m');
          console.error(err);
          reject(err);
        });
    });
  },

  selectAll: function (db, table) {
    return new Promise( (resolve, reject) => {

      if (db && table ) {
        let query = 'SELECT * FROM "' + table + '";';
        resolve(this.run(db, query));
      }

      else reject();
    });
  },

  selectAllWhere: function (db, table, id) {
    return new Promise((resolve, reject) => {

      if (db && table && id) {

        let query =
          'SELECT * ' +
          'FROM "' + table + '"' +
          ' WHERE "id" = \'' + id + '\'';

        resolve(this.run(db, query));
      }

      else reject();
    });
  },

  insertInto: function (db, table, insert) {
    return new Promise((resolve, reject) => {

      if (db && table && insert) {

        keys = Object.keys(insert);

        // PostgreSQL expect identifiers (keys) in "double quotes" and strings (values) in 'single quotes'
        keysEscaped = keys.map(key => '"' + key+ '"');
        
        valuesEscaped = keys.map(key => {
          value = insert[key];

          if (typeof value == 'number') {
            return value;
          }
          else {
            return '\'' + value + '\'';
          }
        });

        let query =
          'INSERT INTO "' + table + '"' +
          ' (' + keysEscaped.join(',') + ')' +
          ' VALUES (' + valuesEscaped.join(',') + ');';

        resolve(this.run(db, query));
      }

      else reject();
    });
  },

  update: function (db, table, id, update) {
    return new Promise((resolve, reject) => {

      if (db && table && id && update) {

        // if the UPDATE is performed on an empty record, it should raise an error
        this
          .selectAllWhere(db, table, id)
          .then(data => {
            if (data.length == 1) {
              updateKey = Object.keys(update)[0];

              let query =
                'UPDATE "' + table + '"' +
                ' SET ' + updateKey + '= \'' + update[updateKey] + '\'' +
                ' WHERE "id" = \'' + id + '\'';

              resolve(this.run(db, query));
            }

            else reject("Record not found in database");
          })
          .catch(err => {
            reject(err);
          });
      }

      else reject();
    });
  },

  delete: function (db, table, id) {
    return new Promise((resolve, reject) => {

      if (db && table && id) {

        // if the DELETE is performed on an empty record, it should raise an error
        this
          .selectAllWhere(db, table, id)
          .then(data => {
            if (data.length == 1) {
              let query =
                'DELETE FROM "' + table + '"' +
                ' WHERE "id" = \'' + id + '\'';

              resolve(this.run(db, query));
            }
            
            else reject("Record not found in database");
          })

          .catch(err => {
            reject(err);
          });
      }

      else reject();
    });
  },
};