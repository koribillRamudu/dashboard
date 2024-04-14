import React from 'react';

function PaymentLink() {
  return (
    <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#f7f7f7', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '60px', color: '#333' }}>Make a Payment</h2>
      <p style={{ marginBottom: '30px', color: '#666',fontSize:'30px' }}>Click <a href="https://rzp.io/l/SZfKRJA" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>here</a> to proceed with the payment.</p>
      <p style={{ marginBottom: '30px', color: '#666',fontSize:'20px' }}>Please ensure that you have the necessary payment details ready before proceeding.</p>
      <p style={{ marginBottom: '20px', color: '#666',fontSize:'20px' }}>If you encounter any issues or have questions, feel free to contact us at <a href="mailto:support@example.com" style={{ color: '#007bff', textDecoration: 'none' }}>support@example.com</a>.</p>
    </div>
  );
}

export default PaymentLink;
