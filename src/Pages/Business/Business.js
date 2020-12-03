import React from 'react';
import './Business.css';
import Welcome from '../../Components/BusinessComponents/Welcome';
import About from '../../Components/BusinessComponents/About';
import Companies from '../../Components/BusinessComponents/Companies';
import ContactForm from '../../Components/BusinessComponents/ContactForm';
import Header from '../../Components/Header/Header';

const Business = () => {
  return (
    <>
      <Header />
      <div className='wrapper_business'>
        <Welcome />
        <About />
        <Companies />
        <ContactForm />
      </div>
    </>
  );
};

export default Business;
