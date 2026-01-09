// POST /api/admin/bulk - 일괄 등록
export async function onRequestPost(context) {
  var req = context.request;
  var env = context.env;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    var data = await req.json();
    var list = data.certifications || [];
    
    if (list.length === 0) {
      return new Response(JSON.stringify({error: '데이터가 없습니다.'}), {status: 400, headers: headers});
    }
    
    var inserted = 0;
    
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      
      if (!c.company_name || !c.cert_number || !c.cert_standard || !c.issue_date || !c.expiry_date || !c.scope) {
        continue;
      }
      
      try {
        await env.DB.prepare(
          'INSERT OR REPLACE INTO certifications (company_name, cert_number, cert_standard, cert_body, issue_date, expiry_date, scope, contact_name, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          c.company_name,
          c.cert_number,
          c.cert_standard,
          c.cert_body || 'MCE 경영인증평가원',
          c.issue_date,
          c.expiry_date,
          c.scope,
          c.contact_name || null,
          c.contact_phone || null
        ).run();
        inserted++;
      } catch (e) {}
    }
    
    return new Response(JSON.stringify({success: true, inserted: inserted}), {status: 200, headers: headers});
    
  } catch (e) {
    return new Response(JSON.stringify({error: '일괄 등록 오류'}), {status: 500, headers: headers});
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
