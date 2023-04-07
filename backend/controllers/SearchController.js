const db = require("../db_connection");
const levenshtein = require('fast-levenshtein');

exports.searchName = (req, res) => {
    const name = req.query.name;
    const current = req.query.current;

    let words = name.split(" ");
    if (words.length === 0) {
        return res.status(400).send({
            status: "error",
            message: "Please enter a name"
        })
    }

    let sql = `SELECT employees.emp_no, first_name, last_name, titles.title, departments.dept_name FROM employees \
    JOIN titles ON titles.emp_no = employees.emp_no \
    JOIN dept_emp ON dept_emp.emp_no = employees.emp_no \
    JOIN departments ON departments.dept_no = dept_emp.dept_no \
    WHERE `;

    for (let i = 0; i < words.length; i++) {
        if (i === words.length - 1) {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%'`
        } else {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%' OR `
        }
    }

    if (current) {
        sql += ` AND dept_emp.to_date = '9999-01-01'`
    }

    sql += " GROUP BY employees.emp_no LIMIT 10000" // LIMIT 10000 to prevent server from crashing

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(401).send({
                status: "error",
                message: "No results found"
            })
        }

        let message = "success";
        if (results.length === 10000) {
            message = "Returned more than 10,000 results. Please refine your search for more accurate results."
        }

        //use levenshtein distance to find closest match to original search
        let searchResults = results
            .map((result) => {
                return {
                    ...result,
                    distance: levenshtein.get(name, result.first_name + " " + result.last_name)
                }
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 100); // only return top 100 results

        return res.status(200).send({
            status: message,
            results: searchResults
        })
    }
    )
};

exports.searchNameAdvanced = (req, res) => {

    const name = req.query.name;
    const title = req.query.title;
    const dept_no = req.query.dept_no;
    const current = req.query.current;

    let words = name.split(" ");
    if (words.length === 0) {
        return res.status(400).send({
            status: "error",
            message: "Please enter a name"
        })
    }

    let sql = `SELECT employees.emp_no, first_name, last_name, titles.title, departments.dept_name FROM employees \
    JOIN titles ON titles.emp_no = employees.emp_no \
    JOIN dept_emp ON dept_emp.emp_no = employees.emp_no \
    JOIN departments ON departments.dept_no = dept_emp.dept_no \
    WHERE `;

    sql += '('

    for (let i = 0; i < words.length; i++) {
        if (i === words.length - 1) {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%'`
        } else {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%' OR `
        }
    }

    sql += ')'

    if (title) {
        sql += ` AND titles.title = '${title}'`

    }
    if (dept_no) {
        sql += `AND departments.dept_no = '${dept_no}'`
    }

    if (current) {
        sql += ` AND dept_emp.to_date = '9999-01-01'`
    }

    sql += " GROUP BY employees.emp_no LIMIT 10000" // LIMIT 10000 to prevent server from crashing

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(401).send({
                status: "error",
                message: "No results found"
            })
        }

        let message = "success";
        if (results.length === 10000) {
            message = "Returned more than 10,000 results. Please refine your search for more accurate results."
        }

        //use levenshtein distance to find closest match to original search
        let searchResults = results
            .map((result) => {
                return {
                    ...result,
                    distance: levenshtein.get(name, result.first_name + " " + result.last_name)
                }
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 100); // only return top 100 results

        return res.status(200).send({
            status: message,
            results: searchResults
        })
    }
    )
};

exports.searchEverything = (req, res) => {

    //experimental but seems to work well
    let name;
    let words;
    try {
        name = req.query.name;
        words = name.split(" ");
    } catch (err) { console.log('name being bad') }
    //end of experimental

    //optional parameters
    const title = req.query.title; //string title
    const dept_no = req.query.dept_name; //string department name
    const current = req.query.current; //cuurent=yes or dont include
    const order = req.query.order || "ASC"; //order=ASC or order=DESC
    const col = req.query.col; //col=emp_no, col=first_name or col=last_name or col=dept_name or col=title
    const count = parseInt(req.query.count) || 100;
    const offset = parseInt(req.query.offset) || 0;

    let sql = `SELECT employees.emp_no, first_name, last_name, \
    (SELECT titles.title FROM titles WHERE employees.emp_no = titles.emp_no AND titles.to_date = '9999-01-01' LIMIT 1) AS title, \
    (SELECT departments.dept_name FROM departments WHERE departments.dept_no = \
        (SELECT dept_emp.dept_no FROM dept_emp WHERE dept_emp.emp_no = employees.emp_no AND dept_emp.to_date = '9999-01-01' LIMIT 1)) \
        as dept_name, \
    (SELECT dept_emp.to_date FROM dept_emp WHERE dept_emp.emp_no = employees.emp_no AND dept_emp.to_date = '9999-01-01' LIMIT 1) AS toDate FROM employees`;

    if (title || dept_no || current || name) {
        sql += ' HAVING'
    }

    if (name) {
        sql += '('
        for (let i = 0; i < words.length; i++) {
            if (i === words.length - 1) {
                sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%'`
            } else {
                sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%' OR `
            }
        }
        sql += ')'
        if(title || dept_no || current){
            sql += ' AND'
        }
    }

    if (title) {
        sql += ` title = '${title}'`
        if (dept_no || current) {
            sql += ' AND'
        }

    }
    if (dept_no) {
        sql += ` dept_name = '${dept_no}'`
        if (current) {
            sql += ' AND'
        }
    }

    if (current) {
        sql += ` toDate = '9999-01-01'`
    }

    if (col && order) {
        sql += ` ORDER BY ${col} ${order}`
    }

    sql += ` LIMIT ${count} OFFSET ${offset}`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(401).send({
                status: "error",
                message: "No results found"
            })
        }

        let message = "success";

        if (results.length === 10000) {
            message = "Returned more than 10,000 results. Please refine your search for more accurate results."
        }

        //use levenshtein distance to find closest match to original search

        if (name) {
            let searchResults = results
            .map((result) => {
                return {
                    ...result,
                    distance: levenshtein.get(name, result.first_name + " " + result.last_name)
                }
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 100); // only return top 100 results
            return res.status(200).send({
                status: message,
                results: searchResults
            })
        } else {
            return res.status(200).send({
                status: message,
                results: results
            })
        }

    }
    )
};