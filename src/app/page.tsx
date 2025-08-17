
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src="/images/home-img.jpg"
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover -z-10" // -z-10 places it behind content
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-black/70" />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="flex flex-col gap-6 p-12 text-white rounded-xl bg-black/80 max-w-96 sm:text-2xl">
          <h1>ZeroTech&apos;s<br />Repair Shop</h1>
          <address className="not-italic">
            555 GateWay Lane<br />
            Kansas City, KS 55555
          </address>
          <p>Open Daily: 9am to 5pm</p>
          <Link href="tel:5555555" className="hover:underline">
            555-555-555
          </Link>
        </div>
      </main>
    </div>
  );
}