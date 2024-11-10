
// Initialize a DP array dp of size amount + 1, where each entry represents the minimum coins needed for each amount. Set dp[0] = 0 (no coins are needed for zero amount) and all other entries to a large number (e.g., amount + 1).
// Iterate through each coin and, for each coin, update the dp values from that coin's value up to amount.
// For each amount x, update dp[x] as the minimum of dp[x] and dp[x - coin] + 1.
// If dp[amount] is still a large number, return -1 (meaning the amount can't be made up); otherwise, return dp[amount].

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