import { useState } from 'react';
import { personal } from '../../data/portfolio';

const INPUT_BASE = 'w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none transition-colors peer placeholder-transparent';
const LABEL_BASE = 'absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, #00f3ff, #7000ff)' }}>
              Work Together
            </span>
          </h2>
          <p className="text-gray-400">Have a project in mind? Let&apos;s build something amazing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0">
                <i className="fas fa-envelope" style={{ color: '#00f3ff' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Me</h3>
                <a href={`mailto:${personal.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {personal.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0">
                <i className="fas fa-map-marker-alt" style={{ color: '#7000ff' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Location</h3>
                <p className="text-gray-400">
                  {personal.location}{personal.remoteOk && <><br />Remote Friendly</>}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0">
                <i className="fas fa-share-alt" style={{ color: '#ff00ea' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Socials</h3>
                <div className="flex space-x-4 mt-2">
                  {personal.socials.github !== '#' && (
                    <a href={personal.socials.github} data-hover target="_blank" rel="noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#00f3ff] hover:text-black transition-all">
                      <i className="fab fa-github" />
                    </a>
                  )}
                  {personal.socials.linkedin !== '#' && (
                    <a href={personal.socials.linkedin} data-hover target="_blank" rel="noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#7000ff] hover:text-white transition-all">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6 glass p-8 rounded-2xl">
            <div className="relative">
              <input type="text" id="name" required placeholder="Name"
                className={`${INPUT_BASE} focus:border-[#00f3ff]`} />
              <label htmlFor="name" className={`${LABEL_BASE} peer-focus:text-[#00f3ff]`}>Name</label>
            </div>
            <div className="relative">
              <input type="email" id="email" required placeholder="Email"
                className={`${INPUT_BASE} focus:border-[#7000ff]`} />
              <label htmlFor="email" className={`${LABEL_BASE} peer-focus:text-[#7000ff]`}>Email</label>
            </div>
            <div className="relative">
              <textarea id="message" rows={4} required placeholder="Message"
                className={`${INPUT_BASE} focus:border-[#ff00ea] resize-none`} />
              <label htmlFor="message" className={`${LABEL_BASE} peer-focus:text-[#ff00ea]`}>Message</label>
            </div>
            <button type="submit" data-hover
              className="w-full py-3 rounded-full font-bold text-black transition-all"
              style={{
                background: status === 'sent'
                  ? '#00ff87'
                  : 'linear-gradient(to right, #00f3ff, #7000ff)',
                opacity: status === 'sending' ? 0.75 : 1,
              }}>
              {status === 'sent' ? 'MESSAGE SENT!' : status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
