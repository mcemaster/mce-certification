-- 인증 기업 정보 테이블 생성
CREATE TABLE IF NOT EXISTS certifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  cert_number TEXT NOT NULL UNIQUE,
  cert_standard TEXT NOT NULL,
  cert_body TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  scope TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 검색 성능을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_company_name ON certifications(company_name);
CREATE INDEX IF NOT EXISTS idx_cert_number ON certifications(cert_number);
CREATE INDEX IF NOT EXISTS idx_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_expiry_date ON certifications(expiry_date);
