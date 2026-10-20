'use client'
import AnimatedNumber from './AnimatedNo';

const infoItems = [
  { id: 0, number: 12, label: 'Projects Shipped' },   
  { id: 1, number: 8, label: 'Tools & Libraries' },
  { id: 2, number: 3, label: 'Years of Experience' },
];

export default function HeroDetails() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-8 text-background xl:flex-row xl:items-center"> 
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="text-2xl md:text-3xl">
          <span className="text-primary">{`<h1>`}</span><br />
            <h1 className="pl-3 text-2xl font-bold leading-tight sm:text-3xl md:pl-4 md:text-4xl xl:text-5xl">
                Hey
            <br />
                I&#39;m <span className="text-primary">Mohamed</span>,
            <br />
                Full-Stack Web Developer
            </h1>
          <span className="text-primary">{`</h1>`}</span>
        </div>

        <div className="text-lg md:text-xl">
          <span className="text-primary">{`<p>`}</span><br />
          <p className="my-2 max-w-prose pl-3 text-base leading-relaxed text-background/80 sm:pl-4 sm:text-lg">
            I develop end-to-end web applications using modern frontend technologies, 
            backend systems, and relational databases to deliver scalable, 
            reliable, and user-focused solutions.
          </p>
          <span className="text-primary">{`</p>`}</span>
        </div>
      </div>

      <div className="flex h-fit w-fit max-w-xs flex-col items-center justify-center gap-8 rounded-3xl bg-card-foreground/50 backdrop:blur-2xl p-6 sm:gap-10 sm:p-8">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center gap-3 text-background/80"
          >
            <span className="text-4xl font-bold text-primary sm:text-5xl">
              <AnimatedNumber value={item.number} />
            </span>

            <p className="min-w-0 text-sm sm:text-base">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}