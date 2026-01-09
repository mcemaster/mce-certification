# MCE 경영인증평가원 - 인증 기업 검색 시스템

KCN(한국인정기구) 스타일의 인증 기업 검색 시스템입니다.

## 🎯 주요 기능

### 1️⃣ 데이터베이스 스키마
- `certifications` 테이블 추가
  - 인증 기업명, 인증서번호, 인증 규격, 인증기관
  - 발급일, 만료일, 인증 범위, 상태
  - 담당자 정보 (이름, 이메일, 전화번호)
  - 주소 및 생성/수정 날짜
- 검색 성능을 위한 인덱스 추가

### 2️⃣ API 엔드포인트
- `GET /api/certifications/search` - 인증 기업 검색 (공개)
  - 기업명과 인증서번호로 정확한 매칭 검색
  - 유효한 인증서만 조회
- `GET /api/certifications/verify/:certNumber` - 인증서 유효성 검증 (공개)
  - 인증번호로 유효성 확인
  - 만료일 체크
- `GET /api/admin/certifications` - 관리자용 인증 목록 조회
  - 페이지네이션 지원
  - 검색 및 필터링 기능

### 3️⃣ 웹 페이지
- `/certification-search` - 인증 기업 검색 페이지
  - KCN 스타일 UI/UX
  - 실시간 검색 및 결과 표시
  - 상세 인증 정보 표시
- `/public/certification-search-standalone.html` - 아임웹용 독립형 페이지
  - Tailwind CSS CDN 사용
  - 외부 사이트 임베딩 가능
  - API 연동 완료

### 4️⃣ 샘플 데이터
- 20개 대기업 인증 데이터 시딩
- 삼성전자, 현대자동차, LG화학, SK하이닉스 등
- ISO 9001, ISO 14001, ISO 45001, ISO 27001 등 다양한 규격
- 실제 인증 정보 형식 준수

## 📝 파일 구조

```
mce-certification/
├── migrations/
│   └── 003_create_certifications.sql
├── src/
│   ├── index.tsx
│   ├── routes/
│   │   └── api.tsx
│   └── pages/
│       └── CertificationSearch.tsx
├── public/
│   └── certification-search-standalone.html
├── seed_certifications.sql
├── package.json
├── wrangler.toml
├── tsconfig.json
└── README.md
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 데이터베이스 설정
```bash
# D1 데이터베이스 생성
wrangler d1 create mce-certification-db

# wrangler.toml에 database_id 업데이트

# 마이그레이션 실행
npm run db:migrate

# 샘플 데이터 시딩
npm run db:seed
```

### 3. 로컬 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 4. 배포
```bash
npm run deploy
```

## 🎨 UI/UX 특징

- KCN 인증기업 검색 사이트와 유사한 디자인
- 검색 안내 및 제한사항 명시
- 인증서 유효성 시각적 표시 (유효/만료)
- 반응형 디자인 (모바일 지원)

## 🔧 기술 스택

- **Backend**: Hono + TypeScript
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: JSX + Tailwind CSS
- **Deployment**: Cloudflare Pages

## 🌐 접속 URL

- 통합 페이지: https://your-site.pages.dev/certification-search
- 독립형 페이지: https://your-site.pages.dev/certification-search-standalone.html

## 📲 아임웹 임베딩 방법

1. 아임웹 사이트 편집 모드 진입
2. HTML/스크립트 위젯 추가
3. 다음 코드 삽입:

```html
<iframe 
  src="https://your-site.pages.dev/certification-search-standalone.html" 
  width="100%" 
  height="1200px" 
  frameborder="0"
  style="border: none;"
></iframe>
```

## ✅ 테스트 시나리오

1. **정상 검색**: 삼성전자주식회사 + KR-ISO9001-2024-001
2. **만료된 인증서**: 상태 표시 확인
3. **잘못된 검색**: 에러 메시지 표시
4. **빈 검색**: 유효성 검증

## 🔐 보안 고려사항

- XSS 방지를 위한 HTML 이스케이프 처리
- 입력값 검증 및 sanitization
- HTTPS only 접속

## 📊 향후 개선 사항

- [ ] 검색 횟수 제한 (1일 3회) 구현
- [ ] 인증서 PDF 다운로드 기능
- [ ] 다국어 지원 (영문)
- [ ] 관리자 페이지에서 인증 데이터 CRUD

## 📄 라이선스

MIT License
