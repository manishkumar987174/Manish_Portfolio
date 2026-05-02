import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { SKILLS, PROJECTS } from '../constants';

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-16 text-center">
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-primary font-bold tracking-widest uppercase text-xs"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl font-bold tracking-tighter mt-2"
    >
      {title}
    </motion.h2>
  </div>
);

export const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Technical Expertise" subtitle="My Skills" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-[#E5E7EB]"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-6">{category.category}</h3>
              <div className="space-y-6">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-600 font-medium">{skill.name}</span>
                      <span className="text-primary font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Featured Projects" subtitle="Portfolio" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] bg-white border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-shadow"
            >
              {/* Preview */}
              <div className="h-[220px] overflow-hidden relative">
                
                {/* No Live URL -> Image */}
                {!project.liveUrl ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Other Projects -> Live Website */
                  <iframe
                    src={project.liveUrl}
                    title={project.title}
                    className="w-full h-full border-0 bg-white"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  
                  <div className="flex gap-4 pointer-events-auto">
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-xl bg-primary text-white shadow-lg"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}

                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl bg-white text-black shadow-lg"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>

                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black mb-3">
                  {project.title}
                </h3>

                <p className="text-zinc-600 mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold flex items-center gap-2"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-zinc-400 font-bold flex items-center gap-2 cursor-not-allowed">
                    Not Live
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};