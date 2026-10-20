import { Briefcase, Mail, MapPin } from 'lucide-react';
import { SiWhatsapp } from "react-icons/si";
import Image from 'next/image';
import { ReactNode } from 'react';
import DownloadCV from './download-cv';

const infoItems = [
  { label: 'muhammedahmedragab@gmail.com', icon: <Mail size={20}/>, href: 'mailto:muhammedahmedragab@gmail.com?subject=Job%20Inquiry' },
  { label: 'Egypt', icon: <MapPin size={20}/> },
  { label: 'Full-time / Freelancer', icon: <Briefcase size={20}/> },
  { label: 'WhatsApp', icon: <SiWhatsapp size={20}/>, href: 'http://wa.me/201097182681' },
];

const languageItems = [
  { label: 'SQL' },
  { label: 'Express.js' },
  { label: 'Node.js' },
  { label: 'React' },
  { label: 'Next.js' }
];

type InfoItemProps = {
  item: {
    icon: ReactNode;
    label: string;
    href?: string;
  };
};


function InfoItem({ item }: InfoItemProps) {
  const content = (
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-primary">
        {item.icon}
      </span>

      <span className="min-w-0 wrap-break-words text-sm text-secondary/70">
        {item.label}
      </span>
    </div>
  );

  return (
    <li className="min-w-0">
      {item.href ? (
        <a href={item.href}>
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export default function HeroCardDetails() {
  return (
    <div className="border-l-4 border-t-4 border-primary rounded-tl-[154px]">
      <div className="bg-foreground/40  text-sm text-background border-4 border-border rounded-br-[150px] rounded-tl-[150px] flex flex-col items-center justify-center gap-5 p-4 sm:p-6">
        <Image
          src="/images/mohamed2.webp"
          alt="Portrait of Mohamed Ahmed, full-stack web developer"
          className="rounded-full border-2 border-primary"
          width={100}
          height={100}
          priority
        />

        <div className="text-center">
          <h1 className="font-bold sm:text-xl md:text-2xl">Mohamed Ahmed</h1>
          <h3 className="text-background/70">Full-Stack Web Developer</h3>
        </div>

        <ul className="flex flex-col gap-3 w-full">
            {infoItems.map((item) => (
              <InfoItem key={item.label} item={item} />
            ))}
        </ul>

        <div className="flex gap-2 flex-wrap justify-center">
            {languageItems.map((item) => (
              <h6
                key={item.label}
                className="bg-primary rounded-full py-0.5 px-2 text-secondary-surface text-sm hover:opacity-80 transition-opacity"
              >
                {item.label}
              </h6>
            ))}
        </div>
        
        <DownloadCV />
      </div>
    </div>
  );
}