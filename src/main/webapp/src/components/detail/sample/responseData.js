const responseData = [
    {
      no: 1,
      menuTitle: "시간 단위 예약(평일)",
      price: 12000,
      isCheck: "N",
      // 아래서부터 isCheck = Y일 시 보여지는 화면
      pictureLink: [
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168835289_146080e70208bc030f831426a6455a5d.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168844467_d4de6f666c71c1527872ab5509599c50.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168844467_7224a104c954afae83ad250dbb3cb2e8.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168844467_460fb991578b186412be344e251b345a.jpg?type=m&w=900&h=900&autorotate=true&quality=90"
      ],
      contents: "☆ 시간제 예약은 평일만 가능합니다. :)\n\n1.평일 낮 시간 당 12,000(10~17시)\n2. 평일 저녁 시간 당 15,000(18~09시)",
      spaceType: "파티룸",
      spaceArea: 53,
      registerTime: "최소 4시간 부터",
      registerPeople: "최소 1명 ~ 최대 10명",
      registerPoint: "4명 초과시 10,000원/인",
      option: "",    // 이부분은 아이콘
      registerIsView: "Y", // 이부분 시간 단위 예약하기 일때 설정
      registerSelectTitle: "시간 단위 예약하기(최소 4시간 부터)"
    },
    {
      no: 2,
      menuTitle: "데이 & 나이트 패키지",
      price: 70000,
      isCheck: "N",
      // 아래서부터 isCheck = Y일 시 보여지는 화면
      pictureLink: [
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168835289_146080e70208bc030f831426a6455a5d.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168835287_3a5f268e8cc984d8c3941aadab319851.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168845837_94e9a9cd667254bca6e21583eb0df795.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
      ],
      contents: "<패키지 안내>\n\n 데이(Day) 11~17시\n\n월~금 : 7만원\n토,일 : 9만원\n\n나이트(Night) | 18~24시",
      spaceType: "파티룸",
      spaceArea: 53,
      registerTime: "최소 6시간 부터",
      registerPeople: "최소 1명 ~ 최대 10명",
      registerPoint: "4명 초과시 30,000원/인",
      option: "",    // 이부분은 아이콘
      registerIsView: "N", // 이부분 시간 단위 예약하기 일때 설정
      registerSelectTitle: "패키지로 예약하기"
    },
    {
      no: 3,
      menuTitle: "올데이 패키지",
      price: 140000,
      isCheck: "N",
      // 아래서부터 isCheck = Y일 시 보여지는 화면
      pictureLink: [
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168845837_94e9a9cd667254bca6e21583eb0df795.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/168835289_146080e70208bc030f831426a6455a5d.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
      ],
      contents: "<패키지 안내>\n\n 올나잇(Day) 18~09시\n\n일,월,화,수,목 : 13만원\n토,일,공휴일 : 18만원",
      spaceType: "파티룸",
      spaceArea: 53,
      registerTime: "최소 6시간 부터",
      registerPeople: "최소 1명 ~ 최대 10명",
      registerPoint: "6명 초과시 30,000원/인",
      option: "",    // 이부분은 아이콘
      registerIsView: "N", // 이부분 시간 단위 예약하기 일때 설정
      registerSelectTitle: "패키지로 예약하기"
    },
    {
      no: 4,
      menuTitle: "올나잇 패키지",
      price: 120000,
      isCheck: "N",
      // 아래서부터 isCheck = Y일 시 보여지는 화면
      pictureLink: ["https://moplqfgeemqv2103108.cdn.ntruss.com/service/168835289_146080e70208bc030f831426a6455a5d.jpg?type=m&w=900&h=900&autorotate=true&quality=90"],
      contents: "<패키지 안내>\n\n 올데이(Day) 11~23시\n\n월,화,수,목 : 12만원\n금 : 14만원\n일 : 15만원\n토, 공휴일 : 16만원\n\n",
      spaceType: "파티룸",
      spaceArea: 53,
      registerTime: "최소 6시간 부터",
      registerPeople: "최소 1명 ~ 최대 10명",
      registerPoint: "8명 초과시 50,000원/인",
      option: "",    // 이부분은 아이콘
      registerIsView: "N", // 이부분 시간 단위 예약하기 일때 설정
      registerSelectTitle: "패키지로 예약하기"
    },
  ]
  
  export default responseData;