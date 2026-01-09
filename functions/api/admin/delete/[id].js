// DELETE /api/admin/delete/:id - 인증 삭제
export async function onRequestDelete(context) {
  var env = context.env;
  var id = context.params.id;
  
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    await env.DB.prepare('DELETE FROM certifications WHERE id = ?').bind(id).run();
    return new Response(JSON.stringify({success: true}), {status: 200, headers: headers});
  } catch (e) {
    return new Response(JSON.stringify({error: '삭제 오류'}), {status: 500, headers: headers});
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
