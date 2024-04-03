import path from "path"

const Table = () => {
    const tableTitle = ["Pair", "Price", "24h Change", "24h Volume(coin)", "24h Volume USD"]
    const fakeCryptoIconList = [
        [
            "btc",
            "dollar",
        ],
        [
            "eth",
            "usdt",
        ],
        [
            "btc",
            "dollar",
        ],
        [
            "eth",
            "usdt",
        ],
        [
            "sol",
            "dollar",
        ],
        [
            "eth",
            "btc"
        ],
        [
            "xrp",
            "dollar"
        ],
        [
            "matic",
            "dollar"
        ],
    ]
    const fakeCoinList = [
        [
            "BTC/USDC",
            50000.14214,
            1.412213,
            1000.632423,
            50000.14214,
        ],
        [
            "ETH/USDC",
            3000.4214213213,
            0.4213213,
            1000.632423,
            50000.14214,
        ],
        [
            "BTC/USDT",
            50001.412421,
            1.14321321,
            1000.632423,
            50000.14214,
        ],
        [
            "ETH/USDT",
            3001.4214213,
            0.43434,
            1000.632423,
            50000.14214,
        ],
        [
            "SOL/USDC",
            203.1242124,
            -2.43444,
            1000.632423,
            50000.14214,
        ],
        [
            "ETH/BTC",
            203.1242124,
            -2.43444,
            1000.632423,
            50000.14214,
        ],
        [
            "XRP/USDC",
            203.1242124,
            -2.43444,
            1000.632423,
            50000.14214,
        ],
        [
            "MATIC/USDC",
            203.1242124,
            -2.43444,
            1000.632423,
            50000.14214,
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
                        i == 1 ? (
                            <div key={i} className="flex items-center justify-end mr-8">
                                <div className="flex items-center gap-3">
                                    <img src={`assets/icons/${fakeCryptoIconList[index][1]}.svg`} alt="BTC icon" className="w-6 h-6" />
                                    <p key={i} className='text-center text-lg py-2 font-normal'>
                                        {new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value as number)}
                                    </p>
                                </div>
                            </div>

                        ) : (i == 2 ? (
                            <p key={i} className={`text-center text-lg py-2 font-normal ${value as number > 0 ? "text-green-500" : "text-red-500"}`}>
                                {`${value as number > 0 ? "+" : ""}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value as number)}%`}
                            </p>

                        )
                            : (i == 3 ? (
                                <div key={i} className="flex items-center justify-end mr-8">
                                    <div className="flex items-center gap-3">
                                        <img src={`assets/icons/${fakeCryptoIconList[index][0]}.svg`} alt="BTC icon" className="w-6 h-6" />
                                        <p key={i} className='text-center text-lg py-2 font-normal'>
                                            {new Intl.NumberFormat("en-IN", { maximumFractionDigits: 4 }).format(value as number)}
                                        </p>
                                    </div>
                                </div>

                            ) : (i == 4 ? (
                                <p key={i} className='text-center text-lg py-2 font-normal'>
                                    ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 3 }).format(value as number)}
                                </p>

                            ) : (
                                <div key={i} className="flex items-center ml-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full">
                                            <img src={`assets/icons/${fakeCryptoIconList[index][0]}-bg.svg`} alt="BTC icon" className="w-full h-full" />
                                        </div>
                                        <p className='text-center text-lg py-2 font-bold'>
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            )
                            )))

                    ))}
                </div>
            ))}

        </div>
    )
}

export default Table