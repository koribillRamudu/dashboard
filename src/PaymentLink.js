import React from 'react';

function CenteredContainer({ children }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    }}>
      {children}
    </div>
  );
}

function PaymentLink() {
  return (
    <CenteredContainer>
      <div style={styles.container}>
        <div style={styles.content}>
          <h2>Payment Dashboard</h2>
          <p>Manage your payments with our payment dashboard.</p>
          <a href="https://dashboard.razorpay.com/app/orders" target="_blank" rel="noopener noreferrer" style={styles.button}>Go to Payment Dashboard</a>
        </div>
      </div>
    </CenteredContainer>
  );
}

// Inline CSS styles
const styles = {
  container: {
    textAlign: 'center', // Center the content horizontally
    padding: '20px',
  },
  content: {
    flex: '1',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  image: {
    flex: '1',
    maxWidth: '100%',
    height: 'auto',
  },
};

export default PaymentLink;
