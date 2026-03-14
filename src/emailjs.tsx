import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    // Los IDs que configuramos:
    const serviceID = 'service_47x2vlk';
    const templateID = 'template_4fgtfgj';
    const publicKey = 'LbUJ2NNvj98WobDek';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log('Éxito:', result.text);
          alert("¡Solicitud enviada! Nos pondremos en contacto con vos a la brevedad.");
          form.current?.reset();
      }, (error) => {
          console.log('Error:', error.text);
          alert("Hubo un problema al enviar el mensaje. Por favor, reintentá.");
      });
  };

  return (
    <section className="bg-black text-white p-8">
      <form ref={form} onSubmit={sendEmail} className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-serif">Contanos tu <span className="italic text-yellow-600">idea</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="from_name" 
            placeholder="Nombre completo" 
            className="bg-gray-900 border border-gray-800 p-3 w-full focus:border-yellow-600 outline-none"
            required 
          />
          <input 
            type="email" 
            name="user_email" 
            placeholder="tu@email.com" 
            className="bg-gray-900 border border-gray-800 p-3 w-full focus:border-yellow-600 outline-none"
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="user_phone" 
            placeholder="+54 9 11..." 
            className="bg-gray-900 border border-gray-800 p-3 w-full"
          />
          <select name="event_type" className="bg-gray-900 border border-gray-800 p-3 w-full text-gray-400">
            <option value="">Seleccioná el tipo de evento</option>
            <option value="Privado">Evento Privado</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Boda">Boda / Casamiento</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="date" name="event_date" className="bg-gray-900 border border-gray-800 p-3 w-full text-gray-400" />
          <input type="text" name="people_count" placeholder="Cantidad de personas (Estimado)" className="bg-gray-900 border border-gray-800 p-3 w-full" />
        </div>

        <textarea 
          name="message" 
          placeholder="CONTANOS TU IDEA" 
          rows={4}
          className="bg-gray-900 border border-gray-800 p-3 w-full focus:border-yellow-600 outline-none"
        ></textarea>

        <button