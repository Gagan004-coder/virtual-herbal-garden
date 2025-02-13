document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const plantId = urlParams.get("id");

    if (!plantId) {
        document.getElementById("plant-name").innerText = "Plant Not Found!";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/plants/${plantId}`);
        const plant = await response.json();

        document.getElementById("plant-name").innerText = plant.name;
        document.getElementById("plant-image").src = plant.image;
        document.getElementById("plant-description").innerText = plant.description;
        document.getElementById("plant-uses").innerText = plant.medicinalUses;

    } catch (error) {
        console.error("Error loading plant details:", error);
    }
});
