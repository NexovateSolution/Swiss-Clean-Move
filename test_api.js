const fetch = require('node-fetch');

async function testCreateClient() {
    const data = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "123456789",
        address: "Test Address",
        postalCode: "1234",
        location: "Test Location",
        squareMeters: 50,
        serviceType: "House Cleaning",
        buildingType: "Apartment",
        fromDate: new Date().toISOString(),
        untilDate: new Date().toISOString(),
        totalPrice: 200,
        advancePayment: 50,
        prefix: "Mr.",
        numberOfRooms: "two",
        floor: "ground",
        elevator: "yes",
        remarks1: "Test remark"
    };

    try {
        const response = await fetch('http://localhost:3000/api/admin/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // In local dev, authenticateRequest might accept anything or have a bypass if mocked
                'Authorization': 'Bearer test-token'
            },
            body: JSON.stringify(data)
        });

        const body = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(body, null, 2));
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

testCreateClient();
