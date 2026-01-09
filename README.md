# MCE 경영인증평가원 - 인증기업검색 시스템

KCN(한국인정기구) 스타일의 인증기업 검색 시스템입니다.

## 프로젝트 구조

```
mce-certification/
├── index.html                    # 검색 페이지
├── admin.html                    # 관리자 페이지
├── functions/
│   └── api/
│       ├── search.js             # POST /api/search
│       └── admin/
│           ├── list.js           # GET /api/admin/list
│           ├── create.js         # POST /api/admin/create
│           ├── bulk.js           # POST /api/admin/bulk
│           └── delete/[id].js    # DELETE /api/admin/delete/:id
├── migrations/
│   └── 001_create_certifications.sql
├── wrangler.toml
└── README.md
```

## 주요 기능

### 검색 페이지 (/)
- KCN 스타일 UI
- Cloudflare Turnstile 자동입력방지
- 한/영 안내문 포함
- 기업명/인증번호 검색

### 관리자 페이지 (/admin.html)
- 통계 대시보드
- 엑셀 파일 일괄 업로드
- 수동 인증 등록
- 인증 목록 조회/삭제

## Cloudflare Pages 배포 설정

| 항목 | 설정값 |
|------|--------|
| 빌드 명령 | (비워두기) |
| 빌드 출력 디렉터리 | `.` |

## D1 데이터베이스

바인딩 이름: `DB`
