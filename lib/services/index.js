const dbSession = require('../dbConnection');

function createCollegeTable() {
    // console.log(" DB Object ----", dbSession.getDBSession());
    var createCollegTable = "CREATE TABLE IF NOT EXISTS college(college_id int(11) NOT NULL AUTO_INCREMENT,"
        + "collegeName varchar(20) DEFAULT NULL," + "collegeAddress varchar(50) DEFAULT NULL," + "collegeEmail varchar(20) DEFAULT NULL,"
        + "PRIMARY KEY (college_id)) ENGINE=InnoDB DEFAULT CHARSET=latin1";

    dbSession.getDBSession().query(createCollegTable, function (err, res) {
        if (!err) {
            console.log("College Table created successfully.");
        } else {
            console.log("Error occured to create Table.", err);
        }
    });
}

function createCourseTable() {
    var createCourseTable = "CREATE TABLE IF NOT EXISTS course(course_id int(11) NOT NULL AUTO_INCREMENT,"
        + "collegeName varchar(20) DEFAULT NULL," + "collegeCourse varchar(50) DEFAULT NULL ,"
        + "PRIMARY KEY (course_id)) ENGINE=InnoDB DEFAULT CHARSET=latin1";

    dbSession.getDBSession().query(createCourseTable, function (err, res) {
        if (!err) {
            console.log("Course Table created successfully.");
        } else {
            console.log("Error occured to create Table.", err);
        }
    });
}

function getCollegeList() {
    return new Promise((resolve, reject) => {
        dbSession.getDBSession().query("select * from college", function (err, rows) {
            if (!err) {
                resolve(rows);
            } else {
                reject(err.message);
            }
        });
    });
}

function getCourseList() {
    return new Promise((resolve, reject) => {
        dbSession.getDBSession().query("select * from course", function (err, rows) {
            if (!err) {
                resolve(rows);
            } else {
                reject(err.message);
            }
        });
    });
}

function saveCollege(collegeObject) {
    return new Promise((resolve, reject) => {
        dbSession.getDBSession().query("INSERT INTO college (collegeName, collegeEmail, collegeAddress) VALUES (?,?,?)", [collegeObject.collegeName, collegeObject.collegeEmail, collegeObject.collegeAddress], function (err, rows) {
            if (!err) {
                resolve("{ \"code\": 200, \"Message\": \" College Record inserted successfully\"}");
            } else {
                reject(err.message);
            }
        });
    });
}

function saveCourse(collegeObject) {
    for (var course of collegeObject.collegeCourses) {
        console.log("course iterate", course);
        return new Promise((resolve, reject) => {
            console.log("course saving");
            dbSession.getDBSession().query("INSERT INTO course (collegeName, collegeCourse) VALUES (?,?)", [collegeObject.collegeName, course], function (err, rows) {
                if (!err) {
                    resolve("{ \"code\": 200, \"Message\": \"Record inserted successfully\"}");
                } else {
                    reject(err.message);
                }
            });
        });
    }
}

module.exports = {
    saveCollege: saveCollege,
    saveCourse:saveCourse,
    getCollegeList: getCollegeList,
    createCollegeTable: createCollegeTable,
    createCourseTable: createCourseTable,
    getCourseList: getCourseList
};