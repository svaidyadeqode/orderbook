import { apiHeader, URL } from "@/utils/constant";
import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
    const [rawData, setRawData] = useState([])
    useEffect(() => {
        const ws = new WebSocket(url);
        ws.onopen = (event) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(apiHeader));
            }
        };

        ws.onmessage = function (event: MessageEvent<string>) {
            if (Array.isArray(JSON.parse(event.data))) {
                const rawData = JSON.parse(event.data)[1];
                setRawData(rawData)
            }
        };
    }, [url]);

    return rawData

}

export default useWebSocket