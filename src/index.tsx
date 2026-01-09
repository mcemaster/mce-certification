import { Hono } from 'hono';
import api from './routes/api';
import CertificationSearch from './pages/CertificationSearch';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// API 라우트 등록
app.route('/api', api);

// 인증 검색 페이지
app.get('/certification-search', (c) => {
  return c.html(<CertificationSearch />);
});

// 홈 페이지
app.get('/', (c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MCE 경영인증평가원</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">MCE 경영인증평가원</h1>
            <p class="text-gray-600 mb-8">Management Certification Evaluation Institute</p>
            <a
              href="/certification-search"
              class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              인증기업 검색하기
            </a>
          </div>
        </div>
      </body>
    </html>
  );
});

// Cloudflare Pages Functions export
export const onRequest = async (context: {
  request: Request;
  env: Bindings;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
}) => {
  return app.fetch(context.request, context.env, context);
};

export default app;
