import React from 'react';

function PaymentLink() {
  return (
    <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#f7f7f7', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '60px', color: '#333' }}>Payment Dashboard</h2>
      <p style={{ marginBottom: '30px', color: '#666',fontSize:'30px' }}>Click <a href="https://dashboard.razorpay.com/app/orders" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>here</a> to payment Dashboard.</p>
    </div>
  );
}

export default PaymentLink;
