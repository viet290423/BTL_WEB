function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getData = async () => {
    const url = 'https://sheetdb.io/api/v1/wmk9fjv3ohxcw';
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("False Get:", error);
    }
}

const canvasA = async () => {
    const canvas = document.getElementById('canvas');

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

    const year = document.getElementById("yearInput").value;
    const numbersArray = year.split(',');

    // const yearInput = document.getElementById("yearInput").value;

    getData().then(
        async data => {
            const datasets = []
            numbersArray.forEach(yearInput => {
                const filteredUsers = data.filter(user => parseInt(user.yearJoin) === parseInt(yearInput));
                const userCountByMonthCumulative = Array(12).fill(0);
                
                filteredUsers.forEach(user => {
                    if (user.userName === "admin"){
                        return
                    }
                    const month = user.monthJoin - 1; // Trừ 1 vì mảng bắt đầu từ 0
                    for (let i = month; i < userCountByMonthCumulative.length; i++) {
                        userCountByMonthCumulative[i]++;
                    }
                });
                const color = getRandomHexColor()

                const dataTods = {
                    label: 'Người đăng ký năm ' + yearInput,
                    backgroundColor: color,
                    borderColor: color,
                    data: userCountByMonthCumulative,
                    tension: 0.4,
                }

                datasets.push(dataTods);
            });


            const dataToCanvas = {
                labels: labels,
                datasets: datasets
            };
            const configToCanvas = {
                type: 'line',
                data: dataToCanvas,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true, // Đảm bảo bắt đầu từ 0 trên trục y
                        },
                    },
                },
            };
            const chart = new Chart(canvas, configToCanvas);

        }).catch(error => {
            console.error("Promise rejected:", error);
        });
};

const canvasB = async () => {
    getData().then(
        async data => {
            const countCountry = {}
            data.forEach(user => {
                if (user.userName === "admin"){
                    return
                }
                const country = user.country
                if (!countCountry[country]) {
                    countCountry[country] = 0;
                }
                countCountry[country]++;
            });

            const labels = Object.keys(countCountry);
            const values = Object.values(countCountry);
            const color = getRandomHexColor();
            const dataToCanvas = {
                labels: labels,
                datasets: [
                    {
                        label: 'Quốc gia',
                        backgroundColor: color,
                        borderColor: color,
                        borderWidth: 1, // Độ dày của viền cho cột,
                        data: values,
                    },
                ],
            };

            const configToCanvas = {
                type: 'bar',
                data: dataToCanvas,
            };

            const canvas1 = document.getElementById("canvas1");
            const chart = new Chart(canvas1, configToCanvas);
        }).catch(error => {
            console.error("Promise rejected:", error);
        });
}


const canvasC = async () => {
    getData().then(data => {
        console.log(data)
        const countGender = {}
        data.forEach(user => {
            if (user.userName === "admin"){
                return
            }
            const gender = user.gender
            if (!countGender[gender]) {
                countGender[gender] = 0
            }
            countGender[gender]++;
        })

        const percentages = {};
        for (const key in countGender) {
            if (countGender.hasOwnProperty(key)) {
                percentages[key] = ((countGender[key] / data.length) * 100).toFixed(2);
            }
        }

        const labels = Object.keys(percentages)
        const values = Object.values(percentages)

        const dataToCanvas = {
            labels: labels,
            datasets: [
                {
                    label: "Giới tính",
                    data: values,
                    backgroundColor: ['blue', 'red']
                }
            ]
        }

        const config = {
            type: 'pie',
            data: dataToCanvas,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        }
        const canvas = document.getElementById('canvas2');
        const chart = new Chart(canvas, config)

    }).catch(error => {
        console.error("Promise rejected:", error);
    });
}

const canvasD = () => {
    getData().then(data=>{
        const listAge = {}
        data.forEach(user => {
            if (user.userName === "admin"){
                return
            }
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const birthdayDate = new Date(user.birthday);
            const UserBirthYear = birthdayDate.getFullYear();
            const ageUser = parseInt(currentYear) - parseInt(UserBirthYear);
            if(!listAge[ageUser]){
                listAge[ageUser] = 0;
            }
            listAge[ageUser]++;
        });
        const labels = Object.keys(listAge);
        const values = Object.values(listAge);

        const dataToCanvas = {
            labels:labels,
            datasets: [
                {
                    label: "Độ tuổi",
                    data: values,
                    borderWidth: 1,
                    backgroundColor: getRandomHexColor()
                }
            ]

        }

        const config = {
            type: 'bar',
            data: dataToCanvas,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        }

        const canvas = document.getElementById("canvas3")
        const chart = new Chart(canvas, config)
    })
}

canvasB()
canvasC()
canvasD()


