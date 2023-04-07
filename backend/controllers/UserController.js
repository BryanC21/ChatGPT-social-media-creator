const db = require("../db_connection");

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


exports.getEmployeeCount = (req, res) => {

    let sql = "SELECT COUNT(*) AS EmpCount FROM employees"

    db.query(sql, (err, results, fields) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        return res.status(200).send({
            status: "success",
            results: results,
            fields: fields
        })
    })

}

exports.editByID = (req, res) => {

    const id = req.query.id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const gender = req.query.gender

    let sql = "UPDATE employees SET first_name = ?, last_name = ?, gender = ?  WHERE emp_no = ?"

    db.query
        (
            sql,
            [first_name, last_name, gender, id],
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


exports.getByDepartment = (req, res) => {

    const dept = req.query.dept
    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name, titles.title FROM employees \
    JOIN current_dept_emp ON current_dept_emp.emp_no = employees.emp_no \
    LEFT JOIN titles ON titles.emp_no = employees.emp_no \
    WHERE dept_no = ? ORDER BY EMP_NO DESC LIMIT ? OFFSET ?"

    db.query(sql, [dept, count, offset], (err, results) => {
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

exports.getByDepartmentCurrent = (req, res) => {

    const dept = req.query.dept
    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name, titles.title FROM employees \
    JOIN current_dept_emp ON current_dept_emp.emp_no = employees.emp_no \
    LEFT JOIN titles ON titles.emp_no = employees.emp_no \
    WHERE dept_no = ? AND current_dept_emp.to_date = '9999-01-01' ORDER BY EMP_NO DESC LIMIT ? OFFSET ?"

    db.query(sql, [dept, count, offset], (err, results) => {
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

exports.getDepartmentsManagers = (req, res) => {

    let sql = "SELECT departments.dept_no, departments.dept_name, employees.first_name, employees.last_name, employees.emp_no, \
    titles.title FROM departments \
    JOIN dept_manager ON dept_manager.dept_no = departments.dept_no \
    JOIN employees ON employees.emp_no = dept_manager.emp_no \
    JOIN titles ON titles.emp_no = dept_manager.emp_no \
    WHERE dept_manager.to_date = '9999-01-01' AND titles.title = 'Manager'"

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
                message: "No departments found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getDepartments = (req, res) => {

    let sql = "SELECT * FROM departments"
    
    db.query(sql, (err ,results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No departments found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getTitles = (req, res) => {
    let sql = "SELECT DISTINCT title from titles";
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
                message: "No titles found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}
