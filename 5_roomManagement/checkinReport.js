document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch(
      'https://sratrc-portal-backend-dev.onrender.com/api/v1/admin/stay/checkin_report',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify()
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const checkinTableBody = document.getElementById('checkinTableBody');

    data.data.forEach((booking) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${booking.bookingid}</td>
          <td>${booking.roomno}</td>
          <td>${booking.checkin}</td>
          <td>${booking.checkout}</td>
          <td>${booking.nights}</td>
          <td>${booking.CardDb.cardno}</td>
          <td>${booking.CardDb.issuedto}</td>
          <td>${booking.CardDb.mobno}</td>
          <td>${booking.CardDb.centre}</td>
        `;
      checkinTableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching check-in report:', error);
    alert('An error occurred while fetching check-in report.');
  }
});
