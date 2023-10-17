document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector('.form-container.sign-up-container form');
  
    signUpForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Lấy giá trị từ các trường nhập liệu
      const name = signUpForm.querySelector('input[name="name"]').value;
      const email = signUpForm.querySelector('input[name="email"]').value;
      const password = signUpForm.querySelector('input[name="password"]').value;
  
      // Tạo dữ liệu JSON từ giá trị
      const data = {
        Name: name,
        Email: email,
        Password: password
      };
  
      // Thực hiện yêu cầu POST tới sheetdb.io
      fetch("https://sheetdb.io/api/v1/26iu7y7qm5xq4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
             // Xử lý kết quả sau khi gửi dữ liệu
            console.log("Dữ liệu đã được gửi thành công:", data);
            // Thêm thông báo "thành công"
            alert("Đăng ký thành công!");
            // Làm mới các trường nhập liệu
            signUpForm.reset();
            
        })
        .catch(error => {
          console.error("Lỗi khi gửi dữ liệu:", error);
          // Xử lý lỗi nếu cần
        });
    });
  });
 // logn in
 document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.getElementById('signInButton');

    signInButton.addEventListener('click', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch("https://sheetdb.io/api/v1/26iu7y7qm5xq4")
            .then(response => response.json())
            .then(data => {
                const user = data.find(entry => entry.Email === email && entry.Password === password);
                if (user) {
                    window.location.href = "home.html";
                } else {
                    alert("Thông tin đăng nhập không hợp lệ. Vui lòng thử lại.");
                }
            })
            .catch(error => {
                console.error("Lỗi khi kiểm tra đăng nhập:", error);
            });
    });
});
  