import React from 'react';

type SwissHeroProps = {
  badge: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  cta?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

export default function SwissHero({ badge, title, subtitle, cta, right, className }: SwissHeroProps) {
  return (
    <section
      className={
        `relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_100%)] ${className ?? ''}`
      }
    >
      <div className="container-max py-10 md:py-12 lg:py-14">
        <div className="relative bg-white border border-swiss-border rounded-3xl shadow-soft overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#FFE9EA_0%,transparent_55%)] opacity-40"></div>
          <div
            className={`relative grid grid-cols-1 ${right ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-10 items-center p-7 md:p-8 lg:p-10`}
          >
            <div className="space-y-5 md:space-y-6">
              <div className="inline-flex items-center bg-swiss-softRed text-swiss-red rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider uppercase">
                {badge}
              </div>

              <h1 className="text-[32px] leading-[1.15] md:text-[46px] md:leading-[1.12] font-bold text-swiss-text">
                {title}
              </h1>

              {subtitle ? (
                <p className="text-[16px] leading-relaxed md:text-[18px] text-swiss-body max-w-[600px]">
                  {subtitle}
                </p>
              ) : null}

              {cta ? <div className="pt-1">{cta}</div> : null}
            </div>

            {right ? (
              <div className="relative">
                <div className="absolute -top-10 -left-10 h-44 w-44 rounded-full bg-swiss-gray-50 opacity-80 blur-[1px]"></div>
                <div className="absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-swiss-gray-50 opacity-70 blur-[1px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] md:h-[380px] md:w-[380px] rounded-full border-[12px] border-swiss-softRed opacity-70"></div>

                <div className="relative bg-white border border-swiss-border rounded-2xl shadow-soft overflow-hidden">
                  <div className="p-4">
                    <div className="rounded-2xl overflow-hidden">{right}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
