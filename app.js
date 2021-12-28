function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToString(date){
    var dateStr = {day: '', month: '', year: ''};

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date){
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]    
}




function checkPalindromeForAllFormats(date){
    var listofPalindromes = getAllDateFormats(date);

    var flag = false;
     for(var i=0;i < listofPalindromes.length;i++){
         if(isPalindrome(listofPalindromes[i])){
             flag = true;
             break;
         }
     }
     return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}


const dateInput = document.querySelector("#date-input");
const btnCheck = document.querySelector("#btn-check");
const outputDiv = document.querySelector("#output");
const loadingDiv = document.querySelector("#loading-lottie");

loadingDiv.style.display = "none";

function clickHandler(e){
    var bdayStr = dateInput.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForAllFormats(date);

        loadingDiv.style.display = "block";
        output.style.display = "none";

        setTimeout(() =>{
            loadingDiv.style.display = "none";
            output.style.display = "block";
               
            if(isPalindrome){
                outputDiv.innerText = 'Yay! Your Birthday is Palindrome!!😍😚'           
            } 
            else{
                var [ctr, nextDate] = getNextPalindromeDate(date);
                outputDiv.innerText = `Aww! Your birthday is not a palindrome.The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by ${ctr} days!!🙁`
            } 
        }, 3700);        
    }
}

btnCheck.addEventListener("click", clickHandler);




