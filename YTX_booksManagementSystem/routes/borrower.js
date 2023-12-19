const router = require("koa-router")();
const query = require("../module/query");
const multer = require('koa-multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
// Route to maintain session information
router.post("/session", function (ctx) {
    ctx.body = {
        session: ctx.session
    }
});
// Routes for student login page rendering and login processing
// Render the student login page
router.get("/s_login", async (ctx) => {
    await ctx.render("../views/borrower/s_login");
});
// Render the student login page
router.post("/s_login", async (ctx) => {
    let obj = ctx.request.body.params; 
    if (!obj.stu_id) { 
        ctx.body = {
            code: 401,
            msg: "Student ID is empty"
        };
        return;
    };
    if (!obj.stu_ma) {
        ctx.body = {
            code: 402,
            msg: "Password is empty"
        };
        return;
    };
    let sql = `SELECT * from students WHERE stu_id=? AND stu_ma=?`;
    let values = [obj.stu_id, obj.stu_ma];
    await query(sql, values).then((results) => {
        ctx.session.stu_id = obj.stu_id;
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                session: ctx.session,
                msg: "Student Login Success",
                data: results[0]
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Student Login Failure",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "server error",
            reason: err
        };
    });

})
// Route to check student ID
router.post("/s_queryInfo", async (ctx) => {
    let obj = ctx.request.body.params; 
    if (!obj.stu_id) { 
        ctx.body = {
            code: 401,
            msg: "stu_id required"
        };
        return;
    };
    let sql = `SELECT * from students WHERE stu_id=?`;
    let values = [obj.stu_id];
    await query(sql, values).then((results) => {
        let filePath = path.resolve(__dirname, '../public/uploads/' + results[0].stu_img); 
        let file = null;
        try {
            file = fs.readFileSync(filePath); 
            let mimeType = mime.lookup(filePath); 
            ctx.set('content-type', mimeType); 
            var base64Str = Buffer.from(file, 'utf-8').toString('base64')
            file = 'data:image/png;base64,' + base64Str
            results[0].stu_img = file
        } catch (error) {
            results[0].stu_img = "https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg"
        }
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Students login successful",
                session: ctx.session,
                data: results[0]
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Students login error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Students login error",
            reason: err
        };
    });

})
//Route to check student ID
router.get("/s_checkzh", async (ctx) => {
    let obj = ctx.query;
    if (obj.stu_id == '') {
        ctx.body = {
            code: 401,
            msg: "The school number is empty!!!"
        }
        return
    }
    var reg = new RegExp('[0-9]{10}');
    if (!reg.test(obj.stu_id)) {
        ctx.body = {
            code: 402,
            msg: "The student number must be a ten-digit number"
        }
        return
    }
    let sql = `select * from students where stu_id=?`;
    let values = [obj.stu_id];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 201,
                msg: "Account exists, please change",
            };
        } else {
            ctx.body = {
                code: 200,
                msg: "can be used",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server Error",
            reason: err
        };
    });
})
// Route to query books not yet returned by the student
router.get("/noReturnBook", async (ctx) => {
    let obj = ctx.query;
    let sql = `SELECT book.book_id as id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse, borrow.borrow_date AS outDate,borrow.expect_return_date AS returnDate from book LEFT JOIN book_sort ON book.book_sort_id=book_sort.sort_id LEFT JOIN borrow ON borrow.book_id=book.book_id WHERE borrow.student_id=? and book.is_on=0 order by borrow.borrow_date DESC`;
    let values = [obj.stu_id]
    await query(sql, values).then((results) => {
        results.map(item => {
            item.outDate = moment(item.outDate).format('YYYY-MM-DD');
            item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
            return item;
        })
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Successful search for unreturned books",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 200,
                data: [],
                msg: "Zero books outstanding",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server Error",
            reason: err
        };
    });

})
// Route to query all books returned by the student
router.get("/returnBook", async (ctx) => {
    let obj = ctx.query;
    let sql = `SELECT book.book_id as id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse,return_table.return_date AS returnDate from book LEFT JOIN book_sort ON book.book_sort_id=book_sort.sort_id LEFT JOIN return_table ON book.book_id=return_table.book_id WHERE return_table.student_id=? order by return_table.return_date DESC`;
    let values = [obj.stu_id]
    await query(sql, values).then((results) => {
        results.map(item => {
            item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
            return item;
        })
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Returned Book Search Successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 200,
                data: [],
                msg: "Zero books returned",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server Error",
            reason: err
        };
    });

})
// Route to query overdue books of a student
router.get("/punish", async (ctx) => {
    let obj = ctx.query;
    let sql = `SELECT book.book_id as id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse,borrow.expect_return_date AS returnDate,book_price AS price from book LEFT JOIN book_sort ON book.book_sort_id=book_sort.sort_id LEFT JOIN borrow ON book.book_id=borrow.book_id WHERE book.is_on = 0 and borrow.student_id=?`;
    let values = [obj.stu_id]
    await query(sql, values).then((results) => {
        let newResults = results.filter(item => {
            item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
            let date1 = new Date(item.returnDate)
            let date2 = new Date()
            let s1 = date1.getTime()
            let s2 = date2.getTime();
            let total = (s2 - s1) / 1000;
            let overtime = parseInt(total / (24 * 60 * 60))
            if (overtime > 0) {
                item.penalty = "¥" + 0.5 * overtime
                if (0.5 * overtime > item.price) {
                    item.penalty = "¥" + item.price
                }
                item.overtime = overtime;
                return item
            }
        })
        if (newResults.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Overdue Book Search Successful",
                data: newResults,
                total: newResults.length
            };
        } else {
            ctx.body = {
                code: 200,
                data: [],
                msg: "Zero overdue books",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server Error",
            reason: err
        };
    });

})
// Route to query the renewal status of the books borrowed by the student
router.get("/renewStatus", async (ctx) => {
    let obj = ctx.query;
    let sql = `SELECT book.book_id as id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse, borrow.borrow_date AS outDate,borrow.expect_return_date AS returnDate,borrow.ApplicationStatus AS ApplicationStatus from  book LEFT JOIN book_sort ON book.book_sort_id=book_sort.sort_id LEFT JOIN borrow ON borrow.book_id=book.book_id WHERE borrow.student_id=? and book.is_on = 0 order by borrow.borrow_date DESC`;
    let values = [obj.stu_id]
    await query(sql, values).then((results) => {
        results.map(item => {
            item.outDate = moment(item.outDate).format('YYYY-MM-DD');
            item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
            return item;
        })
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Renewal status query successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 200,
                data: [],
                msg: "Renewal Status Inquiry Failed",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server Error",
            reason: err
        };
    });

})
// Route to handle student's password forget scenario
router.post("/StudentForgetPwd", async (ctx) => {
    let obj = ctx.request.body.params;
    if (obj.stu_id == '') {
        ctx.body = {
            code: 401,
            msg: "The student number is empty!!!"
        }
        return
    }
    if (obj.stu_name == '') {
        ctx.body = {
            code: 402,
            msg: "The name is empty!"
        }
        return
    }
    let sql = `select * from students where stu_id=? and stu_name=?`;
    let values = [obj.stu_id, obj.stu_name];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Student Number, Name Verification Passed",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "School number or name wrong",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server Error",
            reason: err
        };
    });
})
// Routes for adding, deleting, and updating student information
router.get("/s_add", async (ctx) => {
    await ctx.render("../views/borrower/s_add");
})
router.post("/s_add", async (ctx) => {
    let obj = ctx.request.body.params; 
    if (!obj.stu_id) { 
        ctx.body = {
            code: 401,
            msg: "The student number is empty!!!"
        };
        return;
    };
    let sql = `insert into students (stu_id,stu_ma,stu_name,stu_pro,stu_sex) values (?,?,?,?,?)`;
    let values = [obj.stu_id, obj.stu_ma, obj.stu_name, obj.stu_pro, obj.stu_sex];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Student added successfully",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to add student"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "server error",
            reason: err
        };
    });

})

router.get("/s_delete", async (ctx) => {
    await ctx.render("../views/borrower/s_delete");
})
router.post("/s_delete", async (ctx) => {
    let obj = ctx.request.body.params; 
    let sql = `delete from students where stu_id=? and stu_name=?`;
    let values = [obj.id,obj.name];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Deleted successfully",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to delete"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "server error",
            reason: err
        };
    });

})


router.get("/s_update", async (ctx) => {
    await ctx.render("../views/borrower/s_update");
})
router.post("/s_update", async (ctx) => {
    let obj = ctx.request.body.params; 
    let sql = `update students set stu_sex=?,stu_age=?,stu_pro=?,stu_grade=?,stu_name=? WHERE stu_id=?`;
    let values = [obj.stu_sex, obj.stu_age, obj.stu_pro, obj.stu_grade, obj.stu_name, obj.stu_id];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Student Information Modification Successful",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to modify student information",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server Error",
            reason: err
        };
    });
})
router.post("/StudentUpdatePwd", async (ctx) => {
    let obj = ctx.request.body.params;
    let sql = `update students set stu_ma=? WHERE stu_id=? and stu_name=?`;
    let values = [obj.stu_ma, obj.stu_id, obj.stu_name];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Student password changed successfully",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Student password changed error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Student password changed error",
            reason: err
        };
    });
})
router.post("/modifyRenewalStatus", async (ctx) => {
    let obj = ctx.request.body.params;
    let sql = `update borrow set ApplicationStatus=? WHERE book_id=?`;
    let values = [obj.ApplicationStatus, obj.bookId];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Renewal Status Modified Successfully",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Renewal Status Modification Failed",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server Error",
            reason: err
        };
    });
})


router.post("/upload", async (ctx) => {
    let filename = ctx.request.files.file.path.slice(ctx.request.files.file.path.indexOf("upload_"));
    let obj = ctx.request.body; 
    await query("SELECT * FROM students WHERE stu_id=?", [obj.stu_id]).then(results => {
        let filePath = path.resolve(__dirname, '../public/uploads/' + results[0].stu_img)
        fs.unlink(filePath, err => {
            if (err) {
                return
            }
        });
    })
    let sql = `update students set stu_img=? where stu_id=?`;
    let values = [filename, obj.stu_id];
    await query(sql, values).then((results) => {
        let filePath = path.resolve(__dirname, '../public/uploads/' + filename); 
        let file = null;
        try {
            file = fs.readFileSync(filePath); 
        } catch (error) {
            ctx.body = "https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg"
        }
        let mimeType = mime.lookup(filePath);
        ctx.set('content-type', mimeType); 
        var base64Str = Buffer.from(file, 'utf-8').toString('base64')
        file = 'data:image/png;base64,' + base64Str
        ctx.body = file; 
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "服务器出错",
            reason: err
        };
    });
})
router.get("/StudentInfo", async (ctx) => {
    let obj = ctx.request.query; 
    let sql = `select * from students where stu_id=?`;
    let values = [obj.studentId];
    await query(sql, values).then((results) => {
        ctx.body = {
            code: 200,
            msg: "Successful query",
            data: results[0]
        };
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "inquiry failure",
            reason: err
        };
    });
})
module.exports = router;