const router = require("koa-router")();
const query = require("../module/query");
const sd = require('silly-datetime');
const moment = require('moment');
// Home page route
router.get("/", function (ctx) {
    ctx.body = "Library Home Page"
});
// Route to query all book information
router.get("/allBook", async (ctx) => {
    let sql = `SELECT book.book_id AS id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse,book.is_on AS isLibrary from book LEFT JOIN book_sort ON book_sort.sort_id=book.book_sort_id order by book.book_id ASC`;;
    await query(sql).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "All books query successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "books query failed",
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
// Query all borrowed book information
router.get("/allBorrowBook", async (ctx) => {
    let sql = `SELECT book.book_id as id,borrow.student_id as student_id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse, borrow.borrow_date AS outDate,borrow.expect_return_date AS returnDate from book LEFT JOIN book_sort ON book.book_sort_id=book_sort.sort_id LEFT JOIN borrow ON borrow.book_id=book.book_id WHERE book.is_on = 0 order by borrow.borrow_date desc`;
    await query(sql).then((results) => {
        if (results.length > 0) {
            results.map(item => {
                item.outDate = moment(item.outDate).format('YYYY-MM-DD');
                item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
                return item;
            })
            ctx.body = {
                code: 200,
                msg: "Query for borrowed books successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to query borrowed books",
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
// Query specified search information
router.get("/searchBook", async (ctx) => {
    let obj = ctx.request.query;
    let sql = `SELECT book.book_id AS id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse,book.is_on AS isLibrary from book LEFT JOIN book_sort ON book_sort.sort_id=book.book_sort_id WHERE book.book_name REGEXP ? || book.book_author REGEXP ? || book.book_pub REGEXP ? order by book.book_id ASC`;;
    let values = [obj.searchName, obj.searchAuthor, obj.searchPublishingHouse]
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Search for content successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Search for content failed",
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

// Query specified search paging information
router.get("/searchBookPaging", async (ctx) => {
    let obj = ctx.request.query;
    let sql = `SELECT book.book_id AS id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse,book.is_on AS isLibrary from book LEFT JOIN book_sort ON book_sort.sort_id=book.book_sort_id WHERE book.book_name REGEXP ? || book.book_author REGEXP ? || book.book_pub REGEXP ? order by book.book_id ASC LIMIT ?,?`;
    let values = [obj.searchName, obj.searchAuthor, obj.searchPublishingHouse, (Number(obj.paging) - 1) * Number(obj.pageSize), Number(obj.pageSize)]
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Search for content successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Search for content failed",
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

// Query all book paging information
router.get("/l_paging", async (ctx) => {
    await ctx.render("../views/library/l_paging");
})

router.get("/allBookPaging", async (ctx) => {
    let obj = ctx.request.query;
    let sql = `SELECT book.book_id AS id,book.book_name AS name,book.book_author AS author,book_sort.sort_name AS sort,book.book_pub AS publishingHouse,book.is_on AS isLibrary from book LEFT JOIN book_sort ON book_sort.sort_id=book.book_sort_id order by book.book_id ASC LIMIT ?,?`;
    let values = [(Number(obj.paging) - 1) * Number(obj.pageSize), Number(obj.pageSize)];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Search for content successful",
                data: results
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Search for content failed",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Search for content failed",
            reason: err
        };
    });

})
// Borrow table book addition
router.get("/l_borrowadd", async (ctx) => {
    await ctx.render("../views/library/l_borrowadd");
})

router.get("/l_borrowadd", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    if (!obj.bookId) {
        ctx.body = {
            code: 402,
            msg: "Book ID is empty"
        };
        return;
    };
    if (!obj.studentId) {
        ctx.body = {
            code: 401,
            msg: "Student ID is empty"
        };
        return;
    };
    let isBook = await query("SELECT * from book WHERE book_id = ?", [Number(obj.bookId)]);
    if (isBook.length <= 0) {
        ctx.body = {
            code: 403,
            msg: `No book with ID ${obj.bookId} found`
        };
        return;
    }
    let isStudent = await query("SELECT * from students WHERE stu_id = ?", [obj.studentId]);
    if (isStudent.length <= 0) {
        ctx.body = {
            code: 404,
            msg: `No student with ID ${obj.studentId} found`
        };
        return;
    }
    let isOn = await query("SELECT * from book WHERE book_id=? AND is_on=0", [obj.bookId]);
    if (isOn.length > 0) {
        ctx.body = {
            code: 405,
            msg: `Book with ID ${obj.bookId} is already borrowed`
        };
        return;
    }
    let time = sd.format(new Date(), 'YYYY-MM-DD') // Borrowing time
    let year = Number(time[0] + time[1] + time[2] + time[3]); // Return year
    let month = ""; // Return month
    let day = time[8] + time[9] // Return day
    if (Number(time[5] + time[6]) >= 9) { // If the return month is greater than or equal to 9, increase the year by one and reset the month
        year++;
        for (var i = 9; i <= 12; i++) {
            if (Number(time[5] + time[6]) == i) { // If the return month is exactly 9, 10, 11, or 12
                month = time[5] + (i + 4 - 12) // Reset the return month
                break;
            }
        }
    } else { // If the return month is less than 9, there is no need to reset, just add 4
        month = "0" + (Number(time[5] + time[6]) + 4)
    }
    let time1 = year + "-" + month + "-" + day;
    let sql = `insert into borrow (student_id,book_id,borrow_date,expect_return_date) values (?,?,?,?)`;
    let values = [obj.studentId, obj.bookId, time, time1];
    await query(sql, values).then(async (results) => {
        if (results.affectedRows > 0) {
            await query("update book set is_on=0 WHERE book_id=?", [obj.bookId]).then(res => {
                if (results.affectedRows > 0) {
                    ctx.body = {
                        code: 200,
                        msg: "Borrowing successful",
                        data: {
                            student_id: obj.student_id,
                            book_id: obj.book_id
                        }
                    };
                }
            })
        } else {
            ctx.body = {
                code: 201,
                msg: "Borrowing failed"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Server exception",
            reason: err
        };
    });
})
router.get("/l_returntable_add", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    if (!obj.bookId) {
        ctx.body = {
            code: 402,
            msg: "Book ID is empty"
        };
        return;
    };
    if (!obj.studentId) {
        ctx.body = {
            code: 401,
            msg: "Student ID is empty"
        };
        return;
    };
    let isBook = await query("SELECT * from book WHERE book_id = ?", [Number(obj.bookId)]);
    if (isBook.length <= 0) {
        ctx.body = {
            code: 403,
            msg: `No book with ID ${obj.bookId} found`
        };
        return;
    }
    let isStudent = await query("SELECT * from students WHERE stu_id = ?", [obj.studentId]);
    if (isStudent.length <= 0) {
        ctx.body = {
            code: 404,
            msg: `No student with ID ${obj.studentId} found`
        };
        return;
    }
    let isBorrowBook = await query("SELECT * from borrow WHERE book_id=? and student_id=?", [Number(obj.bookId), obj.studentId]);
    if (isBorrowBook.length <= 0) {
        ctx.body = {
            code: 405,
            msg: `Book with ID ${obj.bookId} does not need to be returned`
        };
        return;
    }
    await query("SELECT * from borrow WHERE book_id=? and student_id=?", [Number(obj.bookId), obj.studentId]).then(async (result) => {
        let overtime = await

        function isTimeout() {
            let expect_return_date = moment(result[0].expect_return_date).format('YYYY-MM-DD');
            let date1 = new Date(expect_return_date)
            let date2 = new Date()
            let s1 = date1.getTime()
            let s2 = date2.getTime();
            let total = (s2 - s1) / 1000;
            return parseInt(total / (24 * 60 * 60))
        }()
        let BookPrice = await query("SELECT * from book WHERE book_id=?", [Number(obj.bookId)])
        let penalty = 0.5 * Number(overtime)
        if (penalty > BookPrice[0].book_price) {
            penalty = BookPrice[0].book_price
        }
        if (overtime > 0) {
            ctx.body = {
                code: 406,
                msg: "Book return is overdue, charge a penalty",
                overtime,
                penalty,
                borrowId: result[0].borrow_id
            }
        } else {
            let sql = `insert into return_table (student_id,book_id,borrow_id,return_date) values (?,?,?,?)`;
            let values = [obj.studentId, Number(obj.bookId), result[0].borrow_id, sd.format(new Date(), 'YYYY-MM-DD')];
            await query(sql, values).then(async (results2) => {
                if (results2.affectedRows > 0) {
                    await query("UPDATE book SET is_on=1 where book_id=?", [Number(obj.bookId)]).then(results3 => {
                        if (results2.affectedRows > 0) {
                            ctx.body = {
                                code: 200,
                                msg: "Book return successful!"
                            };
                        }
                    })
                } else {
                    ctx.body = {
                        code: 201,
                        msg: "Book return failed!"
                    };
                }
            }, (err) => {
                ctx.body = {
                    code: 201,
                    msg: "Server exception!",
                    reason: err
                };
            });
        }
    })
})

router.get("/l_ticketadd", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    let sql = `insert into return_table (student_id, book_id, borrow_id, return_date) values (?, ?, ?, ?)`;
    let values = [obj.studentId, Number(obj.bookId), obj.borrowId, sd.format(new Date(), 'YYYY-MM-DD')];
    await query(sql, values).then(async (results2) => {
        if (results2.affectedRows > 0) {
            await query("UPDATE book SET is_on=1 where book_id=?", [Number(obj.bookId)]).then(results3 => {
                if (results3.affectedRows > 0) {
                    ctx.body = {
                        code: 200,
                        msg: "Book returned successfully!"
                    };
                }
            })
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to return book!"
            };
        }
    });
    await query("insert into ticket (student_id, book_id, overdue_date, ticket_price) values (?, ?, ?, ?)", [obj.studentId, obj.bookId, obj.overtime, obj.penalty]).then((results) => {
        ctx.body = {
            code: 200,
            msg: "Penalty information added successfully"
        }
    })
})
//处罚表信息删除
router.get("/l_borrowdel", async (ctx) => {
    await ctx.render("../views/library/l_borrowdel");
})
router.get("/l_borrowdel1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.student_id) {
        ctx.body = {
            code: 401,
            msg: "student_id required"
        };
        return;
    };
    if (!obj.book_id) {
        ctx.body = {
            code: 402,
            msg: "book_id required"
        };
        return;
    };
    let sql = `delete from ticket where student_id=? and book_id=?`;
    let values = [obj.student_id, obj.book_id];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "ticket delete successful",
                data: {
                    student_id: obj.student_id,
                    book_id: obj.book_id
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "ticket delete error"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "ticket delete error",
            reason: err
        };
    });

})
// Retrieve All Books Returned by Students
router.get("/allReturnBook", async (ctx) => {
    let sql = `SELECT book.book_id as id, return_table.student_id AS student_id, book.book_name AS name, book.book_author AS author, book_sort.sort_name AS sort, book.book_pub AS publishingHouse, return_table.return_date AS returnDate from  book LEFT JOIN book_sort ON book.book_sort_id = book_sort.sort_id LEFT JOIN return_table ON return_table.book_id = book.book_id WHERE return_table.return_date is NOT NULL order by return_table.return_date DESC`;
    await query(sql).then((results) => {
        results.map(item => {
            item.returnDate = moment(item.returnDate).format('YYYY-MM-DD');
            return item;
        })
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Query for returned books successful",
                data: results,
                total: results.length
            };
        } else {
            ctx.body = {
                code: 200,
                data: [],
                msg: "No returned books found",
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

// Delete a Book
router.post("/delBook", async (ctx) => {
    let obj = ctx.request.body.params; // Receive data from the form
    await query('SELECT * FROM book LEFT JOIN book_sort ON book.book_sort_id = book_sort.sort_id WHERE book.book_id = ?', [obj.id]).then(async (res) => {
        if (res.length > 0) {
            if (obj.classify == res[0].sort_id) {
                let sql = `delete from book where book_id = ?`;
                let values = [obj.id];
                await query(sql, values).then((results) => {
                    if (results.affectedRows > 0) {
                        ctx.body = {
                            code: 200,
                            msg: "Deletion successful",
                        };
                    } else {
                        ctx.body = {
                            code: 203,
                            msg: "Deletion failed"
                        };
                    }
                }, (err) => {
                    ctx.body = {
                        code: 301,
                        msg: "Server error",
                        reason: err
                    };
                });
            } else {
                ctx.body = {
                    code: 202,
                    msg: 'No permission to operate on books of other classes'
                }
            }
        } else {
            ctx.body = {
                code: 201,
                msg: 'This book does not exist'
            }
        }
    })
})

// Query Book Categories
router.get("/bookSort", async (ctx) => {
    let sql = `SELECT * FROM book_sort`;
    await query(sql).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Book category query successful",
                data: results
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Book category query failed",
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

// Add Book
router.get("/addBook", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    let sql = `insert into book (book_name, book_author, book_price, pagination, book_sort_id, subhead, book_pub, publicationTime) values (?, ?, ?, ?, ?, ?, ?, ?)`;
    let values = [obj.name, obj.author, obj.price, obj.pagination, obj.sort, obj.subhead, obj.publishingHouse, obj.publicationTime];
    await query(sql, values).then(results => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Book added successfully!"
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to add the book!"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error!",
            reason: err
        };
    });
})

// Get current book information
router.get("/bookInfo", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    let sql = `select * from book INNER JOIN book_sort ON book.book_sort_id = book_sort.sort_id where book.book_id=?`;
    let values = [obj.bookId];
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

// Book rating
router.get("/grade", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    let sql = `insert into forum (bookId, studentId, grade) values (?, ?, ?)`;
    let values = [obj.bookId, obj.studentId, obj.grade];
    await query(sql, values).then(results => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Book rating successful!"
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Book rating failed!"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error!",
            reason: err
        };
    });
})

// Check if the student has already rated the current data
router.get("/isGrade", async (ctx) => {
    let sql = `SELECT * FROM forum WHERE bookId=? and studentId=? and grade IS NOT NULL`;
    let obj = ctx.request.query;
    let values = [obj.bookId, obj.studentId];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Already rated",
                grade: results[0].grade
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Not rated yet",
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

// Query how many people have rated the current book
router.get("/gradeNum", async (ctx) => {
    let sql = `SELECT * FROM forum WHERE bookId=? and grade IS NOT NULL`;
    let obj = ctx.request.query;
    let values = [obj.bookId];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Query successful",
                gradeNum: results.length
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Query failed",
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

// Get the average rating for the current book
router.get("/avgGrade", async (ctx) => {
    let sql = `SELECT avg(grade) as avg FROM forum WHERE bookId=? and grade IS NOT NULL`;
    let obj = ctx.request.query;
    let values = [obj.bookId];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            if (results[0].avg === null) {
                results[0].avg = 0;
            }
            ctx.body = {
                code: 200,
                msg: "Query successful",
                avg: parseFloat(results[0].avg).toFixed(1)
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Query failed",
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

// Get comments for the current book
router.get("/getComments", async (ctx) => {
    let obj = ctx.request.query;
    let results = await query('SELECT * FROM forum WHERE bookId=? AND container IS NOT NULL ORDER BY releaseTime DESC LIMIT 0,?;', [obj.bookId, Number(obj.page) * 10]);
    let arr = [];
    let results3 = await query('SELECT COUNT(*) as total FROM forum WHERE bookId=? AND container IS NOT NULL', [obj.bookId]);
    if (results.length > 0) {
        await results.map(async (item) => {
            arr.push(item.studentId);
            let time = sd.format(item.releaseTime, 'YYYY-MM-DD');
            item.releaseTime = time;
            if (item.student_img.slice(0, 7) === "upload_") {
                item.student_img = "http://127.0.0.1:3000/uploads/" + item.student_img;
            }
        });
        for (let i = 0; i < arr.length; i++) {
            let results2 = await query('SELECT * FROM forum WHERE bookId=? AND studentId=? AND grade IS NOT NULL', [obj.bookId, arr[i]]);
            results[i].grade = results2[0].grade;
        }
        ctx.body = {
            code: 200,
            msg: 'Query successful',
            data: results,
            total: results3[0].total
        };
    } else {
        ctx.body = {
            code: 201,
            msg: 'No comments available for this book'
        };
    }
})

// Add a comment for the current book
router.get("/addComment", async (ctx) => {
    let obj = ctx.request.query; // Receive data from the form
    let sql = `insert into forum (bookId,studentId,student_img,student_name,releaseTime,title,container) values (?,?,?,?,?,?,?)`;
    let values = [obj.bookId, obj.studentId, obj.student_img, obj.student_name, obj.releaseTime, obj.title, obj.container];
    await query(sql, values).then(results => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Comment added successfully!"
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Failed to add comment!"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Server error!",
            reason: err
        };
    });
})

// Test endpoint
router.get("/test", async (ctx) => {
    ctx.body={
        code:200,
        msg:"Test endpoint called successfully",
        data:{
            file:ctx.request.query.file
        }
    }
})

module.exports = router;