// a function that takes a string and reverses it

function reverseString(str){
    let x=str.split("").reverse().join("");
    return x;
}

// a function that check whether a string is a palindrome or not

function isPalindrome(str){
    let x=str.split("").reverse().join("");
    if (x===str){
        return true;
    }
    else{
        return false;
    }
}

// a function that converts a date from from number to string.
// we do this to add a zero to number which is less than 10

let date={
    day:2,
    month:2,
    year: 2020
}

// first we will add zero to number which is less that 10

function setAsString(date){
    let dateStr={day: "", month:"", year:""}

    if (date.day<10){
        dateStr.day="0"+date.day
    }
    else{
        dateStr.day=date.day.toString()
    }

    if (date.month<10){
        dateStr.month="0"+date.month
    }
    else{
        dateStr.month=date.month.toString()
    }

    dateStr.year=date.year.toString()

    return dateStr

}

// now we will get all variations of date in different formats

function checkDifferenctFormats(date){
    let dateStr= setAsString(date)

    let ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    let mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    let yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    let ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(2,4);
    let mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(2,4);
    let yymmdd=dateStr.year.slice(2,4)+dateStr.month+dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

// a function that checks palindrome for all date formats

function checkPalindromeForAllFormats(date){
    let listOfPalindromes= checkDifferenctFormats(date);
    let flag=false;

    for (let i=0; i<listOfPalindromes.length; i++){
        if (isPalindrome(listOfPalindromes[i])){
            flag=true;
        }
    }
    return flag;
    
}



// helper function to confirm if leap year

function isLeap(year){
    if (year%4===0){
        return true;
    }
    if (year%100===0 ){
        return false;
    }
    if (year%400===0){
        return true
    }
    else{
        return false;
    }
}

// another helper function which helps us to get the next consecutive date

function getNextDate(date){
    let day=date.day+1;
    let month=date.month;
    let year=date.year;

    let daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    // check if month is feb
    if(month==2){
        // check if leap year
        if (isLeap(year)){
            if(day>29){
                day=1;
                month++
            }
        }
            else{
                // if not leap year
                if (day>28){
                    day=1;
                    month++;
                }
            }

        
    }else{
        // months other than feb
        if (day>daysInMonth[month-1]){
            day=1;
            month++
        }
    
        // incrementing year 
        if (month>12){
            month=1;
            year++;
        }
    }

    return{
        day:day,
        month: month,
        year:year

    }

}

// if current date is not a palindrome, this function will get for palindome in coming days

function checkNextPalindrome(date){
    let counter=0;
    let nextDate=getNextDate(date);

    while(1){
        counter++;
        let palindome= checkPalindromeForAllFormats(nextDate)
            if (palindome){
                break;
            }
            nextDate=getNextDate(nextDate)
        
    }
    return [counter, nextDate]
}

// creating the get prev day and check prev palindromes to determine which of the 2 is earlier

function checkPrevDate(date){
    let day=date.day-1;
    let month=date.month;
    let year=date.year;

    let daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    // check if march and leap year
    if (month==3){
        // check for leap
        if(isLeap(year)){
            if(day<1){
                day=29;
                month--;
            }

        }
        else{
            // for non leap year
            if (day<1){
                day=28;
                month--;
            }
        }
        
    }else{
        // for other months
        if (day<1){
            day=daysInMonth[month-2]
            month--;
        }

        // decrementing year
        if(month<1){
            day=31;
            month=12;
            year--;

        }
    }
    return{
        day:day,
        month:month,
        year:year
    };
}

// check for prev palindrome dates

function getPrevPalindrome(date){
    let counter2=0;
    let prevDate= checkPrevDate(date)

    while(1){
        counter2++
        let palindrome= checkPalindromeForAllFormats(prevDate)
        if (palindrome){
            break;
        }

        prevDate=checkPrevDate(prevDate)
    }

    return [counter2, prevDate]
}

console.log(getPrevPalindrome(date))

let inputEl=document.querySelector("#birthday")
let buttonEL=document.querySelector("#check");
let outputEl=document.querySelector("#output");

function palindrome(){
    let string=inputEl.value;
// need to convert string into valid format

if (inputEl.value!==checkDifferenctFormats){
    outputEl.innerText=`Please enter a valid date`


}
    
if (string!==""){
    let list=string.split("-")
    let date={
        day:Number(list[2]),
        month:Number(list[1]),
        year:Number(list[0])
    }
    let ifPalindrome =checkPalindromeForAllFormats(date)
    console.log(ifPalindrome)

    if (ifPalindrome){
      outputEl.innerText="Yep, it's a palindrome"
    }
    else{
        let [counter, nextDate]=checkNextPalindrome(date)
        let [counter2, prevDate]=getPrevPalindrome(date)

        if (counter>counter2){

            outputEl.innerText=`Not a palindrome. 
            
            You missed a palindrome date by ${counter2} days, which was on ${prevDate.day}-${prevDate.month}-${prevDate.year}`

        }
        else{

            outputEl.innerText=`Not a palindrome.

            You will have a palindrome date in ${counter} days, which will be on ${nextDate.day}-${nextDate.month}-${nextDate.year}`

        }

    }
}
    
    
}


  

buttonEL.addEventListener("click", palindrome);