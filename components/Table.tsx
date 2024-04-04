
"use client"

import { cryptoKeys, cryptoPairs, cryptoIconList, tableTitle } from "@/fakeData"
import { getNumberFromObjectKey } from "@/helpers"
import { useEffect, useState } from "react"

const Table = () => {
    const [renderable, setRenderable] = useState(false)
    const [prices, setPrices] = useState({
        btcusdc: 0,
        ethusdc: 0,
        btcusdt: 0,
        usdcusdt: 0,
        ethusdt: 0,
        solusdc: 0,
        ethbtc: 0,
        maticusdc: 0
    })

    const [pricesChange, setPricesChange] = useState({
        btcusdc: 0,
        ethusdc: 0,
        btcusdt: 0,
        usdcusdt: 0,
        ethusdt: 0,
        solusdc: 0,
        ethbtc: 0,
        maticusdc: 0
    })

    const [volumes, setVolumes] = useState({
        btcusdc: 0,
        ethusdc: 0,
        btcusdt: 0,
        usdcusdt: 0,
        ethusdt: 0,
        solusdc: 0,
        ethbtc: 0,
        maticusdc: 0
    })

    const [volumesUSD, setVolumesUSD] = useState({
        btcusdc: 0,
        ethusdc: 0,
        btcusdt: 0,
        usdcusdt: 0,
        ethusdt: 0,
        solusdc: 0,
        ethbtc: 0,
        maticusdc: 0
    })

    useEffect(() => {
        // Track the price of the crypto pairs
        cryptoKeys.map((pair) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair.toLowerCase()}@trade`)
            ws.onmessage = (event) => {
                if (getNumberFromObjectKey(prices, pair) !== JSON.parse(event.data).p as number) {
                    setPrices((prev) => ({ ...prev, [pair.toLowerCase()]: JSON.parse(event.data).p }))
                }
            }
        })
        // Track the price change 24h of the crypto pairs
        cryptoKeys.map((pair) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair.toLowerCase()}@ticker`)
            ws.onmessage = (event) => {
                if (getNumberFromObjectKey(pricesChange, pair) !== JSON.parse(event.data).P as number) {
                    setPricesChange((prev) => ({ ...prev, [pair.toLowerCase()]: JSON.parse(event.data).P }))
                }
                // console.log(event.data)
            }
        })
        // Track the volume 24h of the crypto pairs
        cryptoKeys.map((pair) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair.toLowerCase()}@ticker`)
            ws.onmessage = (event) => {
                if (getNumberFromObjectKey(volumes, pair) !== JSON.parse(event.data).v as number) {
                    setVolumes((prev) => ({ ...prev, [pair.toLowerCase()]: JSON.parse(event.data).v }))
                }
            }
        })

        // Track the volume 24h in USD of the crypto pairs
        cryptoKeys.map((pair) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair.toLowerCase()}@ticker`)
            ws.onmessage = (event) => {
                if (getNumberFromObjectKey(volumesUSD, pair) !== JSON.parse(event.data).c * JSON.parse(event.data).v as number) {
                    setVolumesUSD((prev) => ({ ...prev, [pair.toLowerCase()]: JSON.parse(event.data).c * JSON.parse(event.data).v }))
                }
            }
        })
    }, [])

    // Initialize data and show chart after 10 seconds
    setTimeout(() => {
        setRenderable(true)
    }, 0)
    if (!renderable) {
        return (
            <h1 className="text-4xl text-center text-green-400">
                Please wait 10 seconds to load the initial data ^^
                (Because some pairs have slow response time)
            </h1>
        )
    } else {
        return (
            <div className="w-full bg-zinc-100 flex flex-col px-3">
                <div className="grid grid-cols-5 bg-zinc-200 px-4">
                    {tableTitle.map((title, index) => (
                        <div key={index} className={`flex items-center gap-2 ${index != 0 ? "justify-end" : ""}`}>
                            {index === 4 && <img src="/assets/icons/arrow-down.svg" alt="arrow-down" className="w-6 h-6" />}
                            <p className="text-center text-lg py-2 font-medium">{title}</p>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-5">
                    {tableTitle.map((_, index) => (
                        <div key={index} className="flex flex-col">
                            {index == 0 ? (
                                <div className="pl-4">
                                    {
                                        cryptoPairs.map((pair, id) => (
                                            <div key={id} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full">
                                                    <img src={`assets/icons/${cryptoIconList[id][0]}-bg.svg`} alt="BTC icon" className="w-full h-full" />
                                                </div>
                                                <p key={id} className='text-center text-lg py-2 font-bold'>
                                                    {pair}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : index == 1 ? (
                                <>
                                    {
                                        cryptoKeys.map((pair, i) => (
                                            <div key={i} className="flex items-center justify-end">
                                                <div className="flex items-center gap-3">
                                                    <img src={`assets/icons/${cryptoIconList[i][1]}.svg`} alt="BTC icon" className="w-6 h-6" />
                                                    <p key={i} className='text-center text-lg py-2 font-medium'>
                                                        {new Intl.NumberFormat("en-IN", { maximumFractionDigits: 4 }).format(getNumberFromObjectKey(prices, pair))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            ) : index == 2 ? (
                                <div className="pr-2">
                                    {
                                        cryptoKeys.map((pair, i) => (
                                            <p key={i} className={`text-end text-lg py-2 font-medium ${getNumberFromObjectKey(pricesChange, pair) > 0 ? "text-green-500" : (getNumberFromObjectKey(pricesChange, pair) < 0 ? "text-red-500" : "text-black")}`}>
                                                {`${getNumberFromObjectKey(pricesChange, pair) > 0 ? "+" : ""}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(getNumberFromObjectKey(pricesChange, pair))}%`}
                                            </p>
                                        ))
                                    }
                                </div>
                            ) : index == 3 ? (
                                <div className="pr-4">
                                    {
                                        cryptoKeys.map((pair, i) => (
                                            <div key={i} className="flex items-center justify-end gap-3">
                                                <img src={`assets/icons/${cryptoIconList[i][0]}.svg`} alt="BTC icon" className="w-6 h-6" />
                                                <p key={i} className='text-center text-lg py-2 font-normal'>
                                                    {new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 4 }).format(getNumberFromObjectKey(volumes, pair))}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="pr-4">
                                    {
                                        cryptoKeys.map((pair, i) => (
                                            <p key={i} className='text-end text-lg py-2 font-normal'>
                                                ${new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 3 }).format(getNumberFromObjectKey(volumesUSD, pair))}
                                            </p>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

export default Table