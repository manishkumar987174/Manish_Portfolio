import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';


export const WhatsAppButton = () => {
  const { number, message } = PERSONAL_INFO.whatsapp;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
    </motion.a>
  );
};

export const Hero = () => {
  const [text, setText] = useState('');
  const fullText = PERSONAL_INFO.title;
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % 1;
      const full = fullText;
      
      setText(isDeleting 
        ? full.substring(0, text.length - 1) 
        : full.substring(0, text.length + 1)
      );

      if (!isDeleting && text === full) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(100);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, fullText]);

  const handleDownloadResume = () => {
    window.open('https://drive.google.com/file/d/1mmEkX9Oi8bkWmFz4UlQ5qYbF4tECrIfB/view?usp=sharing', '_blank');
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-transparent">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
                Available for Opportunities
              </span>
            </motion.div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              Hi, I'm <br />
              <span className="text-gradient drop-shadow-sm">{PERSONAL_INFO.name}</span>
            </h1>
            <div className="h-12 mb-8">
              <p className="text-xl lg:text-3xl font-mono text-zinc-600 font-medium">
                {text}<span className="animate-pulse text-primary">_</span>
              </p>
            </div>
            <p className="text-lg text-zinc-600 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
              {PERSONAL_INFO.summary}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all"
              >
                View My Work <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-zinc-200 rounded-2xl font-bold flex items-center gap-2 hover:border-primary transition-all group"
              >
                Download CV <Download className="w-5 h-5 group-hover:animate-bounce" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative flex justify-center items-center order-1 md:order-2"
          >
            <div className="relative w-64 h-64 lg:w-[400px] lg:h-[400px] mb-10 md:mb-0">
              <div className="absolute inset-0 bg-primary/5 rounded-full translate-x-4 translate-y-4"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-xl z-10">
                <img
                  src="/Pass_photo.jpg"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
