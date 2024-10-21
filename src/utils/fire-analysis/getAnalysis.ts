
export const getBuildingDensity = (landArea : number, buildArea : number) => {
    return ( buildArea / landArea ) * 100
}

export const getFireRippleEffect = (population : number, density : number ) => {
    return (density + 0.15) * population;
}

export const getFireRisk = (age : number, solarRadiation : number, radiationTime : number, totalArea : number, buildArea : number) => {
    // 수명 * 일사량 * 1일당 일조시간 * 태양 남중고도 / 벽체면적
    // 층수 : 연면적 / 건축면적 
    // 벽체면적 : 4 * 층수 * 연면적 / (층수 + 1)
    const floor = totalArea / buildArea 
    const wallArea = (4 * floor * totalArea)/(floor + 1)
    return (solarRadiation * age * 0.765 * radiationTime) / wallArea 
}

