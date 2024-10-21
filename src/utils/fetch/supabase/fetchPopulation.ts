// utils/fetch/supabase/fetchPopulation.ts

import { createClient } from '@/utils/supabase/client'

export const fetchPopulation = async (bcode: string) => {
  const supabase = createClient();
  
  console.log('Fetching population for bcode:', bcode); // bcode 값 로그
  console.log(`type of bcode : ${typeof bcode}, bcode : ${bcode}`);

  try {
    const { data, error } = await supabase
      .from('Population')
      .select('*')
      .eq('id', bcode)
      .single(); // 단일 레코드 조회

    if (error) {
      console.error('Error fetching population:', error);
      return null;
    }

    console.log('Population data:', data); // 가져온 데이터 로그
    return data?.total_population || 0;
  } catch (err) {
    console.error('Error during fetch:', err);
    return null;
  }
};
