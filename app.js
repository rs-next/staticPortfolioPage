// Vue 앱 로직
const app = Vue.createApp({
    data() {
        return {
            portfolios: JSON.parse(localStorage.getItem("portfolios")) || [],
            newPortfolio: {
                title: "",
                content: "",
                imageUrl: "",
                createdAt: "",
            },
            portfolio: {},
        };
    },
    methods: {
        // 이미지 파일 처리
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
            this.newPortfolio.createdAt = now;
            this.portfolios.push({ ...this.newPortfolio });
            localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
            window.location.href = "index.html"; // 목록 페이지로 이동
        },
        // 포트폴리오 로드 (뷰 페이지)
        loadPortfolio() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id !== null) {
                this.portfolio = this.portfolios[id];
            }
        },
        // 포트폴리오 삭제
        deletePortfolio() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            this.portfolios.splice(id, 1);
            localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
            window.location.href = "index.html"; // 목록 페이지로 이동
        },
    },
    mounted() {
        if (window.location.pathname.includes("view.html")) {
            this.loadPortfolio();
        }
    },
});

app.mount("#app");
