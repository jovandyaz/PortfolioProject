import axios from "axios"
import { YFLL } from './api'

export const stockAPI = {

    getRequest: async (symbol) => {
        const response = await axios({
            "method": "GET",
            "url": YFLL.quote_url,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
                "x-rapidapi-key": YFLL.fb_key,
                "useQueryString": true,
            },
            "params": {
                "lang": "en",
                "symbols": `${symbol}`,
            }
        })
        return response.data.quoteResponse.result[response.data.quoteResponse.result.length - 1]
    }
}