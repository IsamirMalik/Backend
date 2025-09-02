const factorial = (num) => {
    if( isNaN(num)) return "please enter a number";
    if( num < 0) return "please enter a valid number";
    if(num == 0) return 1;

    return  num * factorial(num - 1); 
};

module.exports = factorial ;

