const AdminPage = () => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 페이지 - MCE 경영인증평가원</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100 min-h-screen">
        <nav class="bg-blue-800 text-white p-4 shadow-lg">
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">MCE 관리자 페이지</h1>
            <a href="/" class="text-blue-200 hover:text-white">← 메인으로</a>
          </div>
        </nav>

        <div class="max-w-7xl mx-auto p-6">
          {/* 새 인증 추가 폼 */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">새 인증 기업 추가</h2>
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
        `}} />
      </body>
    </html>
  );
};

export default AdminPage;
