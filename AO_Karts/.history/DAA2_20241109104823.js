
var coinChange = function (coins, amount) {
               if (amount < 1) {
                   return 0;
               }
           
               const counter = new Array(amount + 1).fill(
                   Number.MAX_VALUE
               );
           
               counter[0] = 0;
           
               for (let i = 0; i < coins.length; i++) {
                   for (let j = coins[i]; j < amount + 1; j++) {
                       counter[j] = Math.min(
                           counter[j],
                           counter[j - coins[i]] + 1
                       );
                   }
               }
           
               if (counter[amount] == Number.MAX_VALUE) {
                   return -1;
               }
           
               return counter[amount];
           };
var coinChange = function (coins, amount) {
    if (amount < 1) {
        return 0;
    }

    const counter = new Array(amount + 1).fill(
        Number.MAX_VALUE
    );

    counter[0] = 0;

    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j < amount + 1; j++) {
            counter[j] = Math.min(
                counter[j],
                counter[j - coins[i]] + 1
            );
        }
    }

    if (counter[amount] == Number.MAX_VALUE) {
        return -1;
    }

    return counter[amount];
};

console.log(coinChange([12,4,55,] , 10))