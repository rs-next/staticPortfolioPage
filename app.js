// // Vue 앱 로직
// const app = Vue.createApp({
//     data() {
//         return {
//             portfolios: JSON.parse(localStorage.getItem("portfolios")) || [],
//             newPortfolio: {
//                 title: "",
//                 content: "",
//                 imageUrl: "",
//                 createdAt: new Date().toLocaleString(),
//             },
//             portfolio: {},
//         };
//     },
//     methods: {
//         // 이미지 파일 처리
//         onFileChange(event) {
//             const fileReader = new FileReader(); // File 을 읽기 위한 FileReader 객체 생성
//             fileReader.readAsDataURL(event.target.files[0]); // Blob -> base64 data로 변환

//             // 파일 읽기가 완료되었을 때 실행되는 이벤트 핸들러
//             fileReader.onload = (e) => {
//                 let base64data = fileReader.result;
//                 console.log(base64data);
//                 this.newPortfolio.imageUrl = base64data;
//             };
//         },
//         // 포트폴리오 생성
//         createPortfolio() {
//             const now = new Date().toLocaleString();
//             this.newPortfolio.createdAt = now;
//             this.portfolios.push({ ...this.newPortfolio });
//             localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
//             window.location.href = "index.html"; // 목록 페이지로 이동
//         },
//         // 포트폴리오 로드 (뷰 페이지)
//         loadPortfolio() {
//             const params = new URLSearchParams(window.location.search);
//             const id = params.get("id");
//             if (id !== null) {
//                 this.portfolio = this.portfolios[id];
//             }
//         },
//         // 포트폴리오 삭제
//         deletePortfolio() {
//             const params = new URLSearchParams(window.location.search);
//             const id = params.get("id");
//             this.portfolios.splice(id, 1);
//             localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
//             window.location.href = "index.html"; // 목록 페이지로 이동
//         },
//     },
//     mounted() {
//         if (window.location.pathname.includes("view.html")) {
//             this.loadPortfolio();
//         }
//     },
// });

// app.mount("#app");
const app = Vue.createApp({
    data() {
        return {
            portfolios: JSON.parse(localStorage.getItem("portfolios")) || [
                {
                    title: "포폴 1", // 기본 제목
                    content: "안녕하세요. 포트폴리오 1입니다.", // 기본 내용
                    imageUrl: "11111.png", // 기본 이미지 URL
                    createdAt: new Date().toLocaleString(), // 현재 시간
                },
                {
                    title: "포폴 2", // 기본 제목
                    content: "안녕하세요. 포트폴리오 2입니다.", // 기본 내용
                    imageUrl: "22222.png", // 기본 이미지 URL
                    createdAt: new Date().toLocaleString(), // 현재 시간
                },
            ],
            newPortfolio: {
                title: "",
                content: "",
                imageUrl: "",
                createdAt: "",
            },
            portfolio: {}, // 특정 포트폴리오 데이터를 저장하는 객체
        };
    },
    methods: {
        // 이미지 파일을 Base64로 변환하여 저장
        onFileChange(event) {
            const fileReader = new FileReader(); // File 을 읽기 위한 FileReader 객체 생성
            fileReader.readAsDataURL(event.target.files[0]); // Blob -> base64 data로 변환

            // 파일 읽기가 완료되었을 때 실행되는 이벤트 핸들러
            fileReader.onload = (e) => {
                let base64data = fileReader.result;
                console.log(base64data);
                this.newPortfolio.imageUrl = base64data;
            };
        },
        // 포트폴리오 생성
        createPortfolio() {
            const now = new Date().toLocaleString();
            this.newPortfolio.createdAt = now; // 현재 시간을 생성 시간으로 설정
            this.portfolios.push({ ...this.newPortfolio }); // 새로운 포트폴리오 추가

            // 로컬 스토리지에 포트폴리오 데이터 저장
            localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
            window.location.href = "index.html"; // 목록 페이지로 이동
        },
        // 포트폴리오 로드 (뷰 페이지)
        loadPortfolio() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id !== null && this.portfolios[id]) {
                this.portfolio = this.portfolios[id]; // 포트폴리오 데이터를 ID로 로드
            } else {
                console.error("해당 ID의 포트폴리오를 찾을 수 없습니다.");
            }
        },
        // 포트폴리오 삭제
        deletePortfolio() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id !== null) {
                this.portfolios.splice(id, 1); // 배열에서 포트폴리오 삭제
                localStorage.setItem(
                    "portfolios",
                    JSON.stringify(this.portfolios)
                ); // 업데이트된 데이터를 로컬 스토리지에 저장
                window.location.href = "index.html"; // 목록 페이지로 이동
            } else {
                console.error("포트폴리오 ID가 유효하지 않습니다.");
            }
        },
    },
    mounted() {
        // 로컬 스토리지에 데이터가 없으면 기본 포트폴리오 데이터를 저장
        if (!localStorage.getItem("portfolios")) {
            localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
        }

        // view.html 페이지에서만 포트폴리오를 로드
        if (window.location.pathname.includes("view.html")) {
            this.loadPortfolio();
        }
    },
});

app.mount("#app");
