var dateOfBirth = document.querySelector("#birthDayInput");
var checkBtn = document.querySelector("#checkBtn");
var showMessage = document.querySelector(".display");
const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function findNextDate(date, month, year) {
    let day1 = Number(date);
    let month1 = Number(month);
    let year1 = Number(year);
    let day2 = Number(date);
    let month2 = Number(month);
    let year2 = Number(year);

    for (var i = 1; i > 0; i++) {

        day1 = day1 + 1;
        if (day1 > Number(datesInMonth[month1 - 1])) {
            day1 = 1;
            month1 = month1 + 1;
            if (month1 > 12) {
                month1 = 1;
                year1 = year1 + 1;
            }
        }
        let yearString = year1.toString();
        let monthString = month1.toString();
        let dayString = day1.toString();
        if (monthString.length == 1) {
            monthString = "0" + monthString;
        }
        if (dayString.length == 1) {
            dayString = "0" + dayString;
        }
        let flagNextDate = checkCombinations(dayString, monthString, yearString);
        if (flagNextDate) {
            return [flagNextDate, i];
        }


        if (year2 > 1) {
            day2 = day2 - 1;
            if (day2 < 1) {
                month2 = month2 - 1;
                if (month2 < 1) {
                    month2 = 12;
                    year2 = year2 - 1;
                    if (year2 < 1) {
                        break;
                    }
                    day2 = datesInMonth[month2 - 1];
                }
            }
            let yearString = year2.toString();
            let monthString = month2.toString();
            let dayString = day2.toString();
            if (monthString.length == 1) {
                monthString = "0" + monthString;
            }
            if (dayString.length == 1) {
                dayString = "0" + dayString;
            }
            let flagNextDate = checkCombinations(dayString, monthString, yearString);
            if (flagNextDate) {
                return [flagNextDate, i];
            }
        }

    }
}

function isPallindrome(stringCheck) {
    var start = 0;
    var end = stringCheck.length - 1;
    while (start < end) {
        if (stringCheck[start] != stringCheck[end]) {
            return false;
        } else {
            start++;
            end--;
        }
    }
    return true;
}

function checkCombinations(dd, mm, yyyy) {
    //yyyymmdd format string
    const format1 = yyyy + mm + dd;

    //ddmmyyyy format string
    const format2 = dd + mm + yyyy;

    //mmddyy format string
    const format3 = mm + dd + yyyy.substring(2);

    //mddyyyy format string
    const format4 = Number(mm) + dd + yyyy;

    if (isPallindrome(format1)) {
        return (yyyy + "-" + mm + "-" + dd);
    } else if (isPallindrome(format2)) {
        return (dd + "-" + mm + "-" + yyyy);
    } else if (isPallindrome(format3)) {
        return (mm + "-" + dd + "-" + yyyy.substring(2));
    } else if (isPallindrome(format4)) {
        return (Number(mm) + "-" + dd + "-" + yyyy);
    } else {
        return null;
    }
}

function checkPallindrome(dd) {
    var dateArray = dd.split("-");
    var year = dateArray[0];
    var month = dateArray[1];
    var date = dateArray[2];
    let flag = checkCombinations(date, month, year);
    if (flag) {
        showMessage.innerHTML = ("Yay! Your birthdate in format " + flag + " is palindrome");
    } else {
        let [nextDate, daysAhead] = findNextDate(date, month, year);
        showMessage.innerHTML = ("Oopss !! Your birthdate is not palindrome. Nearest palindrome date is " + nextDate + " You missed it by " + daysAhead + " days.");
    }
}

function clickHandler(dd) {
    var dob = dateOfBirth.value;
    if (dob) {
        checkPallindrome(dob);
    } else {
        showMessage.innerHTML = "Please Enter A Valid Date";
    }
}

checkBtn.addEventListener('click', clickHandler);