document.addEventListener("DOMContentLoaded", () => { 
    const form = document.getElementById("visitorForm");
    const table = document.getElementById("commentsTable");
    const messageDiv = document.getElementById("message");

    // Form gönderme işlemi (form.html'de çalışır)
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const place = document.getElementById("place").value.trim();
            const comment = document.getElementById("comment").value.trim();

            if (name && place && comment) {
                let comments = JSON.parse(localStorage.getItem("comments")) || [];
                comments.push({ name, place, comment });
                localStorage.setItem("comments", JSON.stringify(comments));
                localStorage.setItem("newCommentAdded", "true");

                // Yönlendirme
                window.location.href = "comments.html";
            } else {
                alert("Lütfen tüm alanları doldurun.");
            }
        });
    }

    // Tabloyu doldurma işlemi (comments.html'de çalışır)
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.forEach(comment => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td data-label="Ad">${comment.name}</td>
            <td data-label="Gezilen Yer">${comment.place}</td>
            <td data-label="Yorum">${comment.comment}</td>
        `;
        table.appendChild(row);
    });

    // Yeni yorum eklenmişse mesajı göster
    if (localStorage.getItem("newCommentAdded") === "true") {
        if (messageDiv) {
            messageDiv.textContent = "Yeni yorum başarıyla eklendi!";
            messageDiv.classList.add("success-message");
        }
        // Mesaj gösterildikten sonra flag'i temizleyelim
        localStorage.removeItem("newCommentAdded");
    }
});
