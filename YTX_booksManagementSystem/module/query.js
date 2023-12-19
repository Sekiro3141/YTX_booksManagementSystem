const pool = require("../module/pool");

const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    })
}

module.exports = query;