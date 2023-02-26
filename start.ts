interface fileType {
    status: boolean;
    coinName: string;
    price: number;
    amount: number;
}

interface Buy {
    calculated: boolean;
    price: number;
    amount: number;
}

interface Sell {
    calculated: boolean;
    price: number;
    amount: number;
}


const file: fileType[] = [
    {
        status: true,
        coinName: "BTC",
        price: 680000.0,
        amount: 2.5,
    },
    {
        status: true,
        coinName: "ETH",
        price: 43000.0,
        amount: 12.0,
    },
    {
        status: true,
        coinName: "BTC",
        price: 690000.0,
        amount: 2.5,
    },
    {
        status: false,
        coinName: "BTC",
        price: 695000.0,
        amount: 3,
    },
    {
        status: true,
        coinName: "ETH",
        price: 43500.0,
        amount: 23.5,
    },
    {
        status: false,
        coinName: "BTC",
        price: 695000.0,
        amount: 1.0,
    },
    {
        status: false,
        coinName: "ETH",
        price: 45000.0,
        amount: 30.0,
    },

];

// store profit that's been caculated
let totalProfit: number = 0;


function calculate(file: fileType[]) {
    let btcInfo: fileType[] = [];
    let ethInfo: fileType[] = [];

    //seperate btc and eth
    file.forEach( e => {
        if(e.coinName === "BTC") btcInfo.push(e);
        else if(e.coinName === "ETH") ethInfo.push(e);
    });

    //get btc profit
    getProfit(btcInfo);
    //get eth profit
    getProfit(ethInfo);

}

// caculator
function getProfit(btcInfo: fileType[]) {
    let btcBuy: Buy[] = [];
    let btcSell: Sell[] = [];

    //split buy and sell 
    btcInfo.forEach( e => {
        if(e.status === true) {
            btcBuy.push(
                {
                    calculated: false,
                    price: e.price,
                    amount: e.amount
                }
            );
        } else if(e.status === false) {
            btcSell.push(
                {
                    calculated: false,
                    price: e.price,
                    amount: e.amount
                }
            );
        };
    })

    // use 2 pointers to check each time we sell
    btcSell.forEach((e, index) => {
        if(!e.calculated) {
            let amountLeft = e.amount;
            btcBuy.forEach((e2, index) => {
                if(!e2.calculated && amountLeft != 0) {
                    if(amountLeft === e2.amount) {
                        totalProfit += (e.price - e2.price) * e.amount;
                        btcBuy[index].amount = 0;
                        btcBuy[index].calculated = true;
                    } else if (amountLeft > e2.amount) {
                        totalProfit += (e.price - e2.price) * e2.amount;
                        amountLeft = amountLeft - e2.amount;
                        btcBuy[index].amount = 0;
                        btcBuy[index].calculated = true;
                    } else if (amountLeft < e2.amount) {
                        totalProfit += (e.price - e2.price) * amountLeft;
                        btcBuy[index].amount = e2.amount - amountLeft;
                        // amountLeft = 0;
                    }
                }
            })
            btcSell[index].calculated = true;
        }
    })
}




calculate(file);

console.log(totalProfit);
