async function testWorkerCreation() {
    try {
        const response = await fetch('http://localhost:3000/api/induccion/trabajadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dni: `77${Math.floor(Math.random() * 1000000)}`.substring(0, 8),
                nombre: 'Carlos',
                apellido: 'Prueba',
                empresa: 'Constructora S.A',
                email: 'carlos@prueba.com',
                celular: '+51999111222'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testWorkerCreation();
