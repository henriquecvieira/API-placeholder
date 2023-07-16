const map = L.map("map").setView([-23.5496, -46.6322], 15) // Defina as coordenadas iniciais e o nível de zoom

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

const marker = L.marker([-23.5496, -46.6322]).addTo(map) // Adicione o marcador na posição "POINT(-46.6322 -23.5496)"

// Opcional: Adicione uma pop-up ao marcador com informações adicionais
marker.bindPopup("Coordenadas: (-23.5496, -46.6322)").openPopup()
