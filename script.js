document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("spinButton");
    const wheel = document.getElementById("wheel");
    const ball = document.getElementById("ball");
    const result = document.getElementById("result");
    const balanceDisplay = document.getElementById("balance");

    const numbers = [
        "0", "32", "15", "19", "4", "21", "2", "25", "17", "34",
        "6", "27", "13", "36", "11", "30", "8", "23", "10", "5",
        "24", "16", "33", "1", "20", "14", "31", "9", "22", "18",
        "29", "7", "28", "12", "35", "3", "26"
    ];

    let balance = 1000;
    let selectedChipValue = null;

    balanceDisplay.textContent = `Kontostand: ${balance} Coins`;

    // Zahlen auf dem Rad anzeigen
    numbers.forEach((number, index) => {
        const angle = index * (360 / numbers.length);
        const numberElement = document.createElement('div');
        numberElement.className = 'number-on-wheel';
        numberElement.textContent = number;
        numberElement.style.position = 'absolute';
        numberElement.style.transform = `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`;
        wheel.appendChild(numberElement);
    });

    document.querySelectorAll(".chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
            chip.classList.add("selected");
            selectedChipValue = parseInt(chip.dataset.value);
        });
    });

    document.querySelectorAll(".bet").forEach(bet => {
        bet.addEventListener("click", () => {
            if (selectedChipValue !== null && balance >= selectedChipValue) {
                const chipElement = document.createElement('div');
                chipElement.textContent = selectedChipValue;
                chipElement.className = 'chip placed-chip';

                let existingChip = bet.querySelector('.placed-chip');
                if (existingChip) {
                    const currentValue = parseInt(existingChip.textContent);
                    existingChip.textContent = currentValue + selectedChipValue;
                } else {
                    bet.appendChild(chipElement);
                }
                balance -= selectedChipValue;
                balanceDisplay.textContent = `Kontostand: ${balance} Coins`;
            }
        });
    });

    spinButton.addEventListener("click", () => {
        const randomAngle = Math.floor(Math.random() * 360);
        const winningIndex = Math.floor((randomAngle / 360) * numbers.length);
        const winningNumber = numbers[winningIndex];

        result.textContent = `Gewinnerzahl: ${winningNumber}`;

        wheel.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
        wheel.style.transform = `rotate(${randomAngle}deg)`;

        ball.style.transition = "transform 3s ease-out";
        ball.style.transform = `rotate(${randomAngle}deg) translate(150px)`;

        // Stelle sicher, dass das Rad sichtbar bleibt
        wheel.style.visibility = 'visible';
        ball.style.visibility = 'visible';

        setTimeout(() => {
            calculateWinnings(winningNumber);
        }, 3000);
    });

    function calculateWinnings(winningNumber) {
        let totalWinnings = 0;
        document.querySelectorAll(".bet").forEach(bet => {
            const betNumber = bet.dataset.number;
            const chip = bet.querySelector('.placed-chip');
            if (chip && betNumber === winningNumber) {
                const betAmount = parseInt(chip.textContent);
                totalWinnings += betAmount * 35;  // 35:1 Auszahlung
            }
        });

        if (totalWinnings > 0) {
            balance += totalWinnings;
            alert(`Du hast gewonnen! Gewinn: ${totalWinnings} Coins`);
        } else {
            alert("Leider verloren!");
        }
        balanceDisplay.textContent = `Kontostand: ${balance} Coins`;

        // Entferne gesetzte Chips nach einem Spiel
        document.querySelectorAll('.placed-chip').forEach(chip => chip.remove());
    }
});
