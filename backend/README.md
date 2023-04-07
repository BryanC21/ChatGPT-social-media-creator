Admin Routes
============
The admin routes are used to manage the backend. They have more power than users

* api/admin/getAllEmployees - Params: count, offset - Returns: All employees
* api/admin/getByID - Params: id - Returns: Employee with id
* api/admin/editByID - Params: id
* api/admin/deleteByID - Params: id
* api/admin/editSalary - Params: id, salary
* api/admin/editTitle - Params: id, title

User Routes
==========
The user routes are the routes that are used by the user to interact with the db

## User Routes
### GET /api/user/getByID
This route is used to get a user by their id  

#### Parameters
* id: The id of the user

#### Response
* 200: The user was found
* 404: The user was not found
* 401: Error
* results: [
    {   
        "emp_no":10001,  
        "birth_date":"1953-09-02T07:00:00.000Z",  
        "first_name":"Georgi",  
        "last_name":"Facello",  
        "gender":"M",  
        "hire_date":"1986-06-26T07:00:00.000Z",   
        "salary": 88958,  
        "title": "Senior Engineer"  
    }
]   

### GET /api/user/editByID
This route is used to let user update their name and gender

#### Parameters
* id: The id of the user  
* first_name: The first name of the user  
* last_name: last name
* gender: "M" or "F" ONLY

#### Response
* 200: The user was found
* 404: The user was not found
* 401: Error
* results: [
    {   
        ?????
    }
]   

### GET /api/user/getEmployeeCount
This route is used to get the number of employees

#### Parameters
* None

#### Response
* 200: Success
* 401: Error
* "results":[
    {   
        "EmpCount":300024  
    }
]  

### GET /api/user/getByDepartment
This route is used to get employees by department

#### Parameters
* dept: The department id/number/dept_no to search for
* count: The number of employees to return INT
* offset: The offset to start at INT

#### Response
* 200: Success
* 401: Error
* 404: No employees found
* "results":[
    {   
        emp_no: 10001,  
        first_name: "Georgi",  
        last_name: "Smith"  
    }
]   

### GET /api/user/getDepartmentsManagers
This route is used to get list of departments along with their managers. RARE CASES: Could include duplicates if more than one manager per department or if department has multiple managers. If department has no manager it wont show up in the results.  

#### Parameters
* NONE

#### Response
* 200: The user was found
* 404: No departments found
* 401: Error
* results: [
    {   
        dept_no: "d001",  
        dept_name: "Marketing",  
        first_name: "Georgi",  
        last_name: "Smith",  
        emp_no: 10001  
    }
]   

### GET /api/user/getDepartments
This route is used to get list of departments 

#### Parameters
* NONE

#### Response
* 200: The user was found
* 404: No departments found
* 401: Error
* results: [
    {   
        dept_no: "d001",  
        dept_name: "Marketing"  
    }
]  
