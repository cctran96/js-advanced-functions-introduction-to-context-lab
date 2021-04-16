function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, dateHour) {
    const obj = {
        'type': 'TimeIn',
        'hour': parseInt(dateHour.slice(11)),
        'date': dateHour.slice(0, 10)
    }
    let arr = employee.timeInEvents
    arr.push(obj)
    employee.timeInEvents = arr
    return employee
}

function createTimeOutEvent(employee, dateHour) {
    const obj = {
        'type': 'TimeOut',
        'hour': parseInt(dateHour.slice(11)),
        'date': dateHour.slice(0, 10)
    }
    let arr = employee.timeOutEvents
    arr.push(obj)
    employee.timeOutEvents = arr
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const hourIn = employee.timeInEvents.find(obj => obj.date == date).hour
    const hourOut = employee.timeOutEvents.find(obj => obj.date == date).hour
    return (hourOut - hourIn)/100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    let total = 0
    employee.timeOutEvents.forEach(obj => total += wagesEarnedOnDate(employee, obj.date))
    return total
}

function findEmployeeByFirstName(arrays, firstName) {
    return arrays.find(obj => obj.firstName === firstName)
}

function calculatePayroll(employees) {
    let total = 0
    employees.forEach(employee => total += allWagesFor(employee))
    return total
}