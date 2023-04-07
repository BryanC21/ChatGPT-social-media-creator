/*
>api/admin/getAllEmployees - gets all employees 
>api/admin/getAllEmployeesCurrent - gets all employees  currently working there
>api/admin/getEmployeesCurrentSorted - gets all employees sorted by a column

>api/admin/getByID 
>api/admin/editByID
>api/admin/deleteByID

>api/admin/editSalary // Dont want to have more than one current salary. Archive old salary and add new one

>api/admin/addEmpTitle // Can have multiple current titles
>api/admin/removeEmpTitle // Archives title
>api/admin/addEmpDept // Can have multiple current departments. Edits dept_emp table
>api/admin/removeEmpDept // Archives department. Edits dept_emp table

#api/admin/deleteDepartment // Deletes department from departments table. We shouldnt use this. Could break relationships and make some emplyees unqueriable in future
api/admin/addDepartment // Adds department to departments table
api/admin/editDepartment // Used for renaming a department. Edits department in departments table
api/admin/removeDepartmentManager // Archives department manager. Edits dept_manager table
api/admin/addDepartmentManager // Edits dept_manager table
*/
const db = require("../db_connection");

exports.getAllEmployees = (req, res) => {

    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name, \
    (SELECT titles.title FROM titles WHERE employees.emp_no = titles.emp_no ORDER BY to_date DESC LIMIT 1) AS title, \
    (SELECT departments.dept_name FROM departments WHERE departments.dept_no = \
        (SELECT dept_emp.dept_no FROM dept_emp WHERE dept_emp.emp_no = employees.emp_no ORDER BY dept_emp.to_date DESC LIMIT 1)) \
        as dept_name FROM employees \
    ORDER BY employees.emp_no DESC LIMIT ? OFFSET ?"

    db.query(sql, [count, offset], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

exports.getAllEmployeesCurrent = (req, res) => { //If employee isnt in a department, they arent considered current employees

    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name, \
    (SELECT titles.title FROM titles WHERE employees.emp_no = titles.emp_no AND titles.to_date = '9999-01-01' LIMIT 1) AS title, \
    (SELECT departments.dept_name FROM departments WHERE departments.dept_no = \
        (SELECT dept_emp.dept_no FROM dept_emp WHERE dept_emp.emp_no = employees.emp_no AND dept_emp.to_date = '9999-01-01' LIMIT 1)) \
        as dept_name FROM employees \
    HAVING title IS NOT NULL AND dept_name IS NOT NULL \
    ORDER BY employees.emp_no DESC LIMIT ? OFFSET ?"

    db.query(sql, [count, offset], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

exports.getByID = (req, res) => {

    const id = req.query.id

    let sql = "SELECT * FROM employees where emp_no = ?"

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        let userData = results[0];
        let sql2 = "SELECT * FROM salaries WHERE emp_no = ? ORDER BY to_date DESC"
        db.query(sql2, [id], (err, results) => {
            if (err) {
                return res.status(401).send({
                    status: "error",
                    message: err
                })
            }
            let salaryData = results;
            let sql3 = "SELECT * FROM titles WHERE emp_no = ? ORDER BY to_date DESC"
            db.query(sql3, [id], (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                let titleData = results;
                let sql4 = "SELECT *, departments.dept_name FROM dept_emp JOIN departments ON dept_emp.dept_no = departments.dept_no WHERE emp_no = ? ORDER BY to_date DESC"
                db.query(sql4, [id], (err, results) => {
                    if (err) {
                        return res.status(401).send({
                            status: "error",
                            message: err
                        })
                    }
                    let deptData = results;
                    return res.status(200).send({
                        status: "success",
                        results: {
                            userData,
                            salaryData,
                            titleData,
                            deptData
                        }
                    })
                })
            })
        })
    })
}

exports.editByID = (req, res) => {

    const id = req.query.id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const gender = req.query.gender
    const birth_date = req.query.birth_date
    const hire_date = req.query.hire_date

    let sql = "UPDATE employees SET first_name = ?, last_name = ?, gender = ?, birth_date = ?,  hire_date = ? WHERE emp_no = ?"

    db.query
        (
            sql,
            [first_name, last_name, gender, birth_date, hire_date, id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}

exports.deleteByID = (req, res) => {

    const id = req.query.id

    let sql = "DELETE FROM employees WHERE emp_no = ?"

    db.query
        (
            sql,
            [id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}

exports.editSalary = (req, res) => {

    const id = req.query.id
    const salary = req.query.salary

    let sql = "UPDATE salaries SET to_date = NOW() WHERE emp_no = ? and to_date = '9999-01-01'"
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        let sql2 = "INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES (?, ?, NOW(), '9999-01-01')"
        db.query(sql2, [id, salary], (err, results) => {
            if (err) {
                return res.status(401).send({
                    status: "error",
                    message: err
                })
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No user found"
                })
            }
            return res.status(200).send({
                status: "success",
                results: results
            })
        })
    })
}

exports.getEmployeesCurrentSorted = (req, res) => {

    const col = req.query.col || "emp_no"
    const order = req.query.order || "DESC" //ASC or DESC
    const count = parseInt(req.query.count) || 50
    const offset = parseInt(req.query.offset) || 0

    let sql = `SELECT employees.emp_no, first_name, last_name, \
    (SELECT titles.title FROM titles WHERE employees.emp_no = titles.emp_no AND titles.to_date = '9999-01-01' LIMIT 1) AS title, \
    (SELECT departments.dept_name FROM departments WHERE departments.dept_no = \
        (SELECT dept_emp.dept_no FROM dept_emp WHERE dept_emp.emp_no = employees.emp_no AND dept_emp.to_date = '9999-01-01' LIMIT 1)) \
        as dept_name FROM employees \
    HAVING title IS NOT NULL AND dept_name IS NOT NULL \
    ORDER BY ${col} ${order} LIMIT ${count} OFFSET ${offset}`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

// Add title to employee. Needs id and title string cannot be edited after creation
exports.addEmpTitle = (req, res) => {

    const id = req.query.id
    const title = req.query.title

    let sql = "INSERT INTO titles (emp_no, title, from_date, to_date) VALUES (?, ?, NOW(), '9999-01-01')"
    db.query(sql, [id, title], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

// Archives title by setting to_date = NOW(). Needs id and exact title string to identify
exports.removeEmpTitle = (req, res) => {

    const id = req.query.id
    const title = req.query.title

    let sql = "UPDATE titles SET to_date = NOW() WHERE emp_no = ? AND title = ? AND to_date = '9999-01-01'"
    db.query(sql, [id, title], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

// Can have multiple current departments. Needs emp_no(id) and dept_no
exports.addEmpDept = (req, res) => {

    const id = req.query.id
    const dept_no = req.query.dept_no

    let sql = "INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES (?, ?, NOW(), '9999-01-01')"
    db.query(sql, [id, dept_no], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

// Archives department by setting to_date to NOW(). Needs emp_no(id) and dept_no
exports.removeEmpDept = (req, res) => {

    const id = req.query.id
    const dept_no = req.query.dept_no

    let sql = "UPDATE dept_emp SET to_date = NOW() WHERE emp_no = ? AND dept_no = ? AND to_date = '9999-01-01'"
    db.query(sql, [id, dept_no], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

// edit department edits department in department table
exports.editDepartment = (req, res) => {
    const dept_no = req.query.dept_no;
    const dept_name = req.query.dept_name;
    let sql = 'UPDATE employees.departments SET dept_name=? WHERE dept_no=?'
    db.query(sql, [dept_name, dept_no], (err, result) => {
        if (err) {
            return res.status(401).send({
                status: 'error',
                messagae: 'error'

            })
        }
        if (result.affectedRows === 0) {
            return res.status(401).send({
                status: 'error',
                messagae: 'user not found'
            })
        }
        return res.status(200).send({
            status: 'success',
            messagae: result
        })
    })
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// addDepartment adds department to the table
exports.addDepartment = (req, res) => {
    //Make 4 char dept_no
    const id = makeid(4);
    const dept_name = req.query.dept_name;

    let sqlquery = "INSERT INTO departments (dept_no,dept_name) values (?,?)"
    db.query(sqlquery, [id, dept_name], (err, result) => {
        if (err) {
            return res.status(401).send({
                status: 'error',
                meassage: err

            })
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            result: result,
            id: id,
        })
    })


}

//deleteDepartment deletes the department from department table
exports.deleteDepartment = (req, res) => {
    const id = req.query.id;
    let sqlquery = "DELETE FROM departments WHERE dept_no = ?"
    db.query(sqlquery, [id], (err, result) => {
        if (err) {
            return res.status(401).send({
                status: 'error',
                meassage: err

            })
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "deleted successfully",
            result: result
        })
    })
}

//editDeptManager adds new manager and updates previous manager to_date to now in dept_manager table.
exports.editDeptManager = (req, res) => {

    const id = req.query.id
    const dept_no = req.query.dept_no

    let sql = "UPDATE dept_manager SET to_date = NOW() WHERE dept_no = ? and to_date = '9999-01-01'"
    db.query(sql, [dept_no], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found 1"
            })
        }
        let sql2 = "INSERT INTO dept_manager (emp_no,dept_no ,from_date, to_date) VALUES (?, ?, NOW(), '9999-01-01')"
        db.query(sql2, [id, dept_no], (err, results) => {
            if (err) {
                return res.status(401).send({
                    status: "error",
                    message: err
                })
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No user found"
                })
            }
            return res.status(200).send({
                status: "success added new manager",
                results: results
            })
        })
    })
}

//addDeptManger adds new manager to table for the given dept_no and emp_id
exports.addDeptManager = (req, res) => {

    const emp_id = req.query.emp_id
    const dept_no = req.query.dept_no


    let sql2 = "INSERT INTO dept_manager (emp_no,dept_no ,from_date, to_date) VALUES (?, ?, NOW(), '9999-01-01')"
    db.query(sql2, [emp_id, dept_no], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "successfully added new manager",
            results: results
        })
    })

}

//removeDeptManager updates previous manager to_date to now in dept_manager table.
exports.removeDeptManager = (req, res) => {

    const emp_id = req.query.emp_id
    const dept_no = req.query.dept_no

    let sql = "UPDATE dept_manager SET to_date = NOW() WHERE dept_no = ? and to_date = '9999-01-01'"
    db.query(sql, [dept_no], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No department found"
            })
        }
        return res.status(200).send({
            status: "success removed manager",
            results: results
        })
    })
}