
"use client"

import { cryptoKeys, cryptoPairs, cryptoIconList, tableTitle, initialPrices, initialChanges, initialVolumes, initialVolumesUSD } from "@/fakeData"
import { getKey } from "@/helpers"
import { ChangeState } from "@/types"
import { useEffect, useState } from "react"

const Table = () => {
    const [updatedRows, setUpdatedRows] = useState(new Set())

    const [prices, setPrices] = useState(initialPrices)

    const [updatedPrices, setUpdatedPrices] = useState<ChangeState[]>([])
    const [pricesChange, setPricesChange] = useState(initialChanges)

    const [volumes, setVolumes] = useState(initialVolumes)

    const [volumesUSD, setVolumesUSD] = useState(initialVolumesUSD)

    // const [previous]

    useEffect(() => {
        // Track the price of the crypto pairs
        cryptoKeys.map((pair, index) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair}@aggTrade`)
            ws.onmessage = (event) => {
                console.log(JSON.parse(event.data).p);
                if (getKey(prices, pair) !== JSON.parse(event.data).p) {
                    setPrices((prev) => ({ ...prev, [pair]: JSON.parse(event.data).p }))
                    if (!updatedRows.has(index)) {
                        setUpdatedRows(prev => prev.add(index))
                    }
                    if (!updatedPrices.some(item => item.index === index)) {
                        if (getKey(prices, pair) > JSON.parse(event.data).p) {
                            setUpdatedPrices((prev) => [...prev, { index, state: -1 }])
                        } else {
                            setUpdatedPrices((prev) => [...prev, { index, state: 1 }])
                        }
                    }
                    setTimeout(() => {
                        setUpdatedRows(prev => {
                            prev.delete(index)
                            return prev
                        })
                        setUpdatedPrices(prev => prev.filter((item) => item.index !== index))
                    }, 1000)
                }
            }
        })
        // Track the price change 24h of the crypto pairs
        cryptoKeys.map((pair, index) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair}@ticker`)
            ws.onmessage = (event) => {
                if (getKey(pricesChange, pair) !== JSON.parse(event.data).P as number) {
                    setPricesChange((prev) => ({ ...prev, [pair]: JSON.parse(event.data).P }))
                    setUpdatedRows(prev => {
                        prev.delete(index)
                        return prev
                    })
                }
            }
        })
        // Track the volume 24h of the crypto pairs
        cryptoKeys.map((pair, index) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair}@ticker`)
            ws.onmessage = (event) => {
                if (getKey(volumes, pair) !== JSON.parse(event.data).v as number) {
                    setVolumes((prev) => ({ ...prev, [pair]: JSON.parse(event.data).v }))
                    setUpdatedRows(prev => {
                        prev.delete(index)
                        return prev
                    })
                }
            }
        })

        // Track the volume 24h in USD of the crypto pairs
        cryptoKeys.map((pair, index) => {
            let ws = new WebSocket(`wss://stream.binance.com:443/ws/${pair}@ticker`)
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const [c, v] = [Number(data.c), Number(data.v)];
                if (getKey(volumesUSD, pair) !== (c * v)) {
                    setVolumesUSD((prev) => ({ ...prev, [pair]: Number(c * v).toFixed(3) }))
                    setUpdatedRows(prev => {
                        prev.delete(index)
                        return prev
                    })
                }
            }
        })
    }, [])

    console.log(updatedRows);
    return (
        <div className="w-full bg-zinc-100 flex flex-col px-3 z-[10]">
            <div className="grid grid-cols-5 bg-zinc-200 px-4">
                {tableTitle.map((title, index) => (
                    <div key={index} className={`flex items-center gap-2 ${index != 0 ? "justify-end" : ""}`}>
                        {index === 4 && <img src="/assets/icons/arrow-down.svg" alt="arrow-down" className="w-6 h-6" />}
                        <p className="text-center text-lg py-2 font-medium">{title}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                {cryptoKeys.map((pair, id) => (
                    <div key={id} className="relative w-full h-[44px]">
                        <div className={`absolute top-0 left-0 w-full h-full content-none ${updatedRows.has(id) ? "bg-pseudo" : ""}`}>
                        </div>
                        <div className={`grid grid-cols-5 bg-transparent z-[20]`}>
                            {tableTitle.map((_, i) => (
                                i == 0 ? (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full">
                                            <img src={`assets/icons/${cryptoIconList[id][0]}-bg.svg`} alt="BTC icon" className="w-full h-full" />
                                        </div>
                                        <p className='text-center text-lg py-2 font-bold'>
                                            {cryptoPairs[id]}
                                        </p>
                                    </div>
                                ) : i == 1 ? (
                                    <div className="flex">
                                        <div className="flex flex-1 items-center justify-between pl-[56px] gap-3">
                                            <img src={`assets/icons/${cryptoIconList[id][1]}.svg`} alt="BTC icon" className="w-6 h-6" />
                                            <p key={i} className={`text-center text-lg py-2 font-medium ${updatedPrices.some(item => item.index === id) && (updatedPrices[id]?.state === 1 ? "animated-text-up" : "animated-text-down")}`}>
                                                {new Intl.NumberFormat("en-IN", { maximumFractionDigits: 4 }).format(getKey(prices, pair))}
                                            </p>
                                        </div>
                                    </div>
                                ) : i == 2 ? (
                                    <p key={i} className={`text-end text-lg py-2 pr-2 font-medium ${getKey(pricesChange, pair) > 0 ? "text-green-500" : (getKey(pricesChange, pair) < 0 ? "text-red-500" : "text-black")}`}>
                                        {`${getKey(pricesChange, pair) > 0 ? "+" : ""}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(getKey(pricesChange, pair))}%`}
                                    </p>
                                ) : i == 3 ? (
                                    <div key={i} className="flex items-center justify-end gap-3">
                                        <img src={`assets/icons/${cryptoIconList[id][0]}.svg`} alt="BTC icon" className="w-6 h-6" />
                                        <p key={i} className='text-center text-lg py-2 pr-4 font-normal'>
                                            {getKey(volumes, pair) > 10000 ?
                                                new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 0 }).format(getKey(volumes, pair)) :
                                                new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 4 }).format(getKey(volumes, pair))}
                                        </p>
                                    </div>
                                ) : (
                                    <p key={i} className='text-end text-lg py-2 font-normal pr-4'>
                                        ${getKey(volumesUSD, pair) > 10000 ?
                                            new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 0 }).format(getKey(volumesUSD, pair)) :
                                            new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 3 }).format(getKey(volumesUSD, pair))}
                                    </p>
                                )
                            ))}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )

}

export default Table