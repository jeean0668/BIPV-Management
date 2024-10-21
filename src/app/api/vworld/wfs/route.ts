// src/pages/api/getBldgisSpceWFS.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const {searchParams} = new URL(req.url); 
  const bbox = searchParams.get('bbox');
  const key = searchParams.get('key');
  const domain = searchParams.get('domain');

  const maxFeatures = 1000
  const srsName = 'EPSG:4326'
  const output = 'application/json'

  console.log(key);
  console.log(domain)
  const apiUrl = new URL(`https://api.vworld.kr/ned/wfs/getBldgisSpceWFS?typename=dt_d010&bbox=${bbox}&srsName=${srsName}&output=${output}&maxFeatures=${maxFeatures}&key=${key}&domain=${domain}`)
  // const apiUrl = new URL(`https://api.vworld.kr/ned/wfs/getBldgisSpceWFS?typename=dt_d010&bbox=${bbox}&srsName=${srsName}&output=${output}&maxFeatures=${maxFeatures}&key=${key}`)

  const res = await fetch(apiUrl,
    {
      method : 'GET',
    }
  )

  const data = await res.text()
  console.log(data);
  // 의심되는 위치 
  const parsedData = JSON.parse(data); 
  
  console.log(parsedData.features);
  if (!res.ok){
    throw new Error(res.statusText);
  }

  return NextResponse.json(JSON.parse(data))
}