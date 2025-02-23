document.addEventListener("DOMContentLoaded", async () => {
    console.log("Pi Roulette geladen!");

    const loginButton = document.getElementById("loginButton");
    const betRedButton = document.getElementById("betRed");
    const betBlackButton = document.getElementById("betBlack");
    const spinButton = document.getElementById("spinButton");
    const result = document.getElementById("result");

    let user = null;
    const appId = "DEIN_APP_ID";

    // Pi Network SDK einbinden
    if (typeof Pi === "undefined") {
        console.error("Pi SDK konnte nicht geladen werden.");
        return;
    }

    try {
        await Pi.init({ version: "2.0" });
        console.log("Pi SDK erfolgreich initialisiert.");
    } catch (error) {
        console.error("Fehler bei der Initialisierung des Pi SDK:", error);
    }

    // Login-Funktion
    loginButton.addEventListener("click", async () => {
        try {
            user = await Pi.authenticate(["payments"], appId);
            if (user) {
                console.log(`Eingeloggt als: ${user.user.username}`);
                loginButton.disabled = true;
                loginButton.textContent = `Eingeloggt als ${user.user.username}`;
            }
        } catch (error) {
            console.error("Login fehlgeschlagen:", error);
        }
    });

    // Spin-Funktion
    spinButton.addEventListener("click", () => {
        const randomNumber = Math.floor(Math.random() * 37);
        result.textContent = `🎲 Das Roulette zeigt: ${randomNumber}`;
    });
});
