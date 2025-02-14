import { getStorageValue, getStorageValues } from '../slotValues'
import { BigNumber } from 'ethers'

const emissionController = '0xBa69e6FC7Df49a3b75b565068Fb91ff2d9d91780'
const usdc = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const musd = '0xe2f2a5c287993345a840db3b0845fbc70f5935a5'

if (!process.env.NODE_URL) throw Error('Must export env var NODE_URL')
const url = process.env.NODE_URL

describe('Slot Values', () => {
    test('Emissions controller first slot latest', async () => {
        expect(
            await getStorageValue(url, emissionController, 1, '15272562')
        ).toEqual(
            '0x00000000000000000000000000000000000000000000000000000AB700000A96'
        )
    })
    test('Emissions controller first slot on deployment', async () => {
        expect(
            await getStorageValue(
                url,
                emissionController,
                BigNumber.from(1),
                13761579
            )
        ).toEqual(
            '0x00000000000000000000000000000000000000000000000000000A9600000A96'
        )
    })
    test('Emissions controller first slot before deployment', async () => {
        expect(
            await getStorageValue(url, emissionController, 1, 13761570)
        ).toEqual(
            '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
    })
    test('USDC second slot', async () => {
        expect(await getStorageValue(url, usdc, 0)).toEqual(
            '0x000000000000000000000000FCB19E6A322B27C06842A71E8C725399F049AE3A'
        )
    })
    test('mUSD proxy admin slot', async () => {
        expect(
            await getStorageValue(
                url,
                musd,
                '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103'
            )
        ).toEqual(
            '0x0000000000000000000000005C8EB57B44C1C6391FC7A8A0CF44D26896F92386'
        )
    })
    test('Emissions Controller batch', async () => {
        const values = await getStorageValues(
            url,
            emissionController,
            [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103',
            ],
            '15272562'
        )
        console.log(values)
        expect(values).toEqual([
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            '0x00000000000000000000000000000000000000000000000000000AB700000A96',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000000000000000000000000002',
            '0x0000000000000000000000000000000000000000000000000000000000000013',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000005C8EB57B44C1C6391FC7A8A0CF44D26896F92386',
        ])
    })
    test('Emissions Controller reserve slot order', async () => {
        const values = await getStorageValues(
            url,
            emissionController,
            [2, 1, 0],
            '15272562'
        )
        console.log(values)
        expect(values).toEqual([
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x00000000000000000000000000000000000000000000000000000AB700000A96',
            '0x0000000000000000000000000000000000000000000000000000000000000001',
        ])
    })
})
