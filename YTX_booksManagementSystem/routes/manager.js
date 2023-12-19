const router = require("koa-router")();
const query = require("../module/query");
const sd = require('silly-datetime');
const moment = require('moment');

router.post("/session", function (ctx) {
    ctx.body = {
        session: ctx.session
    }
});

// Admin registration
// router.get("/m_register", async (ctx) => {
//     await ctx.render("../views/manager/m_register");
// })
// router.post("/m_register", async (ctx) => {
//     let obj = ctx.request.body; // Receive data from the form
//     if (!obj.manager_zh) { // If the entered username is empty
//         ctx.body = {
//             code: 401,
//             msg: "manager_zh required"
//         };
//         return;
//     };
//     if (!obj.manager_ma) { // If the entered password is empty
//         ctx.body = {
//             code: 402,
//             msg: "manager_ma required"
//         };
//         return;
//     };
//     let sql = `insert into manager (manager_zh,manager_ma,manager_time) values (?,?,?)`;
//     let values = [obj.manager_zh, obj.manager_ma, sd.format(new Date(), 'YYYY-MM-DD')];
//     await query(sql, values).then((results) => {
//         if (results.affectedRows > 0) {
//             ctx.body = {
//                 code: 200,
//                 msg: "Administrator registration successful",
//                 data: {
//                     manager_zh: obj.manager_zh,
//                     manager_ma: obj.manager_ma
//                 }
//             };
//         } else {
//             ctx.body = {
//                 code: 201,
//                 msg: "Administrator registration error"
//             };
//         }
//     }, (err) => {
//         ctx.body = {
//             code: 201,
//             msg: "Administrator registration error",
//             reason: err
//         };
//     });

// })


// Admin login
router.get("/m_login", async (ctx) => {
    await ctx.render("../views/manager/m_login");
});

router.post("/m_login", async (ctx) => {
    let obj = ctx.request.body.params; // Receive data from the form
    if (!obj.manager_zh) { // If the entered username is empty
        ctx.body = {
            code: 401,
            msg: "Username is empty"
        };
        return;
    };
    if (!obj.manager_ma) { // If the entered password is empty
        ctx.body = {
            code: 402,
            msg: "Password is empty"
        };
        return;
    };
    let sql = `SELECT * FROM manager WHERE manager_zh=? AND manager_ma=?`;
    let values = [obj.manager_zh, obj.manager_ma];
    await query(sql, values).then((results) => {
        ctx.session.manager_zh = obj.manager_zh;
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Admin login successful",
                data: results[0]
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Admin login failed",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Admin login failed",
            reason: err
        };
    });
})


// Admin logout
// router.get("/m_logout", async (ctx) => {
//     await ctx.render("../views/manager/m_logout");
// })

// router.post("/m_logout", async (ctx) => {
//     let obj = ctx.request.body; // Receive data from the form
//     if (!obj.manager_zh) { // If the entered username is empty
//         ctx.body = {
//             code: 401,
//             msg: "Username is empty"
//         };
//         return;
//     };
//     if (!obj.manager_ma) { // If the entered password is empty
//         ctx.body = {
//             code: 402,
//             msg: "Password is empty"
//         };
//         return;
//     };
//     let sql = `delete from manager WHERE manager_zh=? AND manager_ma=?`;
//     let values = [obj.manager_zh, obj.manager_ma];
//     await query(sql, values).then((results) => {
//         if (results.affectedRows > 0) {
//             ctx.body = {
//                 code: 200,
//                 msg: "Admin logout successful",
//                 data: results[0]
//             };
//         } else {
//             ctx.body = {
//                 code: 201,
//                 msg: "Admin logout error",
//             };
//         }
//     }, (err) => {
//         ctx.body = {
//             code: 201,
//             msg: "Admin logout error",
//             reason: err
//         };
//     });
// });

// Admin information update
router.get("/m_update", async (ctx) => {
    await ctx.render("../views/manager/m_update");
})

router.post("/m_update", async (ctx) => {
    let obj = ctx.request.body; // Receive data from the form
    await query("select * from manager where manager_zh=?", obj.manager_zh).then((results) => {
        for (let key in obj) {
            if (obj[key] == "") {
                obj[key] = results[0][key]
            }
        }
    })

    let sql = `update manager set manager_age=?,manager_phone=?,manager_book_id=?,manager_ma=? WHERE manager_zh=?`;
    let values = [obj.manager_age, obj.manager_phone, obj.manager_book_id, obj.manager_ma, obj.manager_zh];
    
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Admin update successful",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Admin update error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Admin update error",
            reason: err
        };
    });
})

// Check Account
// router.get("/m_checkzh", async (ctx) => {
//     await ctx.render("../views/manager/m_checkzh");
// })

// router.get("/m_checkzh1", async (ctx) => {
//     let obj = ctx.query;
//     console.log(obj)
//     if (!obj.manager_zh) {
//         ctx.body = {
//             code: 401,
//             msg: "Account is empty!"
//         }
//     }
//     let sql = `select * from manager where manager_zh=?`;
//     let values = [obj.manager_zh];
//     await query(sql, values).then((results) => {
//         if (results.length > 0) {
//             ctx.body = {
//                 code: 201,
//                 msg: "This account exists, cannot register",
//             };
//         } else {
//             ctx.body = {
//                 code: 200,
//                 msg: "This account does not exist, you can register",
//             };
//         }
//     }, (err) => {
//         ctx.body = {
//             code: 201,
//             msg: "Administrator m_checkzh1 error",
//             reason: err
//         };
//     });
// })

// Check Account and Name
router.post("/AdminForgetPwd", async (ctx) => {
    let obj = ctx.request.body.params;
    if (obj.stu_id == '') {
        ctx.body = {
            code: 401,
            msg: "Account is empty!"
        }
        return
    }
    if (obj.stu_name == '') {
        ctx.body = {
            code: 402,
            msg: "Name is empty!"
        }
        return
    }
    let sql = `select * from manager where manager_zh=? and manager_name=?`;
    let values = [obj.manager_zh, obj.manager_name];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "The account and name match.",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "The account and name do not match.",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "The account and name do not match.",
            reason: err
        };
    });
})
// Administrator Password Update
router.post("/AdminUpdatePwd", async (ctx) => {
    let obj = ctx.request.body.params;
    let sql = `update manager set manager_ma=? WHERE manager_zh=? and manager_name=?`;
    let values = [obj.manager_ma, obj.manager_zh, obj.manager_name];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Administrator password updated successfully.",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Administrator password update failed.",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator password update failed.",
            reason: err
        };
    });
})
// Check Phone Number
// router.get("/m_checkphone", async (ctx) => {
//     await ctx.render("../views/monager/m_checkphone");
// })
// router.get("/m_checkphone1", async (ctx) => {
//     let obj = ctx.request.query; // Receive data from the form
//     if (!obj.manager_phone) {
//         ctx.body = {
//             code: 401,
//             msg: "Phone number is empty!!!"
//         }
//         return;
//     }
//     let sql = `select * from manager where manager_phone=?`;
//     let values = [obj.manager_phone];
//     await query(sql, values).then((results) => {

//         if (results.length > 0) {
//             ctx.body = {
//                 code: 201,
//                 msg: "This mobile phone number exists and cannot be used",
//             };
//         } else {
//             ctx.body = {
//                 code: 200,
//                 msg: "The phone number does not exist and can be used",
//             };
//         }
//     }, (err) => {
//         ctx.body = {
//             code: 201,
//             msg: "Administrator m_checkzh1 error",
//             reason: err
//         };
//     });
// })

// Get Current Administrator Information
// router.get("/m_getinfo", async (ctx) => {
//     await ctx.render("../views/monager/m_getinfo");
// })

// Get Current Administrator Information
router.get("/m_getinfo", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    let sql = `select * from manager where manager_zh=?`;
    let values = [obj.manager_zh];
    await query(sql, values).then((results) => {
        ctx.body = {
            code: 200,
            msg: "Query successful",
            data: results[0]
        };
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Query failed",
            reason: err
        };
    });
})


// Query Student Renewal Status
router.get("/AllRenewStatus", async (ctx) => {
    let sql = `SELECT book.book_id as id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse, borrow.borrow_date AS outDate,borrow.expect_return_date AS returnDate from book LEFT JOIN book_sort ON book.book_sort_id=book_sort.sort_id LEFT JOIN borrow ON borrow.book_id=book.book_id WHERE borrow.ApplicationStatus=1 and book.is_on = 0 order by borrow.borrow_date DESC`;
    await query(sql).then((results) => {
        results.map(item => {
            item.outDate = moment(item.outDate).format('YYYY-MM-DD');
            item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
            return item;
        })
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Query successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 200,
                data: [],
                msg: "Zero records",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server error",
            reason: err
        };
    });

})

// Modify Student Renewal Status
router.post("/addReturnBook", async (ctx) => {
    let obj = ctx.request.body.params;
    let sql = `select * from borrow WHERE book_id=?`;
    let values = [obj.bookId];
    let data = await query(sql, values)

    function DateAdd(interval, number, date) {
        /*
         * Function: Implement VBScript's DateAdd functionality.
         * Parameters: interval, string expression representing the time interval to add.
         * Parameters: number, numeric expression representing the number of time intervals to add.
         * Parameters: date, date object.
         * Returns: New date object.
         */
        switch (interval) {
            case "y ": {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
            case "q ": {
                date.setMonth(date.getMonth() + number * 3);
                return date;
                break;
            }
            case "m ": {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
            case "w ": {
                date.setDate(date.getDate() + number * 7);
                return date;
                break;
            }
            case "d ": {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
            case "h ": {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
            case "m ": {
                date.setMinutes(date.getMinutes() + number);
                return date;
                break;
            }
            case "s ": {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
            default: {
                date.setDate(d.getDate() + number);
                return date;
                break;
            }
        }
    }
    if (obj.ApplicationStatus === 3) {
        // Add one month.
        newDate = await DateAdd("m ", 1, data[0].expect_return_date);
        let returnDate = await moment(newDate).format('YYYY-MM-DD')
        let sql = `update borrow set ApplicationStatus=?,expect_return_date=? WHERE book_id=?`;
        let values = [obj.ApplicationStatus, returnDate, obj.bookId];
        await query(sql, values).then((results) => {
            if (results.affectedRows > 0) {
                ctx.body = {
                    code: 200,
                    msg: "Renewal status changed successfully"
                };
            } else {
                ctx.body = {
                    code: 201,
                    msg: "Renewal status change failed"
                };
            }
        }, (err) => {
            ctx.body = {
                code: 201,
                msg: "Server error",
                reason: err
            };
        });
    } else {
        let sql = `update borrow set ApplicationStatus=? WHERE book_id=?`;
        let values = [obj.ApplicationStatus, obj.bookId];
        await query(sql, values).then((results) => {
            if (results.affectedRows > 0) {
                ctx.body = {
                    code: 200,
                    msg: "Renewal status changed successfully",
                };
            } else {
                ctx.body = {
                    code: 201,
                    msg: "Renewal status change failed",
                };
            }
        }, (err) => {
            ctx.body = {
                code: 201,
                msg: "Renewal status change failed",
                reason: err
            };
        });
    }
})

// Query all students and their borrowing status
router.get("/allStudents", async (ctx) => {
    let sql = `SELECT students.stu_id AS id, students.stu_name as name, students.stu_age as age, students.stu_sex as sex, students.stu_pro as domain, students.stu_grade as grade, 
    (SELECT COUNT(*) FROM borrow WHERE borrow.student_id = students.stu_id) as borrowedBook, 
    (SELECT COUNT(*) FROM return_table WHERE return_table.student_id = students.stu_id) as notReturnBook 
    FROM students`;
    
    await query(sql).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "All students queried successfully",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to query all students",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error",
            reason: err
        };
    });
})

// Query all students and their borrowing status with pagination
router.get("/allStudentsPaging", async (ctx) => {
    let obj = ctx.request.query;
    console.log(obj)
    let sql = `SELECT students.stu_id AS id, students.stu_name as name, students.stu_age as age, students.stu_sex as sex, students.stu_pro as domain, students.stu_grade as grade, 
    (SELECT COUNT(*) FROM borrow WHERE borrow.student_id = students.stu_id) as borrowedBook, 
    (SELECT COUNT(*) FROM return_table WHERE return_table.student_id = students.stu_id) as notReturnBook 
    FROM students LIMIT ?, ?`;
    
    let values = [(Number(obj.paging) - 1) * Number(obj.pageSize), Number(obj.pageSize)]
    
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "All students with pagination queried successfully",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to query all students with pagination",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error",
            reason: err
        };
    });
})

// Query student information based on search criteria
router.get("/searchStudent", async (ctx) => {
    let obj = ctx.request.query;
    let sql = `SELECT students.stu_id AS id, students.stu_name AS name, students.stu_age AS age, students.stu_sex AS sex, students.stu_pro AS domain, students.stu_grade AS grade, 
    (SELECT COUNT(*) FROM borrow WHERE borrow.student_id = students.stu_id) AS borrowedBook, 
    (SELECT COUNT(*) FROM return_table WHERE return_table.student_id = students.stu_id) AS notReturnBook 
    FROM students WHERE students.stu_name REGEXP ? OR students.stu_id REGEXP ?`;
    
    let values = [obj.searchName, obj.searchID];
    
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Search successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Search failed, no matching records found",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error",
            reason: err
        };
    });
})

// Query paginated student information based on search criteria
router.get("/searchStudentPaging", async (ctx) => {
    let obj = ctx.request.query;
    let sql = `SELECT students.stu_id AS id, students.stu_name AS name, students.stu_age AS age, students.stu_sex AS sex, students.stu_pro AS domain, students.stu_grade AS grade, 
    (SELECT COUNT(*) FROM borrow WHERE borrow.student_id = students.stu_id) AS borrowedBook, 
    (SELECT COUNT(*) FROM return_table WHERE return_table.student_id = students.stu_id) AS notReturnBook 
    FROM students WHERE students.stu_name REGEXP ? OR students.stu_id REGEXP ? LIMIT ?, ?`;
    
    let values = [obj.searchName, obj.searchID, (Number(obj.paging) - 1) * Number(obj.pageSize), Number(obj.pageSize)];
    
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Paginated student information retrieval successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "No matching records found for the search criteria",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error",
            reason: err
        };
    });
})

// Add a student
router.post("/addStudent", async (ctx) => {
    let obj = ctx.request.body.params; // Receive data from the form
    let sql = `insert into students (stu_id, stu_sex, stu_name, stu_age, stu_pro, stu_grade) values (?, ?, ?, ?, ?, ?)`;
    let values = [obj.id, obj.sex, obj.name, obj.age, obj.domain, obj.grade];
    
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Student added successfully",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to add student",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error",
            reason: err
        };
    });
})

module.exports = router;