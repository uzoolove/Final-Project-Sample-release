const teamInfo = {
  teams: [
    {
      id: 1,
      name: "1bone",
      leader: "길인환",
      members: ["김현지", "이우민", "우영찬", "장아영"],
      projectName: "Hobbism",
      projectTopic: "취미 관련 물품 판매 + 커뮤니티 + 라이브 커머스",
      notionLink: "https://www.notion.so/1-1bone-22973873401a80bc9ec6ebf7f244a15f",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-01-1bone",
      figmaLink: "https://www.figma.com/design/RSn0eCwtqCi1Zb7BUC4WG6/Untitled?node-id=0-1&t=1g0TeL9XfshUmGnP-1",
      deployUrl: "https://hobbism.vercel.app"
    },
    {
      id: 2,
      name: "투게더",
      leader: "구성연",
      members: ["김준성", "유시원", "최승진"],
      projectName: "Twogether",
      projectTopic: "잠옷 판매",
      notionLink: "https://www.notion.so/2-Twogether-22973873401a80269121c49ec321748e",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-02-Twogether",
      figmaLink: "https://www.figma.com/design/CB2f3xMmV9Ps0gviv1XsNb/Twogether?node-id=202-1762&p=f&t=LQKQtYFhVQho595N-0",
      deployUrl: "https://final-02-twogether.vercel.app"
    },
    {
      id: 3,
      name: "SE.MO",
      leader: "조한솔",
      members: ["김경민", "박시운", "이훈진"],
      projectName: "SE.MO",
      projectTopic: "대학교 기숙사 전용 거래 플랫폼",
      notionLink: "https://www.notion.so/3-SE-MO-22973873401a806cb733c394f8e888f6",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-03-SEMO",
      figmaLink: "https://www.figma.com/design/0HbJ6wY81j9aaQwnHLLQow/Likelion_Final_Project_3?node-id=0-1&t=yij3td8xcbudfqZc-1",
      deployUrl: "https://final-03-semo.vercel.app"
    },
    {
      id: 4,
      name: "4랑둥이",
      leader: "박준환",
      members: ["남상호", "노현수", "이호정"],
      projectName: "4vely",
      projectTopic: "반려식물 판매, 플렌테리어, 커뮤니티",
      notionLink: "https://www.notion.so/4-4-22973873401a8069bf19d352fbf11a01",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-04-4vely",
      figmaLink: "https://www.figma.com/design/VQrRyOXIX4UHl9ADdX28Zc/4%EB%9E%91%EB%91%A5%EC%9D%B4?node-id=0-1&p=f&t=sQEphAeci4PCLEHk-0",
      deployUrl: "https://final-04-4vely.vercel.app"
    },
    {
      id: 5,
      name: "오구오구",
      leader: "최영준",
      members: ["김재현", "김지연", "정원식"],
      projectName: "oguogu",
      projectTopic: "농산물 쇼핑몰, 오픈마켓, 구독, 관광체험",
      notionLink: "https://www.notion.so/5-22973873401a8013b3b3dd8daea79352",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-05-oguogu",
      figmaLink: "https://www.figma.com/design/uf64A0qSYkB1325kaSbAzL/%EC%98%A4%EA%B5%AC%EC%98%A4%EA%B5%AC?node-id=44-2587&p=f&t=zeVCxXeZe3nychTT-0",
      deployUrl: "https://final-05-oguogu.vercel.app"
    },
    {
      id: 6,
      name: "6PM",
      leader: "박선영",
      members: ["문서인", "송아현", "차형주"],
      projectName: "6PM",
      projectTopic: "여행 일정 계획, 리뷰 공유",
      notionLink: "https://www.notion.so/6-6PM-22973873401a803ba844ce1a4a09e0ba",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-06-6PM",
      figmaLink: "https://www.figma.com/design/C31z04dzJs1dMxgLcAn4l3/6pm?node-id=29-115&p=f&t=ni0Dd1MU8jIuTx4O-0",
      deployUrl: "https://final-6-6-pm.vercel.app"
    },
    {
      id: 7,
      name: "Chillin' Code",
      leader: "김준오",
      members: ["김진섭", "장유하"],
      projectName: "Sophie's Warehouse",
      projectTopic: "스튜디오 지브리의 애니메이션 소품샵",
      notionLink: "https://www.notion.so/7-Chillin-Code-22973873401a80868f80f49a9c2f8227",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-07-Chillin-Code",
      figmaLink: "https://www.figma.com/design/fIYvLGzla9y22dYAE8SKsv/Chill-Code?node-id=56-115&p=f&t=DMSkCnPLONMSbU2N-0",
      deployUrl: "https://sophie-s-warehouse.vercel.app"
    },
    {
      id: 9,
      name: "No.9",
      leader: "최승균",
      members: ["박상희", "신동수", "홍예린"],
      projectName: "MIRINE",
      projectTopic: "향수 판매, 시향제품 판매",
      notionLink: "https://www.notion.so/9-No-9-22973873401a8091ab87c8a3269770f7",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-09-MIRINE",
      figmaLink: "https://www.figma.com/design/lZqEMiYh7MtUQP2oCJk8T9/Project-No.9?node-id=0-1&p=f&t=bEhIatUiy2z22iNy-0",
      deployUrl: "https://final-09-mirine.vercel.app"
    },
    {
      id: 10,
      name: "console.10g",
      leader: "황유빈",
      members: ["엄현욱", "이선진", "정예빈"],
      projectName: "도토리섬",
      projectTopic: "키덜트 샵(도토리섬: 동물의 숲 모티브로)",
      notionLink: "https://www.notion.so/10-console-10g-22973873401a80f4b617c2698ca08bab",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-10-console.10g",
      figmaLink: "https://www.figma.com/design/pE34mPMGFu3xNM3tNeZnI0/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%84%AC?node-id=0-1&p=f&t=VxlAUl3vROOq7Frw-0",
      deployUrl: "https://dotori-island.vercel.app"
    },
    {
      id: 11,
      name: "1+1은=귀요미",
      leader: "오서현",
      members: ["김지수", "김태경", "배샛별", "박정우"],
      projectName: "Cutie",
      projectTopic: "클라우드 펀딩",
      notionLink: "https://www.notion.so/11-1-1-22973873401a807397e9e347cc40603d",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-11-Cutie",
      figmaLink: "https://www.figma.com/design/DjrVd9c4r2NXH6mgccFrjo/%ED%8E%80%EB%93%9C%EB%A6%BC-UI?node-id=89-494&p=f&t=6IWEJvXs9orVv50F-0",
      deployUrl: "https://final-11-cutie.vercel.app"
    },
    {
      id: 12,
      name: "왜시비조",
      leader: "조현수",
      members: ["김연호", "김하영", "정유진"],
      projectName: "WhySIBI",
      projectTopic: "자취생 상품 판매 + 커뮤니티",
      notionLink: "https://www.notion.so/12-22973873401a808d8008f3b17ddf0ca8",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-12-WhySIBI",
      figmaLink: "https://www.figma.com/design/1CSCEXaFlqRCtgDgHYyZHg/WhySIBI---WideFrame?node-id=0-1&p=f&t=X7L7jKy8fev8s3xv-0",
      deployUrl: "https://final-12-why-sibi.vercel.app"
    },
    {
      id: 13,
      name: "13타치",
      leader: "임한길",
      members: ["강석현", "김혜민", "이진현"],
      projectName: "UgVeg",
      projectTopic: "못난이 농산물 판매",
      notionLink: "https://www.notion.so/13-13-13-22973873401a800ba5eed12d81e97c83",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-13-13tachi",
      figmaLink: "https://www.figma.com/design/if5EqsKVjpMy47Jj6fL0Iw/%ED%9D%99%EB%82%B4%EC%9D%8C-%EC%83%81%EC%A0%90--UgVeg?node-id=0-1&p=f&t=FIkBPxxaVpsAlevr-0",
      deployUrl: "https://ugveg.vercel.app"
    },
    {
      id: 14,
      name: "z1존포텐1004",
      leader: "이도울",
      members: ["김태우", "배동초", "송채은"],
      projectName: "poten-game",
      projectTopic: "게임칩 판매",
      notionLink: "https://www.notion.so/14-z1-1004-22973873401a80b88e1bca614d28504b",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-14-z1zone1004",
      figmaLink: "https://www.figma.com/design/8TP0tsKHT2BWPThthqh3XZ/z1%EC%A1%B4%ED%8F%AC%ED%85%901004---final-project?node-id=0-1&p=f&t=ddiH7jhZ1hyYt24b-0",
      deployUrl: "https://poten-game.vercel.app"
    },
    {
      id: 15,
      name: "Team XV",
      leader: "임지윤",
      members: ["배희정", "최동환", "황수곤"],
      projectName: "HOLATAJA",
      projectTopic: "타건음을 들을 수 있는 키보드판매샵",
      notionLink: "https://www.notion.so/15-Team-XV-22973873401a80e59ce5c5ec008b69f0",
      githubLink: "https://github.com/FRONTENDBOOTCAMP-13th/Final-15-HOLATAJA",
      figmaLink: "https://www.figma.com/design/gshuWliAJBwkmbibtUSJAP/Final_TEAM-XV?node-id=50-808&p=f&t=8SIAzpenrE4WYKCj-0",
      deployUrl: "https://final-15-holataja.vercel.app"
    }
  ]
}
  
export default teamInfo;
