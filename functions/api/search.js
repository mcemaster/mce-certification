// POST /api/search - 인증기업 검색
var TURNSTILE_SECRET = '0x4AAAAAACLk45Mz5K1C4uE7OamqgUupAj4';

export async function onRequestPost(context) {
  var req = context.request;
  var env = context.env;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    var body = await req.json();
    var companyName = body.companyName || '';
    var certNumber = body.certNumber || '';
    var token = body.token || '';
    
    // Turnstile 검증
    var form = new URLSearchParams();
    form.append('secret', TURNSTILE_SECRET);
    form.append('response', token);
    form.append('remoteip', req.headers.get('CF-Connecting-IP') || '');
    
    var verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: form.toString()
    });
    
    var verifyResult = await verify.json();
    
    if (!verifyResult.success) {
      return new Response(JSON.stringify({error: '자동입력방지 인증에 실패했습니다.'}), {status: 400, headers: headers});
    }
    
    // 검색
    var sql = 'SELECT * FROM certifications WHERE 1=1';
    var params = [];
    
    if (companyName) {
      sql = sql + ' AND company_name LIKE ?';
      params.push('%' + companyName + '%');
    }
    
    if (certNumber) {
      sql = sql + ' AND cert_number LIKE ?';
      params.push('%' + certNumber + '%');
    }
    
    sql = sql + ' ORDER BY created_at DESC LIMIT 50';
    
    var stmt = env.DB.prepare(sql);
    if (params.length > 0) {
      stmt = stmt.bind.apply(stmt, params);
    }
    
    var result = await stmt.all();
    
    return new Response(JSON.stringify({results: result.results || []}), {status: 200, headers: headers});
    
  } catch (e) {
    return new Response(JSON.stringify({error: '검색 중 오류가 발생했습니다.'}), {status: 500, headers: headers});
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
