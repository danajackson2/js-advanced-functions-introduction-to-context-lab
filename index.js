function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

function createEmployeeRecords(array){
    return array.map(i => createEmployeeRecord(i))
}

function createTimeInEvent(emp, dateString){
    emp.timeInEvents.push({
        type : "TimeIn",
        hour : parseInt(dateString.split(' ')[1]),
        date : dateString.split(' ')[0]
    })
    return emp
}

function createTimeOutEvent(emp, dateString){
    emp.timeOutEvents.push({
        type : "TimeOut",
        hour : parseInt(dateString.split(' ')[1]),
        date : dateString.split(' ')[0]
    })
    return emp
}

function hoursWorkedOnDate(emp, date){
    return (emp.timeOutEvents.find(e => e.date === date).hour - emp.timeInEvents.find(e => e.date === date).hour)/100
}

function wagesEarnedOnDate(emp, date){
    return hoursWorkedOnDate(emp, date) * emp.payPerHour
}

function allWagesFor(emp){
    return emp.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(emp, event.date)  
    }, 0)
}

function findEmployeeByFirstName(empArray, name){
    return empArray.find(emp => emp.firstName === name)
}

function calculatePayroll(empArray){
    return empArray.reduce(function(total, emp){
        return total + allWagesFor(emp)
    }, 0)
}