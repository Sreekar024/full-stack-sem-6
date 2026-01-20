import React from 'react';

function Contacts() {
  return (
    <div className="container">
      <h1>Contacts</h1>
      
      <div className="contact-card">
        <h3>Developer</h3>
        <p><strong>Email:</strong> sreekarchimbili@gmail.com</p>
        <p><strong>Course:</strong> Full Stack Development - Sem 6</p>
      </div>

      <div className="contact-card">
        <h3>Indian Contacts</h3>
        <p><strong>Rajesh Kumar:</strong> rajesh.kumar@techcorp.in</p>
        <p><strong>Priya Sharma:</strong> priya.sharma@innovate.co.in</p>
        <p><strong>Arjun Patel:</strong> arjun.patel@solutions.in</p>
        <p><strong>Sneha Reddy:</strong> sneha.reddy@webdev.in</p>
      </div>
    </div>
  );
}

export default Contacts;