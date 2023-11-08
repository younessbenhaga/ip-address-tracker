let input = document.getElementById('input');
let btn = document.getElementById('btn');
let ip = document.getElementById('ip');
let location1 = document.getElementById('location');
let time = document.getElementById('time');
let utc = document.getElementById('utc');
let map = L.map('map'); // Initialize the map outside the fetch calls
let marker = null; // Initialize the marker

const apiKey = "at_VeNaY8Eu0zhxbJ1ec07StBjxAKxhe";

fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data1 => {
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${data1.ip}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        ip.innerHTML = data.ip;
        location1.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
        time.innerHTML = `${data.location.timezone}`;
        utc.innerHTML = `${data.isp}`;

        if (marker) {
          map.removeLayer(marker); // Remove existing marker if it exists
        }

        map.setView([data.location.lat, data.location.lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        marker = L.marker([data.location.lat, data.location.lng]).addTo(map).bindPopup('This is a marker!').openPopup();
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });

btn.addEventListener('click', () => {
  const ipAddress2 = input.value;

  if (isValidIPAddress(ipAddress2)) {
    const apiUrl3 = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress2}`;
    
    fetch(apiUrl3)
      .then(response => response.json())
      .then(data3 => {
        ip.innerHTML = data3.ip;
        location1.innerHTML = `${data3.location.city}, ${data3.location.region}, ${data3.location.country}`;
        time.innerHTML = `Timezone: ${data3.location.timezone}`;
        utc.innerHTML = `ISP: ${data3.isp}`;

        if (marker) {
          map.removeLayer(marker); // Remove existing marker if it exists
        }

        map.setView([data3.location.lat, data3.location.lng], 13);

        marker = L.marker([data3.location.lat, data3.location.lng]).addTo(map).bindPopup('This is a marker!').openPopup();
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  } else {
    ip.textContent = 'Invalid IP Address';
  }
});

function isValidIPAddress(ipAddress2) {
  // Regular expression to match an IPv4 address
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;

  // Regular expression to match an IPv6 address (simplified pattern)
  const ipv6Pattern = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/i;

  return ipv4Pattern.test(ipAddress2) || ipv6Pattern.test(ipAddress2);
}
