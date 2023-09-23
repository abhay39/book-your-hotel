import React from 'react';

function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="text-gray-600">
              Email: <a href="mailto:booking@bookyourroom.co.np">booking@bookyourroom.co.np</a>
            </p>
            <p className="text-gray-600">Tel: 053-412106</p>
            <p className="text-gray-600">
              Address: Jeetpur-7, Bara, Nepal
              <br />
              Website: <a href="https://bookyourroom.com" target="_blank" rel="noopener noreferrer">bookyourroom.com</a>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Find Us on the Map</h2>
            <div className="relative h-0 overflow-hidden" style={{ paddingTop: '56.25%' }}>
            
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.6061188147764!2d84.95776327486934!3d27.137213476514148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb55c89e923a5b%3A0x18647a8d31fcece1!2sAdarsh%20Offset%20Press!5e0!3m2!1sen!2snp!4v1695056674618!5m2!1sen!2snp"
              width="600"
              height="400"
              frameBorder="0"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
