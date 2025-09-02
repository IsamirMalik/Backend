const isPrime = (num) => {
    if(num % 2 == 0 || num == 0) {
        console.log(`${num} is a Prime Number`)
    } else  {
        
        console.log(`${num} is not a Prime Number`)
    }
};

module.exports = isPrime ;