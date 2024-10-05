// Fetch and display app data on index.html
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('app-list')) {
        fetch('app.json')
            .then(response => response.json())
            .then(data => {
                const appList = document.getElementById('app-list');
                data.forEach(app => {
                    const appItem = document.createElement('div');
                    appItem.className = 'app-item';
                    appItem.innerHTML = `
                        <img src="${app.img_url}" alt="${app.name}">
                        <h3>${app.name}</h3>
                        <p>Bundle: ${app.bundle}</p>
                        <p>Version: ${app.version}</p>
                        <a href="${app.ipa_url}" download>Download IPA</a>
                    `;
                    appList.appendChild(appItem);
                });
            });
    }
});

// Handle IPA upload in uploads.html
function uploadIPA() {
    const name = document.getElementById('appName').value;
    const bundle = document.getElementById('appBundle').value;
    const version = document.getElementById('appVersion').value;
    const img = document.getElementById('appImage').files[0];
    const ipa = document.getElementById('appIpa').files[0];

    if (name && bundle && version && img && ipa) {
        const reader = new FileReader();
        reader.onload = function () {
            const newApp = {
                name: name,
                bundle: bundle,
                version: version,
                img_url: URL.createObjectURL(img),
                ipa_url: URL.createObjectURL(ipa)
            };

            fetch('app.json')
                .then(response => response.json())
                .then(data => {
                    data.push(newApp);
                    // Here you'd usually update the JSON file on the server-side.
                    console.log('New app added:', newApp);
                });
        };
        reader.readAsDataURL(img);
    }
}
