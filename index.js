// 讀取 story.json
// https://script.google.com/macros/s/AKfycby0th-CDDbeD3ZoMGt_J8L2ppxzpragMHpJfm0CTLifj0OAznSTA60VukbIF_fZ2MkVbw/exec
fetch("story.json")
    .then(response => response.json())
    .then(interviews => {
        const articleGrid = document.getElementById("article-grid"); // 選取要放入的容器
        interviews.forEach(interview => {
            const colDiv = document.createElement("div");
            colDiv.className = "col-xl-6 col-lg-12 text-center";
            colDiv.innerHTML = `
                <div class="article-card">
                    <div class="article-img">
                        <img class="article-image" src="${interview.image}" alt="圖片錯誤">
                    </div>
                    <div class="article-meta right-side text-left">
                        <h2 class="interviewee-name">${interview.interviewee}</h2>
                        <hr/>
                        <div class="interviewer">訪談者：<span class="interviewer">${interview.interviewer}</span></div>
                        <div class="info">
                            <div class="interviewDate">訪談時間：<span class="interview-date">${interview.date}</span></div>
                            <div class="download"><a class="download-link" href="${interview.fileLocation}" target="_blank">檔案下載</a></div>
                        </div>
                    </div>
                </div>
            `;
            console.log(`${interview.image}`);
            articleGrid.appendChild(colDiv); // 加入 HTML
        });
    })
    .catch(error => console.error("Error loading JSON:", error));