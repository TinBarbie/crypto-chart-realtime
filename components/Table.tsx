import path from "path"

const Table = () => {
    const tableTitle = ["Pair", "Price", "24h Change", "24h Volume(coin)", "24h Volume USD"]
    const fakeCoinList = [
        [
            "BTC/USDT",
            50000.14214,
            1.412213,
            1000,
            50000,
        ],
        [
            "ETH/USDT",
            3000.4214213213,
            0.4213213,
            1000,
            50000,
        ],
        [
            "BTC/USDC",
            50001.412421,
            1.12321321,
            1000,
            50000,
        ],
        [
            "ETH/USDC",
            3001.4214213,
            0.42434,
            1000,
            50000,
        ], [
            "SOL/USDT",
            202.421213,
            2.421421,
            1000,
            50000,
        ],
        [
            "SOL/USDC",
            203.1242124,
            2.42444,
            1000,
            50000,
        ],
    ]
    return (
        <div className="w-full bg-zinc-100 flex flex-col px-4">
            <div className="grid grid-cols-5 bg-zinc-200">
                {tableTitle.map((title, index) => (
                    <p key={index} className="text-center text-lg py-2 font-medium">{title}</p>
                ))}
            </div>
            {fakeCoinList.map((items, index) => (
                <div key={index} className="grid grid-cols-5">
                    {items.map((value, i) => (
                        <p key={i} className={`text-center text-lg py-2 ${i == 0 ? "font-bold" : "font-normal"}`}>
                            {(i == 1 || i == 2) ? (
                                new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 2 }).format(value as number)
                            ) : (i == 3 ? (
                                <div>

                                </div>
                            ) : (i == 4 ? (
                                <div>

                                </div>
                            ) : value
                            ))}
                        </p>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default Table