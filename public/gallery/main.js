import teaminfo from './teaminfo.js';

const projectCardsContainer = document.getElementById('project-cards');

if (projectCardsContainer) {
  teaminfo.teams.forEach((team) => {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1';
    card.style.minWidth = '380px';
    card.style.flex = '0 0 calc(14.285714% - 1.285714rem)';
    
    card.innerHTML = `
      <div class="card ${team.deployUrl ? 'clickable-card' : ''}" data-deploy-url="${team.deployUrl || ''}">
        <div class="position-relative">
          <div class="project-header">
            <h3 class="project-name">${team.projectName}</h3>
          </div>
          <span class="team-badge">${team.id}조 - ${team.name}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">${team.projectName}</h5>
          <p class="project-topic">${team.projectTopic || '프로젝트 설명이 없습니다.'}</p>
          <div class="team-members mb-3">
            <div><strong>팀장:</strong> ${team.leader}</div>
            <div><strong>팀원:</strong> ${team.members.join(', ')}</div>
          </div>
          <div class="project-links">
            ${team.deployUrl ? `
              <a href="${team.deployUrl}" target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">
                <i class="bi bi-globe"></i> Demo
              </a>
            ` : ''}
            <a href="${team.githubLink}" target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">
              <i class="bi bi-github"></i> GitHub
            </a>
            <a href="${team.notionLink}" target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">
              <i class="bi bi-file-earmark-text"></i> Notion
            </a>
            <a href="${team.figmaLink}" target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">
              <i class="bi bi-vector-pen"></i> Figma
            </a>
          </div>
        </div>
      </div>
    `;
    
    // 카드 클릭 이벤트 추가
    const cardElement = card.querySelector('.card');
    if (cardElement && team.deployUrl) {
      cardElement.style.cursor = 'pointer';
      cardElement.addEventListener('click', (e) => {
        // 버튼 클릭이 아닌 경우에만 demo 링크로 이동
        if (!e.target.closest('.project-links')) {
          window.open(team.deployUrl, '_blank');
        }
      });
    }
    
    projectCardsContainer.appendChild(card);
  });
}
