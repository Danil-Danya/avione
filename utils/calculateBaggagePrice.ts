export const calculateBaggageInfo = (segments: any[]) => {
    const info = segments[0]?.flightInfos?.[0];
    if (!info) {
        return {
            hasBaggage: false,
            baggageIncluded: false,
            weight: null,
            pieces: null
        };
    }

    let flag = String(info.baggage || "").toUpperCase().trim();

    if (!flag || flag === "NO" || flag === "0KG" || flag === "0PC") {
        return {
            hasBaggage: false,
            baggageIncluded: false,
            weight: null,
            pieces: null
        };
    }

    if (flag.endsWith("KG")) {
        const weight = parseInt(flag.replace("KG", ""), 10);

        return {
            hasBaggage: true,
            baggageIncluded: true,
            weight,
            pieces: null
        };
    }

    if (flag.endsWith("PC")) {
        const pieces = parseInt(flag.replace("PC", ""), 10);

        return {
            hasBaggage: true,
            baggageIncluded: true,
            weight: null,
            pieces
        };
    }

    return {
        hasBaggage: true,
        baggageIncluded: true,
        weight: null,
        pieces: null
    };
};

