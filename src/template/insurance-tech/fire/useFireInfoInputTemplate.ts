

import { createClient } from '@/utils/supabase/client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { fetchPopulation } from '@/utils/fetch/supabase/fetchPopulation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import { useDispatch } from 'react-redux'
import { setAddress, setPopulation, setPosition, setBcode, setBuildingData } from '@/store/actions/analysisSlice'
import { fetchLatLngFromAddress } from '@/utils/fetch/googlemap/fetchLocation'
import { getCircleBounds } from '@/utils/gis/mapUtils'
import { fetchBuildingData } from '@/utils/fetch/vworld/fetchBuildingData'
import { parseBuildingData } from '@/utils/gis/buildingUtils'
import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import { useRouter } from 'next/navigation'

interface IAddr {
    address: string;
    zonecode: string;
    bcode: string; // 법정동코드
  }
  
  const FormSchema = z.object({
    username: z
      .string({
        required_error: "Please select an email to display.",
      }),
    location: z
      .string({
        required_error: "Please select an email to display.",
      }),
    zonecode: z
      .string({
        required_error: "Please select an email to display.",
      }),
    bcode: z
      .string({
        required_error: "Please select an email to display.",
      }),
    zebgrade: z.number()
  })
  
export function useFireInfoInputTemplate() {

  const dispatch = useDispatch();
  const supabase = createClient();
  const population = useSelector((state: RootState) => state.analysis.population);
  const bcode = useSelector((state : RootState) => state.analysis.bcode);
  const buildingData = useSelector((state : RootState) => state.analysis.buildingData); 
  const position = useSelector((state:RootState) => state.analysis.latlngpos);
  const tileURL = useSelector((state:RootState) => state.analysis.tileURL);
  
  const [density, setDensity] = useState<number>(0);
  const [rippleEffect, setRippleEffect] = useState<number>(0);
  const [rippleEffectMessage, setRippleEffectMessage] = useState<string>("건물이 선택되지 않았어요.");
  const [rippleEffectColor, setRippleEffectColor] = useState<string>("bg-red-300");
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculationFinished, setIsCalculationFinished] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      location: "",
      zonecode: "",
      zebgrade: 0,
      bcode: "",
    }
  });

  // 제출 버튼 클릭 시 로딩 상태로 전환
  const handleSubmit = async (data: any) => {
    setIsLoading(true); // 로딩 시작
    const startTime = Date.now();

    await onSubmit(data); // 실제 제출 작업

    const elapsedTime = Date.now() - startTime;
    const remainingTime = 3000 - elapsedTime;

    // 최소 2초 동안 로딩 화면을 유지하고 계산 완료 후 결과 화면만 표시
    setTimeout(() => {
      setIsLoading(false); // 로딩 종료
      setIsCalculationFinished(true); // 계산 완료 상태로 전환
    }, remainingTime > 0 ? remainingTime : 0);
  };


  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {

        form.setValue('location', data.address);
        form.setValue('zonecode', data.zonecode);
        form.setValue('bcode', data.bcode);
        dispatch(setAddress({ newAddress: data.address }));
        dispatch(setBcode({newBcode : data.bcode}));
      },
    }).open();
  }

  // ripple Effect에 따른 color 선택 함수.
  const selectRippleEffectColor = (effect : number) => {
    if(effect > 60) {
      setRippleEffectColor('bg-red-300'); 
    } else if (effect > 40) {
      setRippleEffectColor('bg-yellow-300');
    } else {
      setRippleEffectColor('bg-green-300');
    }
  }

  // 초기화 함수
  const initialize = () => {
    dispatch(setAddress({ newAddress: "" }));
    dispatch(setBcode({ newBcode: "" }));
    setDensity(0);
    setRippleEffect(0)
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {    

    // 0. 모든 값 초기화 
    initialize(); 

    console.log('Form submitted with bcode:', bcode); // 제출된 폼 데이터 로그
    
    // 1. Supabase에서 인구수 데이터를 가져옴
    const populationData = await fetchPopulation(bcode);

    if (populationData) {
      console.log('Population data fetched successfully:', populationData); // 성공한 경우
      dispatch(setPopulation({ newPopulation: populationData })); // Redux 상태로 저장
      
    } else {
      console.error('Failed to fetch population data'); // 실패한 경우
    }

    // 2. 구글맵 지오코딩 api로 주소를 입력하여 위도, 경도 데이터 가져옴
    const latlngPos = await fetchLatLngFromAddress(form.getValues('location'));
    if (latlngPos) {
      console.log(`Location : ${latlngPos.lat}, ${latlngPos.lng}`);
      dispatch(setPosition({newPosition:latlngPos}))
    } else {
      console.error('Failed to fetch latitude longitude position. ');
    }
  }

  // 3. latlngPos를 기준으로 100미터 반경내의 모든 건물 정보 vworld로부터 가져오기
  useEffect(() => {
    const getBuildingData = async () =>{
      
      const bounds = getCircleBounds(position, 100)
      const bbox = `${bounds.west},${bounds.south},${bounds.east},${bounds.north}`
      const gisData = await fetchBuildingData(bbox);
      if (gisData) {
        const newBuildingData = parseBuildingData(gisData);
        dispatch(setBuildingData({newBuildingData : newBuildingData}));
        console.log(`number of near buildings : ${newBuildingData.length}`);
      }
    }

    getBuildingData(); 
  }, [position])
  
  // 4. 건물들의 건축면적총합/대지면적총합 구하기 => 건물 밀도 계산
  useEffect(() => {
  
    console.log(`building data length : ${buildingData.length}`);
    let totalLandArea = 0
    let totalBuildArea = 0
    for (const building of buildingData) {
      const land = building.properties.plot_ar;
      const build = building.properties.ar;
    
      // 디버깅을 위한 값 검사
      console.log(`Building ID: ${building.properties.gis_idntfc_no}`);
      console.log(`Land area (plot_ar): ${land}, Type: ${typeof land}`);
      console.log(`Build area (ar): ${build}, Type: ${typeof build}`);
    
      // 값이 없거나 타입이 맞지 않을 경우 디버깅 메시지 추가
      if (land === undefined || land === null || isNaN(land)) {
        console.warn(`Invalid land area for building ID: ${building.properties.gis_idntfc_no}`);
      }
    
      if (build === undefined || build === null || isNaN(build)) {
        console.warn(`Invalid build area for building ID: ${building.properties.gis_idntfc_no}`);
      }
    
      // 숫자 값만 더하도록 안전 처리
      totalLandArea += typeof land === 'number' ? land : 0;
      totalBuildArea += typeof build === 'number' ? build : 0;
    }
    
    // 밀도와 화재파급력 계산
    console.log(`density : ${totalBuildArea/totalLandArea}`)
    const density = totalBuildArea / totalLandArea;
    const effect = (((density + 0.15) * population) * 100) / 40000;
    // denstiy 수식 정정 필요 -> 연면적 총합 / 대지면적 총합
    setDensity(density);
    setRippleEffect(effect);
    // rippleEffect에 따른 색깔 변경
    selectRippleEffectColor(effect)
    // setIsCalculationFinished(true); // 계산 완료 상태로 전환
  },

  [buildingData]);


  // rippleEffect, population 값에 따른 분석 결과를 rippleEffectMessage에 저장합니다. 
  useEffect(() => {
    const analysisRippleEffect = (density : number, population : number) => {

      // 5,000 미만 -> 낮음, 5,000이상 10,000 미만 => 보통, 10,000 이상 -> 높음 
      let ppDegree = "보통"
      switch(true) {
        case (population < 5000) :
          ppDegree="낮음"
          break;
        case (5000 <= population && population < 10000):
          ppDegree="보통"
          break; 
        case (population >= 10000):
          ppDegree="높음"
          break;
      }
  
      // 0.15 미만 -> 낮음, 0.15 ~ 0.4 -> 보통, 0.4 ~ 0.7 -> 높음 -> 0.7 초과 -> 매우 높음
      let dsDegree = "보통" 
      switch(true) {
        case (density < 0.15) :
          dsDegree="낮음"
          break;
        case (0.15 <= density && density < 0.4):
          dsDegree="보통"
          break; 
        case (0.4 <= density && density < 0.7):
          dsDegree="높음"
          break;
        case (0.7 <= density):
          dsDegree="매우높음"
          break;
      }
      console.log(`건물 밀도 : ${density}, dsDegree : ${dsDegree}`);
  
      let message = `단위면적당 인구수는 ${ppDegree}, 건축물 밀도는 ${dsDegree} 수준입니다.`
      if (ppDegree == "높음"){
        message += "\n주변에 많은 인구가 살고 있어 신속한 화재 대피에 대한 매뉴얼이 필요합니다."
      } else if (dsDegree == "높음" || dsDegree == "매우 높음") {
        message += "\n건축물의 밀도가 매우 높기 때문에, 화재 확산 방치 대책이 필요합니다."
      } else {
        message += "\n전기 시설 이상징후 및 건축물 내화 구조 상설 모니터링이 필요합니다."
      }
      setRippleEffectMessage(message);
    }
    analysisRippleEffect(density, population);

  }, [density])
  
  // {lat, lng} 포지션으로 맵을 이동시킵니다.
  const RecenterAutomatically = ({lat, lng} : any) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [lat, lng]);
     return null;
   }

  return {
    dispatch, 
    supabase, 
    population, 
    setPopulation, 
    form,
    handleAddressSearch, 
    onSubmit,
    buildingData, 
    position,
    tileURL,
    density,
    rippleEffect,
    RecenterAutomatically, 
    rippleEffectColor,
    rippleEffectMessage, 
    isCalculationFinished, 
    isLoading,
    handleSubmit
  }
}
