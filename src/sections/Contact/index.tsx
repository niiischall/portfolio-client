import React from "react";
import "./style.css";

const Contact: React.FC<{}> = () => {
  return (
    <section className="contact" id="contact">
      <div className="heading">
        <h2 className="font-sans">get in touch with me</h2>
      </div>
      <div className="contact-container container-spacing">
        <p>If you want to work together or just say hi, my DMs are open. 😊</p>
      </div>
    </section>
  );
};

export default Contact;