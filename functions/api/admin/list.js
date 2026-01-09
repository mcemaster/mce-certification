// GET /api/admin/list - 인증 목록 조회
export async function onRequestGet(context) {
  var env = context.env;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    var result = await env.DB.prepare('SELECT * FROM certifications ORDER BY created_at DESC').all();
    return new Response(JSON.stringify({results: result.results || []}), {status: 200, headers: headers});
  } catch (e) {
    return new Response(JSON.stringify({error: '조회 오류'}), {status: 500, headers: headers});
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
