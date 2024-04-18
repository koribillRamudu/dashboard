import React from 'react';

function PaymentLink() {
  return (
    <div>
      <center><h2 style={{ marginBottom: '60px', color: '#333',paddingLeft:'70px' }}>Payment Dashboard</h2></center>
      <center><p style={{ marginBottom: '30px', color: '#666',fontSize:'20px', paddingLeft:'70px' }}>Click <a href="https://dashboard.razorpay.com/app/orders" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>here</a> to payment Dashboard.</p></center>
      </div>
  );
}

export default PaymentLink;
