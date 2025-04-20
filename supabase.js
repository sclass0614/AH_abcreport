// Supabase 연결 정보
const supabaseUrl = 'https://dfomeijvzayyszisqflo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmb21laWp2emF5eXN6aXNxZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NjYwNDIsImV4cCI6MjA2MDQ0MjA0Mn0.-r1iL04wvPNdBeIvgxqXLF2rWqIUX5Ot-qGQRdYo_qk';

// Supabase 클라이언트 초기화
const client = supabase.createClient(supabaseUrl, supabaseKey);



// 함수를 전역 객체에 할당하여 export (window에 속성으로 노출)
// window.getPlanData = getPlanData;
// window.getJournalData = getJournalData;
// window.convertTimeToMinutes = convertTimeToMinutes;
// window.formatTimeString = formatTimeString; 

/**
 * 날짜에 해당하는 계획 데이터 가져오기
 * @param {number} date - 날짜 (yyyymmdd 형식의 숫자)
 * @returns {Promise<Array>} - 계획 데이터 객체 배열
 */
async function getPlanData(date) {
    try {
        // 날짜는 int4 타입이므로 숫자로 변환
        const dateNumber = parseInt(date, 10);
        
        // Supabase 쿼리 실행
        const { data, error } = await client
            .from('activities_plan')
            .select('*')
            .eq('날짜', dateNumber)
            .order('시작시간', { ascending: true });
        
        if (error) {
            console.error('계획 데이터 조회 오류:', error);
            return [];
        }
        
        // 객체 형태 그대로 반환
        return data;
    } catch (error) {
        console.error('계획 데이터 처리 중 오류 발생:', error);
        return [];
    }
}

/**
 * 날짜에 해당하는 일지 데이터 가져오기
 * @param {number} date - 날짜 (yyyymmdd 형식의 숫자)
 * @returns {Promise<Array>} - 일지 데이터 객체 배열
 */
async function getJournalData(date) {
    try {
        // 날짜는 int4 타입이므로 숫자로 변환
        const dateNumber = parseInt(date, 10);
        
        // Supabase 쿼리 실행
        const { data, error } = await client
            .from('activities_journal')
            .select('*')
            .eq('날짜', dateNumber)
            .order('시작시간', { ascending: true });
        
        if (error) {
            console.error('일지 데이터 조회 오류:', error);
            return [];
        }
        
        // 객체 형태 그대로 반환
        return data;
    } catch (error) {
        console.error('일지 데이터 처리 중 오류 발생:', error);
        return [];
    }
}

