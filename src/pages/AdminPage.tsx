const AdminPage = () => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 페이지 - MCE 경영인증평가원</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
      </head>
      <body class="bg-gray-100 min-h-screen">
        <nav class="bg-blue-800 text-white p-4 shadow-lg">
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">MCE 관리자 페이지</h1>
            <a href="/" class="text-blue-200 hover:text-white">← 메인으로</a>
          </div>
        </nav>

        <div class="max-w-7xl mx-auto p-6">
          {/* 엑셀 업로드 섹션 */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div>
                <h2 class="text-xl font-bold text-gray-800">엑셀 일괄 업로드</h2>
                <p class="text-sm text-gray-500 mt-1">엑셀 파일(.xlsx, .xls)로 여러 기업을 한번에 등록할 수 있습니다.</p>
              </div>
              <button onclick="downloadTemplate()" 
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                양식 다운로드
              </button>
            </div>
            
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
              id="dropZone"
              ondragover="handleDragOver(event)"
              ondragleave="handleDragLeave(event)"
              ondrop="handleDrop(event)">
              <input type="file" id="excelFile" accept=".xlsx,.xls" class="hidden" onchange="handleFileSelect(event)" />
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                <label for="excelFile" class="cursor-pointer text-blue-600 hover:text-blue-500 font-medium">
                  파일 선택
                </label>
                 또는 드래그 앤 드롭
              </p>
              <p class="mt-1 text-xs text-gray-500">XLSX, XLS 파일 지원</p>
            </div>

            {/* 미리보기 영역 */}
            <div id="previewSection" class="hidden mt-4">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium text-gray-800">미리보기 <span id="previewCount" class="text-blue-600"></span></h3>
                <div class="flex gap-2">
                  <button onclick="cancelUpload()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    취소
                  </button>
                  <button onclick="confirmUpload()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    업로드 확인
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto max-h-64 overflow-y-auto border rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-sm">
                  <thead class="bg-gray-50 sticky top-0">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500">기업명</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500">인증서번호</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500">인증규격</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500">발급일</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500">만료일</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500">상태</th>
                    </tr>
                  </thead>
                  <tbody id="previewBody" class="bg-white divide-y divide-gray-200">
                  </tbody>
                </table>
              </div>
            </div>

            {/* 업로드 진행 상태 */}
            <div id="uploadProgress" class="hidden mt-4">
              <div class="flex items-center gap-3">
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div id="progressBar" class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
                <span id="progressText" class="text-sm text-gray-600">0%</span>
              </div>
              <p id="uploadStatus" class="text-sm text-gray-600 mt-2"></p>
            </div>
          </div>

          {/* 새 인증 추가 폼 */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">새 인증 기업 추가 (개별)</h2>
            <form id="addForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">기업명 *</label>
                <input type="text" name="company_name" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자주식회사" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">인증서번호 *</label>
                <input type="text" name="cert_number" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: KR-ISO9001-2024-001" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">인증규격 *</label>
                <select name="cert_standard" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">선택하세요</option>
                  <option value="ISO 9001:2015">ISO 9001:2015 (품질경영)</option>
                  <option value="ISO 14001:2015">ISO 14001:2015 (환경경영)</option>
                  <option value="ISO 45001:2018">ISO 45001:2018 (안전보건)</option>
                  <option value="ISO 27001:2013">ISO 27001:2013 (정보보안)</option>
                  <option value="ISO 22000:2018">ISO 22000:2018 (식품안전)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">인증기관</label>
                <input type="text" name="cert_body" value="MCE 경영인증평가원"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">발급일 *</label>
                <input type="date" name="issue_date" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">만료일 *</label>
                <input type="date" name="expiry_date" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">인증범위 *</label>
                <input type="text" name="scope" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 반도체, 전자제품 제조 및 판매" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input type="text" name="address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 경기도 수원시 영통구 삼성로 129" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">담당자명</label>
                <input type="text" name="contact_name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <input type="text" name="contact_phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 02-1234-5678" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input type="email" name="contact_email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select name="status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">유효 (Active)</option>
                  <option value="expired">만료 (Expired)</option>
                  <option value="suspended">정지 (Suspended)</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <button type="submit"
                  class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
                  인증 기업 추가
                </button>
              </div>
            </form>
          </div>

          {/* 검색 및 목록 */}
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h2 class="text-xl font-bold text-gray-800">인증 기업 목록</h2>
              <div class="flex gap-2 w-full md:w-auto">
                <input type="text" id="searchInput" placeholder="기업명 또는 인증서번호 검색..."
                  class="flex-1 md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onclick="loadCertifications()" 
                  class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  검색
                </button>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">기업명</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">인증서번호</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">인증규격</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">만료일</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
                  </tr>
                </thead>
                <tbody id="certTableBody" class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td colspan="6" class="px-4 py-8 text-center text-gray-500">로딩 중...</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* 페이지네이션 */}
            <div id="pagination" class="flex justify-center items-center gap-2 mt-4">
            </div>
          </div>
        </div>

        {/* 수정 모달 */}
        <div id="editModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800">인증 정보 수정</h3>
              <button onclick="closeEditModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <form id="editForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="hidden" name="id" id="edit_id" />
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">기업명</label>
                <input type="text" name="company_name" id="edit_company_name" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">인증서번호</label>
                <input type="text" name="cert_number" id="edit_cert_number" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">인증규격</label>
                <select name="cert_standard" id="edit_cert_standard" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="ISO 9001:2015">ISO 9001:2015</option>
                  <option value="ISO 14001:2015">ISO 14001:2015</option>
                  <option value="ISO 45001:2018">ISO 45001:2018</option>
                  <option value="ISO 27001:2013">ISO 27001:2013</option>
                  <option value="ISO 22000:2018">ISO 22000:2018</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">인증기관</label>
                <input type="text" name="cert_body" id="edit_cert_body"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">발급일</label>
                <input type="date" name="issue_date" id="edit_issue_date" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">만료일</label>
                <input type="date" name="expiry_date" id="edit_expiry_date" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">인증범위</label>
                <input type="text" name="scope" id="edit_scope" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input type="text" name="address" id="edit_address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">담당자명</label>
                <input type="text" name="contact_name" id="edit_contact_name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <input type="text" name="contact_phone" id="edit_contact_phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input type="email" name="contact_email" id="edit_contact_email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select name="status" id="edit_status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">유효 (Active)</option>
                  <option value="expired">만료 (Expired)</option>
                  <option value="suspended">정지 (Suspended)</option>
                </select>
              </div>
              <div class="md:col-span-2 flex gap-2">
                <button type="submit"
                  class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                  저장
                </button>
                <button type="button" onclick="closeEditModal()"
                  class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200">
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 알림 토스트 */}
        <div id="toast" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hidden">
          <span id="toastMessage"></span>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          let currentPage = 1;
          const limit = 10;

          // 페이지 로드 시 목록 불러오기
          document.addEventListener('DOMContentLoaded', () => {
            loadCertifications();
          });

          // 인증 목록 불러오기
          async function loadCertifications(page = 1) {
            currentPage = page;
            const search = document.getElementById('searchInput').value;
            const tbody = document.getElementById('certTableBody');
            
            try {
              const response = await fetch(\`/api/admin/certifications?page=\${page}&limit=\${limit}&search=\${encodeURIComponent(search)}\`);
              const result = await response.json();
              
              if (result.data && result.data.length > 0) {
                tbody.innerHTML = result.data.map(cert => \`
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-900">\${cert.company_name}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">\${cert.cert_number}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">\${cert.cert_standard}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">\${cert.expiry_date}</td>
                    <td class="px-4 py-3">
                      <span class="px-2 py-1 text-xs rounded-full \${
                        cert.status === 'active' ? 'bg-green-100 text-green-800' : 
                        cert.status === 'expired' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }">
                        \${cert.status === 'active' ? '유효' : cert.status === 'expired' ? '만료' : '정지'}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <button onclick='openEditModal(\${JSON.stringify(cert).replace(/'/g, "&#39;")})' 
                        class="text-blue-600 hover:text-blue-800 mr-2">수정</button>
                      <button onclick="deleteCertification(\${cert.id}, '\${cert.company_name}')" 
                        class="text-red-600 hover:text-red-800">삭제</button>
                    </td>
                  </tr>
                \`).join('');
                
                renderPagination(result.pagination);
              } else {
                tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-500">등록된 인증 기업이 없습니다.</td></tr>';
                document.getElementById('pagination').innerHTML = '';
              }
            } catch (error) {
              console.error('Error:', error);
              tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-red-500">데이터를 불러오는데 실패했습니다.</td></tr>';
            }
          }

          // 페이지네이션 렌더링
          function renderPagination(pagination) {
            const container = document.getElementById('pagination');
            if (!pagination || pagination.totalPages <= 1) {
              container.innerHTML = '';
              return;
            }
            
            let html = '';
            
            if (pagination.page > 1) {
              html += \`<button onclick="loadCertifications(\${pagination.page - 1})" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">이전</button>\`;
            }
            
            for (let i = 1; i <= pagination.totalPages; i++) {
              if (i === pagination.page) {
                html += \`<button class="px-3 py-1 bg-blue-600 text-white rounded">\${i}</button>\`;
              } else {
                html += \`<button onclick="loadCertifications(\${i})" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">\${i}</button>\`;
              }
            }
            
            if (pagination.page < pagination.totalPages) {
              html += \`<button onclick="loadCertifications(\${pagination.page + 1})" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">다음</button>\`;
            }
            
            container.innerHTML = html;
          }

          // 새 인증 추가
          document.getElementById('addForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            try {
              const response = await fetch('/api/admin/certifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              if (response.ok) {
                showToast('인증 기업이 추가되었습니다.', 'success');
                e.target.reset();
                loadCertifications();
              } else {
                const error = await response.json();
                showToast(error.error || '추가에 실패했습니다.', 'error');
              }
            } catch (error) {
              showToast('네트워크 오류가 발생했습니다.', 'error');
            }
          });

          // 수정 모달 열기
          function openEditModal(cert) {
            document.getElementById('edit_id').value = cert.id;
            document.getElementById('edit_company_name').value = cert.company_name;
            document.getElementById('edit_cert_number').value = cert.cert_number;
            document.getElementById('edit_cert_standard').value = cert.cert_standard;
            document.getElementById('edit_cert_body').value = cert.cert_body || 'MCE 경영인증평가원';
            document.getElementById('edit_issue_date').value = cert.issue_date;
            document.getElementById('edit_expiry_date').value = cert.expiry_date;
            document.getElementById('edit_scope').value = cert.scope;
            document.getElementById('edit_address').value = cert.address || '';
            document.getElementById('edit_contact_name').value = cert.contact_name || '';
            document.getElementById('edit_contact_phone').value = cert.contact_phone || '';
            document.getElementById('edit_contact_email').value = cert.contact_email || '';
            document.getElementById('edit_status').value = cert.status;
            
            document.getElementById('editModal').classList.remove('hidden');
            document.getElementById('editModal').classList.add('flex');
          }

          // 수정 모달 닫기
          function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
            document.getElementById('editModal').classList.remove('flex');
          }

          // 인증 정보 수정
          document.getElementById('editForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const id = data.id;
            delete data.id;
            
            try {
              const response = await fetch(\`/api/admin/certifications/\${id}\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              if (response.ok) {
                showToast('인증 정보가 수정되었습니다.', 'success');
                closeEditModal();
                loadCertifications(currentPage);
              } else {
                const error = await response.json();
                showToast(error.error || '수정에 실패했습니다.', 'error');
              }
            } catch (error) {
              showToast('네트워크 오류가 발생했습니다.', 'error');
            }
          });

          // 인증 삭제
          async function deleteCertification(id, companyName) {
            if (!confirm(\`"\${companyName}" 인증 정보를 삭제하시겠습니까?\`)) {
              return;
            }
            
            try {
              const response = await fetch(\`/api/admin/certifications/\${id}\`, {
                method: 'DELETE'
              });
              
              if (response.ok) {
                showToast('인증 정보가 삭제되었습니다.', 'success');
                loadCertifications(currentPage);
              } else {
                const error = await response.json();
                showToast(error.error || '삭제에 실패했습니다.', 'error');
              }
            } catch (error) {
              showToast('네트워크 오류가 발생했습니다.', 'error');
            }
          }

          // 토스트 알림
          function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toast.className = \`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg \${
              type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white\`;
            toastMessage.textContent = message;
            toast.classList.remove('hidden');
            
            setTimeout(() => {
              toast.classList.add('hidden');
            }, 3000);
          }

          // 검색 엔터키 지원
          document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              loadCertifications();
            }
          });

          // ========== 엑셀 업로드 관련 함수 ==========
          let uploadData = [];

          // 양식 다운로드
          function downloadTemplate() {
            const template = [
              {
                '기업명': '예시기업주식회사',
                '인증서번호': 'KR-ISO9001-2024-999',
                '인증규격': 'ISO 9001:2015',
                '인증기관': 'MCE 경영인증평가원',
                '발급일': '2024-01-15',
                '만료일': '2027-01-14',
                '인증범위': '제품 제조 및 판매',
                '상태': 'active',
                '담당자명': '홍길동',
                '이메일': 'hong@example.com',
                '연락처': '02-1234-5678',
                '주소': '서울시 강남구 테헤란로 123'
              }
            ];
            
            const ws = XLSX.utils.json_to_sheet(template);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, '인증기업');
            
            // 열 너비 설정
            ws['!cols'] = [
              {wch: 20}, {wch: 25}, {wch: 18}, {wch: 18},
              {wch: 12}, {wch: 12}, {wch: 30}, {wch: 10},
              {wch: 12}, {wch: 25}, {wch: 15}, {wch: 35}
            ];
            
            XLSX.writeFile(wb, 'MCE_인증기업_양식.xlsx');
            showToast('양식 파일이 다운로드되었습니다.', 'success');
          }

          // 드래그 앤 드롭 핸들러
          function handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('dropZone').classList.add('border-blue-500', 'bg-blue-50');
          }

          function handleDragLeave(e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('dropZone').classList.remove('border-blue-500', 'bg-blue-50');
          }

          function handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('dropZone').classList.remove('border-blue-500', 'bg-blue-50');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              processFile(files[0]);
            }
          }

          // 파일 선택 핸들러
          function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
              processFile(file);
            }
          }

          // 엑셀 파일 처리
          function processFile(file) {
            const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
            if (!validTypes.includes(file.type) && !file.name.match(/\\.(xlsx|xls)$/i)) {
              showToast('엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.', 'error');
              return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                if (jsonData.length === 0) {
                  showToast('파일에 데이터가 없습니다.', 'error');
                  return;
                }

                // 데이터 매핑 및 검증
                uploadData = jsonData.map((row, index) => {
                  // 날짜 변환 함수
                  const parseDate = (value) => {
                    if (!value) return '';
                    if (typeof value === 'number') {
                      // 엑셀 날짜 시리얼 넘버 변환
                      const date = XLSX.SSF.parse_date_code(value);
                      return \`\${date.y}-\${String(date.m).padStart(2, '0')}-\${String(date.d).padStart(2, '0')}\`;
                    }
                    return String(value);
                  };

                  return {
                    company_name: row['기업명'] || '',
                    cert_number: row['인증서번호'] || '',
                    cert_standard: row['인증규격'] || '',
                    cert_body: row['인증기관'] || 'MCE 경영인증평가원',
                    issue_date: parseDate(row['발급일']),
                    expiry_date: parseDate(row['만료일']),
                    scope: row['인증범위'] || '',
                    status: row['상태'] || 'active',
                    contact_name: row['담당자명'] || '',
                    contact_email: row['이메일'] || '',
                    contact_phone: row['연락처'] || '',
                    address: row['주소'] || '',
                    _valid: !!(row['기업명'] && row['인증서번호'] && row['인증규격'] && row['발급일'] && row['만료일'] && row['인증범위'])
                  };
                });

                showPreview();
              } catch (error) {
                console.error('Excel parsing error:', error);
                showToast('파일을 읽는 중 오류가 발생했습니다.', 'error');
              }
            };
            reader.readAsArrayBuffer(file);
          }

          // 미리보기 표시
          function showPreview() {
            const validCount = uploadData.filter(d => d._valid).length;
            const invalidCount = uploadData.length - validCount;
            
            document.getElementById('previewCount').textContent = 
              \`(총 \${uploadData.length}건, 유효 \${validCount}건\${invalidCount > 0 ? ', 오류 ' + invalidCount + '건' : ''})\`;
            
            const tbody = document.getElementById('previewBody');
            tbody.innerHTML = uploadData.map((row, i) => \`
              <tr class="\${row._valid ? '' : 'bg-red-50'}">
                <td class="px-3 py-2 \${!row.company_name ? 'text-red-500' : ''}">\${row.company_name || '(필수)'}</td>
                <td class="px-3 py-2 \${!row.cert_number ? 'text-red-500' : ''}">\${row.cert_number || '(필수)'}</td>
                <td class="px-3 py-2 \${!row.cert_standard ? 'text-red-500' : ''}">\${row.cert_standard || '(필수)'}</td>
                <td class="px-3 py-2 \${!row.issue_date ? 'text-red-500' : ''}">\${row.issue_date || '(필수)'}</td>
                <td class="px-3 py-2 \${!row.expiry_date ? 'text-red-500' : ''}">\${row.expiry_date || '(필수)'}</td>
                <td class="px-3 py-2">
                  <span class="px-2 py-1 text-xs rounded-full \${
                    row.status === 'active' ? 'bg-green-100 text-green-800' : 
                    row.status === 'expired' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }">
                    \${row.status === 'active' ? '유효' : row.status === 'expired' ? '만료' : row.status}
                  </span>
                </td>
              </tr>
            \`).join('');
            
            document.getElementById('previewSection').classList.remove('hidden');
          }

          // 업로드 취소
          function cancelUpload() {
            uploadData = [];
            document.getElementById('previewSection').classList.add('hidden');
            document.getElementById('excelFile').value = '';
          }

          // 업로드 확인
          async function confirmUpload() {
            const validData = uploadData.filter(d => d._valid);
            
            if (validData.length === 0) {
              showToast('유효한 데이터가 없습니다.', 'error');
              return;
            }

            if (!confirm(\`\${validData.length}건의 데이터를 업로드하시겠습니까?\`)) {
              return;
            }

            document.getElementById('previewSection').classList.add('hidden');
            document.getElementById('uploadProgress').classList.remove('hidden');
            
            let success = 0;
            let failed = 0;
            const total = validData.length;

            for (let i = 0; i < validData.length; i++) {
              const item = validData[i];
              delete item._valid;
              
              try {
                const response = await fetch('/api/admin/certifications', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(item)
                });
                
                if (response.ok) {
                  success++;
                } else {
                  failed++;
                }
              } catch (error) {
                failed++;
              }
              
              // 진행률 업데이트
              const progress = Math.round(((i + 1) / total) * 100);
              document.getElementById('progressBar').style.width = progress + '%';
              document.getElementById('progressText').textContent = progress + '%';
              document.getElementById('uploadStatus').textContent = 
                \`처리 중... (\${i + 1}/\${total}) - 성공: \${success}, 실패: \${failed}\`;
            }

            // 완료
            document.getElementById('uploadStatus').textContent = 
              \`완료! 성공: \${success}건, 실패: \${failed}건\`;
            
            setTimeout(() => {
              document.getElementById('uploadProgress').classList.add('hidden');
              document.getElementById('progressBar').style.width = '0%';
              document.getElementById('progressText').textContent = '0%';
              uploadData = [];
              document.getElementById('excelFile').value = '';
              loadCertifications();
              
              if (failed > 0) {
                showToast(\`\${success}건 성공, \${failed}건 실패 (중복 인증서번호 등)\`, 'error');
              } else {
                showToast(\`\${success}건이 성공적으로 업로드되었습니다.\`, 'success');
              }
            }, 1500);
          }
        `}} />
      </body>
    </html>
  );
};

export default AdminPage;
