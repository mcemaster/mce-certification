import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Bindings }>();

// 인증 기업 검색 API (공개)
api.get('/certifications/search', async (c) => {
  const companyName = c.req.query('companyName');
  const certNumber = c.req.query('certNumber');

  if (!companyName || !certNumber) {
    return c.json({ error: '기업명과 인증서번호를 모두 입력해주세요.' }, 400);
  }

  try {
    const result = await c.env.DB.prepare(
      `SELECT * FROM certifications 
       WHERE company_name = ? AND cert_number = ? AND status = 'active'`
    )
      .bind(companyName, certNumber)
      .first();

    if (!result) {
      return c.json({ error: '해당 인증 정보를 찾을 수 없습니다.' }, 404);
    }

    // 만료일 체크
    const expiryDate = new Date(result.expiry_date as string);
    const today = new Date();
    const isExpired = expiryDate < today;

    return c.json({
      ...result,
      isExpired,
      daysUntilExpiry: Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    });
  } catch (error) {
    console.error('Search error:', error);
    return c.json({ error: '검색 중 오류가 발생했습니다.' }, 500);
  }
});

// 인증서 유효성 검증 API (공개)
api.get('/certifications/verify/:certNumber', async (c) => {
  const certNumber = c.req.param('certNumber');

  try {
    const result = await c.env.DB.prepare(
      `SELECT cert_number, company_name, cert_standard, expiry_date, status 
       FROM certifications 
       WHERE cert_number = ?`
    )
      .bind(certNumber)
      .first();

    if (!result) {
      return c.json({ valid: false, message: '인증서를 찾을 수 없습니다.' }, 404);
    }

    const expiryDate = new Date(result.expiry_date as string);
    const today = new Date();
    const isExpired = expiryDate < today;
    const isActive = result.status === 'active';

    return c.json({
      valid: isActive && !isExpired,
      certification: result,
      isExpired,
      isActive,
      expiryDate: result.expiry_date
    });
  } catch (error) {
    console.error('Verification error:', error);
    return c.json({ error: '검증 중 오류가 발생했습니다.' }, 500);
  }
});

// 관리자용 인증 목록 조회
api.get('/admin/certifications', async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const search = c.req.query('search') || '';
  const offset = (page - 1) * limit;

  try {
    let query = 'SELECT * FROM certifications';
    let countQuery = 'SELECT COUNT(*) as total FROM certifications';
    const params: string[] = [];

    if (search) {
      query += ' WHERE company_name LIKE ? OR cert_number LIKE ?';
      countQuery += ' WHERE company_name LIKE ? OR cert_number LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    const [results, countResult] = await Promise.all([
      c.env.DB.prepare(query).bind(...params, limit, offset).all(),
      c.env.DB.prepare(countQuery).bind(...params).first()
    ]);

    return c.json({
      data: results.results,
      pagination: {
        page,
        limit,
        total: (countResult as any).total,
        totalPages: Math.ceil((countResult as any).total / limit)
      }
    });
  } catch (error) {
    console.error('Admin list error:', error);
    return c.json({ error: '목록 조회 중 오류가 발생했습니다.' }, 500);
  }
});

export default api;
