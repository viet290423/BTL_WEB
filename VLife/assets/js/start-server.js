const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/start-server", (req, res) => {
    // Thực hiện mã khởi chạy máy chủ cơ sở dữ liệu ở đây
    // Ví dụ: Sử dụng child_process để chạy máy chủ JSON

    const { exec } = require('child_process');
    const command = 'json-server --watch db.json --port 8000';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Lỗi khi chạy lệnh: ${error}`);
            res.status(500).send("Lỗi khi khởi chạy máy chủ.");
            return;
        }
        console.log(`Kết quả: ${stdout}`);
        res.send("Máy chủ đã được khởi chạy.");
    });
});

app.listen(port, () => {
    console.log(`Ứng dụng đang lắng nghe tại http://localhost:${port}`);
});
