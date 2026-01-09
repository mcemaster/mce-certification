// POST /api/admin/login - 관리자 로그인
export async function onRequestPost(context) {
  var req = context.request;
  var env = context.env;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    var body = await req.json();
    var username = body.username || '';
    var password = body.password || '';
    
    // 환경 변수에서 관리자 정보 가져오기
    var adminUser = env.ADMIN_USERNAME || 'admin';
    var adminPass = env.ADMIN_PASSWORD || 'mce2024!@#';
    
    if (username === adminUser && password === adminPass) {
      // 간단한 세션 토큰 생성
      var token = generateToken();
      
      return new Response(JSON.stringify({
        success: true,
        token: token,
        message: '로그인 성공'
      }), {status: 200, headers: headers});
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: '아이디 또는 비밀번호가 올바르지 않습니다.'
      }), {status: 401, headers: headers});
    }
    
  } catch (e) {
    return new Response(JSON.stringify({error: '로그인 처리 중 오류가 발생했습니다.'}), {status: 500, headers: headers});
  }
}

function generateToken() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var token = '';
  for (var i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
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
