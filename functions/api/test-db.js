// GET /api/test-db - DB 연결 테스트
export async function onRequestGet(context) {
  var env = context.env;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    // DB 연결 확인
    if (!env.DB) {
      return new Response(JSON.stringify({
        success: false,
        error: 'DB 바인딩이 없습니다. wrangler.toml 또는 Cloudflare 설정을 확인하세요.'
      }), {status: 500, headers: headers});
    }
    
    // 테이블 존재 확인
    var tableCheck = await env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='certifications'"
    ).first();
    
    if (!tableCheck) {
      return new Response(JSON.stringify({
        success: false,
        error: '테이블이 존재하지 않습니다. migrations를 실행해주세요.',
        hint: 'Cloudflare Dashboard > D1 > mce-certification-db > Console에서 migrations/001_create_certifications.sql 내용을 실행하세요.'
      }), {status: 500, headers: headers});
    }
    
    // 데이터 개수 확인
    var count = await env.DB.prepare('SELECT COUNT(*) as cnt FROM certifications').first();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'DB 연결 성공!',
      table_exists: true,
      record_count: count ? count.cnt : 0
    }), {status: 200, headers: headers});
    
  } catch (e) {
    return new Response(JSON.stringify({
      success: false,
      error: 'DB 오류: ' + e.message
    }), {status: 500, headers: headers});
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
