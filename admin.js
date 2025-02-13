document.addEventListener("DOMContentLoaded", function() {
    const plantForm = document.getElementById("addPlantForm");
    const plantList = document.getElementById("plant-list");

    plantForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("plantName").value;
        const description = document.getElementById("plantDescription").value;
        const imageInput = document.getElementById("plantImage");
        
        if (imageInput.files.length === 0) {
            alert("Please upload an image!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            // Create new plant card
            const plantCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${imageUrl}" class="card-img-top" alt="${name}">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${description}</p>
                        </div>
                    </div>
                </div>
            `;
            plantList.innerHTML += plantCard;

            // Clear form and close modal
            plantForm.reset();
            let modal = new bootstrap.Modal(document.getElementById("addPlantModal"));
            modal.hide();
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
});
