// POST /api/admin/create - 인증 등록
export async function onRequestPost(context) {
  var req = context.request;
  var env = context.env;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    var data = await req.json();
    
    if (!data.company_name || !data.cert_number || !data.cert_standard || 
        !data.cert_body || !data.issue_date || !data.expiry_date || !data.scope) {
      return new Response(JSON.stringify({error: '필수 항목을 입력해주세요.'}), {status: 400, headers: headers});
    }
    
    await env.DB.prepare(
      'INSERT INTO certifications (company_name, cert_number, cert_standard, cert_body, issue_date, expiry_date, scope, contact_name, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      data.company_name,
      data.cert_number,
      data.cert_standard,
      data.cert_body,
      data.issue_date,
      data.expiry_date,
      data.scope,
      data.contact_name || null,
      data.contact_phone || null
    ).run();
    
    return new Response(JSON.stringify({success: true}), {status: 200, headers: headers});
    
  } catch (e) {
    var msg = '등록 오류';
    if (e.message && e.message.indexOf('UNIQUE') !== -1) {
      msg = '이미 등록된 인증번호입니다.';
    }
    return new Response(JSON.stringify({error: msg}), {status: 500, headers: headers});
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
