import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Define the TypeScript type for a single speaker
type Speaker = {
  image: string;
  name: string;
  role: string;
};

// Define the props for our component
interface KeynoteProps {
  speakers: Speaker[];
  onCtaClick: () => void;
}

const imageSrc = "/assets/conclaveBanner.jpeg";

const KeynoteSection: React.FC<KeynoteProps> = ({ onCtaClick, speakers }) => {
  return (
    <section className="gradient-bg pt-6 pb-12 md:pb-20 overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-effect inline-flex items-center gap-2 px-4 py-2 mb-8">
          <div className="w-5 h-3 bg-linear-to-r from-blue-400 to-pink-400 rounded-full" />
          <span className="text-sm font-medium text-muted-foreground">
            November 13th-14th 2025 | Bourdellion Hotel 2nd Avenue Gwarimpa
            Estate Abuja.
          </span>
        </div>
        {/* Video Placeholder */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg mb-12 md:mb-16">
          {/* Background Image */}
          <Image
            src={imageSrc}
            alt="conclave banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-1 mb-10 border-b border-white/20 pb-8 lg:border-none lg:pb-0 lg:mb-0">
            <div className="w-full flex items-center justify-between gap-2 mx-auto mb-6">
              <h1 className="text-5xl font-bold tracking-tight leading-tight">
                <span className="gradient-text">The Conclave 2025</span>
              </h1>
              <Button
                onClick={onCtaClick}
                size="lg"
                className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 p-2 text-xs font-semibold rounded-lg group cursor-pointer lg:hidden"
              >
                Register
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="mt-6 text-lg text-white">
              We are delighted to welcome you to Conclave 2025 - an exclusive
              gathering of pastors, partners, and protégés committed to the
              divine assignment God has entrusted to Rev. Arome Tokula. It’s a
              time of impartation, renewal, and advancement as we receive from
              Rev. Ayeni, a father and mentor in the faith. Come expectant, for
              this will be a destiny-defining encounter in God’s presence.
            </p>
          </div>

          {/* Right Column: Speakers */}
          <div className="lg:col-span-2 lg:border-l border-white/20 lg:pl-8">
            {/* Speakers Header & Accessibility */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-white">Speakers</h2>
              <div className="hidden lg:block">
                <Button
                  onClick={onCtaClick}
                  size="lg"
                  className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 p-2 text-xs font-semibold rounded-lg group cursor-pointer"
                >
                  Secure your seat
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Speakers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
              {speakers.map((speaker) => (
                <div key={speaker.name} className="text-center">
                  <Image
                    src={speaker.image}
                    alt={`Portrait of ${speaker.name}`}
                    width={112} // 112px (w-28)
                    height={112} // 112px (h-28)
                    className="rounded-full mx-auto object-cover h-28 w-28"
                  />
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/90">{speaker.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeynoteSection;
