const fs = require('fs');

const path = 'src/app/[locale]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Users and Mail to lucide-react imports if not there
if (!content.includes('Users,')) {
  content = content.replace('ClipboardEdit,', 'ClipboardEdit,\n  Users,\n  Mail,');
}

// 2. Replace Hero Section
const heroRegex = /\{\/\* HERO SECTION \*\/\}(.|\n)*?(?=\{\/\* SERVICES SECTION \*\/\})/s;
const newHero = `{/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pb-12 pt-8 lg:pt-16">
        <div className="absolute inset-0 z-0">
          {slideImages.map((slide, index) => (
            <img 
              key={index}
              src={slide.url} 
              alt="Background" 
              className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 \${index === currentSlide ? 'opacity-10' : 'opacity-0'}\`}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = 'png';
                  img.src = '/images/transportation.png';
                  return;
                }
                img.onerror = null;
                img.src = 'https://images.unsplash.com/photo-1569152811536-7f17e9f1c989?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90"></div>
        </div>
        
        <div className="container-max relative z-10 pt-4 pb-8 md:pb-12 text-center">
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto space-y-6 md:space-y-8">
            
            {/* Top Text */}
            <div className="text-[10px] md:text-sm font-bold text-[#001f3f] tracking-[0.2em] md:tracking-[0.3em] uppercase">
              {tNew('hero.topText')}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-[#001f3f]">
              <span className="text-swiss-red">Swiss</span>CleanMove – {tNew('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl text-[#001f3f]/80 font-medium max-w-3xl leading-relaxed">
              {tNew('hero.subtitle')}
            </p>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <Link href={\`/\${locale}/free-offer\`} className="inline-flex items-center justify-center space-x-2 bg-swiss-red text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
                <span>{tNew('services.offerteBtn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 w-full border-t border-gray-200 mt-8">
              {[
                { icon: CheckCircle, text: tNew('hero.badges.guarantee'), bg: 'bg-red-50', color: 'text-swiss-red' },
                { icon: ClipboardEdit, text: tNew('hero.badges.insurance'), bg: 'bg-red-50', color: 'text-swiss-red' },
                { icon: Sparkles, text: tNew('hero.badges.transparent'), bg: 'bg-red-50', color: 'text-swiss-red' },
                { icon: Users, text: tNew('hero.badges.contact'), bg: 'bg-red-50', color: 'text-swiss-red' }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center space-y-3 mt-6">
                  <div className={\`w-14 h-14 rounded-full \${badge.bg} flex items-center justify-center\`}>
                    <badge.icon className={\`w-7 h-7 \${badge.color}\`} />
                  </div>
                  <span className="text-sm font-bold text-[#001f3f]">{badge.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      `;
content = content.replace(heroRegex, newHero);

// 3. Update CTA Section
const ctaRegex = /<div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">(.|\n)*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/s;
const newCta = `<div className="flex flex-wrap justify-center lg:justify-end gap-4 w-full lg:w-auto">
              <Link href={\`/\${locale}/free-offer\`} className="btn-primary py-3 px-6 text-center shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 font-bold">
                <span>{tNew('services.freeObligation').split(' ')[0]} Offerte</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+41782158030" className="flex items-center justify-center space-x-2 px-5 py-3 border-2 border-white/20 rounded-lg text-white font-bold hover:bg-white/10 transition-colors">
                <Phone className="w-5 h-5" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-gray-300">{tNew('cta.hours')}</div>
                  <div className="text-sm">+41 78 215 80 30</div>
                </div>
              </a>
              <a href="https://wa.me/41782158030" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-5 py-3 bg-[#25D366]/10 border-2 border-[#25D366] rounded-lg text-white font-bold hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-[#25D366]">{tNew('cta.whatsapp')}</div>
                  <div className="text-sm">WhatsApp</div>
                </div>
              </a>
              <Link href={\`/\${locale}/contact\`} className="flex items-center justify-center space-x-2 px-5 py-3 border-2 border-blue-400/50 rounded-lg text-white font-bold hover:bg-blue-500/10 transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-blue-300">{tNew('hero.contactBtn')}</div>
                  <div className="text-sm">Email / Form</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>`;
content = content.replace(ctaRegex, newCta);

fs.writeFileSync(path, content);
console.log('page.tsx updated.');
