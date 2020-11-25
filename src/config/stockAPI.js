import axios from "axios"
const API_KEY = process.env.REACT_APP_FB_KEY  
const API_URL = process.env.REACT_APP_QUOTE_URL

export const stockAPI = {

    getRequest: async (symbol) => {
        const response = await axios({
            "method": "GET",
            "url": API_URL,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
                "x-rapidapi-key": API_KEY,
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
