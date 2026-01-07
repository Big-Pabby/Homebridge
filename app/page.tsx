"use client";

import { ChevronDown, Check, Instagram } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function useInViewSection(threshold: number = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isInView };
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [imageChanging, setImageChanging] = useState(false);

  const heroReveal = useInViewSection(0.2);
  const partnersReveal = useInViewSection(0.1);
  const aboutReveal = useInViewSection(0.15);
  const benefitsReveal = useInViewSection(0.15);
  const featuresReveal = useInViewSection(0.15);
  const howItWorksReveal = useInViewSection(0.15);
  const pricingReveal = useInViewSection(0.15);
  const faqReveal = useInViewSection(0.15);
  const ctaReveal = useInViewSection(0.15);

  useEffect(() => {
    // small fade/slide animation when image changes
    setImageChanging(true);
    const timeout = setTimeout(() => setImageChanging(false), 40);
    return () => clearTimeout(timeout);
  }, [activeStep]);

  const steps = useMemo(
    () => [
      {
        step: "Step 1",
        title: "Create an Account",
        description:
          "Sign up with your email or phone and get access to verified property listings.",
        image: "/Register-filled.svg",
      },
      {
        step: "Step 2",
        title: "Browse & Purchase Properties",
        description:
          "Explore properties, choose your preferred payment plan, and purchase securely.",
        image: "/browse.svg",
      },
      {
        step: "Step 3",
        title: "Track & Monitor Investments",
        description:
          "Monitor your properties, check payment progress, and list properties for resale.",
        image: "/properties.svg",
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle animated background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-hb-primary/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-hb-dark/5 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      </div>
      {/* Header */}

      {/* Hero Section */}
      <section
        ref={heroReveal.ref as React.RefObject<HTMLElement>}
        className={`pt-32 pb-20 px-8 lg:px-16 relative overflow-hidden transition-all duration-700 ease-out ${
          heroReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="flex flex-col items-center gap-16">
            <div className="flex-1 flex justify-center flex-col text-center max-w-3xl">
              <h1 className="heading-xl text-hb-dark mb-6 transition-all duration-700 ease-out delay-100 transform-gpu">
                Own property back home securely. From anywhere
              </h1>
              <p className="body-lg text-hb-text-secondary mb-8 max-w-xl mx-auto transition-all duration-700 ease-out delay-200 transform-gpu">
                Buy property and manage your investments with confidence,
                clarity, and complete visibility all in one app.
              </p>
              <div className="flex md:flex-row flex-col justify-center gap-3">
                <Button className="bg-hb-dark hover:bg-hb-dark/90 text-white rounded-lg px-6 h-12 transform-gpu transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-hb-dark/20">
                  <Image
                    src="/icons/apple.svg"
                    alt=""
                    width={20}
                    height={24}
                    className="mr-2 brightness-0 invert"
                  />
                  Get it on IOS
                </Button>
                <Button
                  variant="outline"
                  className="border-hb-border-gray rounded-lg px-6 h-12 transform-gpu transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-hb-border-gray/30"
                >
                  <Image
                    src="/icons/play-store.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Get on Andriod
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <Image
                src="/phone-mockup.png"
                alt="Homebridge App"
                width={310}
                height={624}
                className="relative md:hidden block z-10 transform-gpu transition-transform duration-700 ease-out delay-300"
              />
              <Image
                src="/phone-lap.svg"
                alt="Homebridge App"
                width={1106}
                height={640}
                className="md:block hidden transform-gpu transition-transform duration-700 ease-out delay-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section
        ref={partnersReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-16 bg-linear-to-b from-transparent to-white transition-all duration-700 ease-out ${
          partnersReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <h2 className="heading-sm text-center text-hb-dark mb-8">
            Trusted by leading developers & partners
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-20">
            <Image src="/partners/base.svg" alt="Base" width={78} height={27} />
            <Image
              src="/partners/atlas.svg"
              alt="Atlas"
              width={85}
              height={27}
            />
            <Image
              src="/partners/shape.svg"
              alt="Shape"
              width={92}
              height={27}
            />
            <Image
              src="/partners/graphite.svg"
              alt="Graphite"
              width={109}
              height={28}
            />
            <Image
              src="/partners/imagine-ai.svg"
              alt="Imagine AI"
              width={113}
              height={27}
            />
            <Image
              src="/partners/queue.svg"
              alt="Queue"
              width={99}
              height={27}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-20 transition-all duration-700 ease-out ${
          aboutReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="grid grid-cols-1 gap-16 items-start">
            <div className="flex justify-between md:gap-16 gap-8  items-center flex-col md:flex-row md:text-left text-center">
              <h2 className="heading-lg md:w-6/12 text-hb-dark">
                Owning property back home shouldn't feel uncertain
              </h2>
              <p className="body-md md:w-4/12 text-hb-text-secondary ">
                HomeBridge brings clarity, verification, and peace of mind to
                Nigerians in the diaspora by giving you a trusted way to
                monitor, verify, and stay in control of your property from
                anywhere in the world.
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <PropertyTypeCard
                icon="/icons/house.svg"
                title="Houses"
                image="/properties/house-1.jpg"
              />
              <PropertyTypeCard
                icon="/icons/land.svg"
                title="Lands"
                image="/properties/land.jpg"
              />
              <PropertyTypeCard
                icon="/icons/apartment.svg"
                title="Apartments"
                image="/properties/apartment.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-20 transition-all duration-700 ease-out ${
          benefitsReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg text-hb-dark mb-6">
              Own your peace of mind, wherever you are
            </h2>
            <p className="body-md text-hb-text-secondary">
              HomeBridge gives you the confidence to stay in control of your
              property investments, no matter where you are in the world.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 items-stretch gap-6">
            {/* Left large illustration */}
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/visibility.svg"
                alt=""
                width={675}
                height={600}
                className="object-contain md:block hidden transform-gpu transition-transform duration-700 ease-out hover:scale-105"
              />
              <Image
                src="/visibility-mob.svg"
                alt=""
                width={675}
                height={600}
                className="object-contain md:hidden block transform-gpu transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>

            {/* Right stacked cards */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-hb-dark/10">
                <Image
                  src="/reality.svg"
                  alt=""
                  width={529}
                  height={294}
                  className="object-cover md:block hidden transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                />
                <Image
                  src="/flex-mob.svg"
                  alt=""
                  width={529}
                  height={294}
                  className="object-cover md:hidden block transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div className="relative overflow-hidden rounded-3xl transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-hb-dark/10">
                <Image
                  src="/flex.svg"
                  alt=""
                  width={529}
                  height={294}
                  className="object-cover md:block hidden transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                />
                <Image
                  src="/reality-mob.svg"
                  alt=""
                  width={529}
                  height={294}
                  className="object-cover md:hidden block transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-20 transition-all duration-700 ease-out ${
          featuresReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="heading-lg text-hb-dark mb-6">
              Everything You Need to Invest Confidently
            </h2>
            <p className="body-md text-hb-text-secondary">
              From verified listings to secure resale and payment tracking,
              HomeBridge ensures your investment is protected at every stage.
            </p>
          </div>

          <div className="space-y-20">
            <FeatureRow
              image="/verified.png"
              title="Verified & Insured Properties"
              description="Every property in HomeBridge is fully verified, documented, and covered by trusted insurance partners. We make sure your investment is real, secure, and protected so you can manage it from anywhere without worry."
              imagePosition="left"
            />
            <FeatureRow
              image="/escrow.png"
              title="Escrow-Protected Payment"
              description="Know exactly what's been paid, what's pending, and when it's due. HomeBridge gives you a real-time, escrow-backed payment dashboard so your funds are protected and progress is clear"
              imagePosition="right"
            />
            <FeatureRow
              image="/resale.png"
              title="Resale Marketplace"
              description="List your property on our secondary marketplace. Connect with other diaspora buyers through our secure bidding and transfer system"
              imagePosition="left"
            />
            <FeatureRow
              image="/ai.png"
              title="AI-driven property intelligence"
              description="HomeBridge leverages AI to analyze market trends, forecast property values, and deliver actionable insights tailored to your portfolio"
              imagePosition="right"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section
        id="how-it-works"
        ref={howItWorksReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-20 transition-all duration-700 ease-out ${
          howItWorksReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="heading-lg text-hb-dark mb-6">
              How easy it is to buy property back home
            </h2>
            <p className="body-md text-hb-text-secondary">
              3 simple steps to find, buy, and manage your property back home
            </p>
          </div>

          <div className="flex justify-between items-start gap-12 flex-col lg:flex-row md:w-10/12 mx-auto">
            <div className="md:w-5/12 w-full">
              <div
                className={`relative w-full aspect-353/404 overflow-hidden rounded-3xl bg-hb-bg-light transform-gpu transition-all duration-700 ease-out ${
                  imageChanging
                    ? "opacity-0 translate-y-3"
                    : "opacity-100 translate-y-0"
                }`}
                key={steps[activeStep].image}
              >
                <Image
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>

            <div className="md:w-6/12 space-y-4">
              {steps.map((item, idx) => (
                <StepItem
                  key={item.step}
                  step={item.step}
                  title={item.title}
                  description={item.description}
                  active={activeStep === idx}
                  onClick={() => setActiveStep(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-20 transition-all duration-700 ease-out ${
          pricingReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="heading-lg text-hb-dark mb-6">
              Start today, with free or premium plan
            </h2>
            <p className="body-md text-hb-text-secondary">
              Choose the plan that fits your property goals and complete control
              from day one.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PricingCard
              title="Free"
              price="₦0"
              period="/user per year"
              description="Everything you need to invest safely"
              features={[
                "Full escrow protection for all payments",
                "Milestone Verification before payout",
                "Document storage & management",
                "Payment tracking dashboard",
                "Stay updated on milestones and alerts",
              ]}
            />
            <PricingCard
              title="AI Premium"
              price="₦100,000"
              period="/user per year"
              description="AI-powered insights & Recommendations"
              features={[
                "All Free Plan features",
                "AI-powered market insights",
                "Smart Property Recommedations",
                "Portfolio performance insights",
                "Smart alerts for opportunities",
              ]}
              featured
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-20 transition-all duration-700 ease-out ${
          faqReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg text-hb-dark mb-3">
              Frequently Asked Questions
            </h2>
            <p className="body-md text-hb-text-secondary">
              Everything you need to know about investing safely with HomeBridge
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-hb-bg-lighter rounded-xl px-6 py-5 border-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="label-md text-hb-dark">
                    How does Homebridge protect my money?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="body-sm text-hb-text-secondary ">
                  Your payments go into a secure third-party escrow account, NOT
                  directly to the developer. Funds are only released when
                  milestones are verified and proven complete. If a developer
                  doesn't deliver, they don't get paid. Your money stays
                  protected until work is done.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-hb-bg-light rounded-xl px-6 py-5 border-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="label-md text-hb-dark">
                    Can I track my property progress after purchase?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="body-sm text-hb-text-secondary">
                  Yes, you can track all progress through your dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-hb-bg-light rounded-xl px-6 py-5 border-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="label-md text-hb-dark">
                    How do you verify developers?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="body-sm text-hb-text-secondary">
                  We thoroughly vet all developers on our platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-hb-bg-light rounded-xl px-6 py-5 border-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="label-md text-hb-dark">
                    Can I resell properties?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="body-sm text-hb-text-secondary">
                  Yes, through our resale marketplace.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-hb-bg-light rounded-xl px-6 py-5 border-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="label-md text-hb-dark">
                    How do I know my payment is secure?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="body-sm text-hb-text-secondary">
                  All payments are escrow-protected and verified.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="mt-8 bg-white rounded-xl border border-hb-border-light p-6">
              <div className="flex md:items-center gap-4 items-start md:flex-row flex-col justify-between">
                <div>
                  <h3 className="label-md text-hb-dark mb-1">
                    Still have a question in mind?
                  </h3>
                  <p className="body-sm text-hb-text-secondary">
                    Contact us if you have any other questions.
                  </p>
                </div>
                <Button className="bg-hb-primary hover:bg-hb-primary/90 text-white rounded-lg">
                  Contact us
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={ctaReveal.ref as React.RefObject<HTMLElement>}
        className={`pb-20 px-8 lg:px-16 transition-all duration-700 ease-out ${
          ctaReveal.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-360 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-hb-bg-light rounded-4xl relative md:px-12 px-5 md:py-20 py-10 overflow-hidden">
            <div>
              <h2 className="heading-lg text-hb-dark mb-6">
                Start Building Your Property Portfolio Today
              </h2>
              <p className="body-md text-hb-text-secondary mb-8">
                Download the HomeBridge app and start your property investment
                journey today with complete transparency, bulletproof
                protection, and zero stress.
              </p>
              <div className="flex md:flex-row flex-col gap-3">
                <Button className="bg-hb-dark hover:bg-hb-dark/90 text-white rounded-lg px-6 h-12">
                  <Image
                    src="/icons/apple.svg"
                    alt=""
                    width={20}
                    height={24}
                    className="mr-2 brightness-0 invert"
                  />
                  Get it on IOS
                </Button>
                <Button
                  variant="outline"
                  className="border-hb-border-gray rounded-lg px-6 h-12"
                >
                  <Image
                    src="/icons/play-store.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Get on Andriod
                </Button>
              </div>
            </div>
            <div className="md:absolute right-0 -bottom-72 -mr-5 -mb-10">
              <Image
                src="/phone-cta.png"
                alt="HomeBridge App"
                width={533}
                height={422}
                className=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hb-dark py-16 px-8 lg:px-16">
        <div className="max-w-360 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/logo.svg"
                  alt="Homebridge"
                  width={33}
                  height={37}
                />
                <span className="text-2xl font-semibold text-white -tracking-wider">
                  Homebridge
                </span>
              </div>
              <p className="body-sm text-hb-text-muted">
                Property investment made simple, safe, and stress-free for
                Nigerians abroad.
              </p>
            </div>

            <div className="flex flex-col md:justify-end md:items-end gap-8">
              <div className="flex md:flex-row flex-col md:gap-12 gap-4">
                <a
                  href="#about"
                  className="label-sm text-hb-border-gray hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#how-it-works"
                  className="label-sm text-hb-border-gray hover:text-white transition-colors"
                >
                  How it Works
                </a>
                <a
                  href="#features"
                  className="label-sm text-hb-border-gray hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="label-sm text-hb-border-gray hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </div>
              <div className="flex gap-4">
                <a target="_blank" href="https://x.com/myhomebridgeapp">
                  <Image
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    width={17}
                    height={15}
                    className="brightness-0 invert cursor-pointer"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/myhomebridgeapp/"
                >
                  <Instagram
                    size={20}
                    className="brightness-0 invert cursor-pointer"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/myhomebridgeapp"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    width={19}
                    height={20}
                    className="brightness-0 invert cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-hb-text-secondary/30 pt-8">
            <div className="flex flex-wrap items-center gap-4 text-xs text-hb-text-secondary">
              <span>©2025 HomeBridge. All rights reserved</span>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Cookie policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function PropertyTypeCard({
  icon,
  title,
  image,
}: {
  icon: string;
  title: string;
  image: string;
}) {
  return (
    <div className="flex-1 relative group cursor-pointer transform-gpu transition-transform duration-500 hover:-translate-y-2">
      <div className="relative h-96 rounded-3xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3 border border-white/10 transform-gpu transition-all duration-500 group-hover:bg-white/20 group-hover:-translate-y-1">
          <Image
            src={icon}
            alt=""
            width={19}
            height={19}
            className="brightness-0 invert"
          />
          <span className="text-white text-xl font-medium -tracking-wide">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  title,
  description,
  imagePosition,
  image,
}: {
  title: string;
  description: string;
  imagePosition: "left" | "right";
  image: string;
}) {
  return (
    <div
      className={`flex justify-between md:flex-row flex-col gap-8 items-center transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 ${
        imagePosition === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {imagePosition === "left" && (
        <div className="md:w-6/12 flex justify-start">
          <div className="relative overflow-hidden rounded-3xl transform-gpu transition-transform duration-700 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-hb-dark/10">
            <Image
              src={image}
              alt=""
              width={560}
              height={463}
              className="object-contain"
            />
          </div>
        </div>
      )}
      {imagePosition === "right" && (
        <div className="md:w-6/12 flex justify-end ">
          <div className="relative overflow-hidden rounded-3xl transform-gpu transition-transform duration-700 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-hb-dark/10">
            <Image
              src={image}
              alt=""
              width={560}
              height={463}
              className="object-contain"
            />
          </div>
        </div>
      )}
      <div className="text-left md:w-5/12 transform-gpu transition-all duration-500 ease-out hover:-translate-y-0.5">
        <h3 className="heading-sm text-hb-dark mb-4">{title}</h3>
        <p className="body-md text-hb-text-secondary">{description}</p>
      </div>
    </div>
  );
}

function StepItem({
  step,
  title,
  description,
  active = false,
  onClick,
}: {
  step: string;
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left space-y-2 rounded-4xl p-5 transition-all duration-300 transform-gpu ${
        active
          ? "bg-[#F8F6F9] shadow-lg shadow-hb-dark/10 -translate-y-0.5"
          : "bg-white border border-hb-border-light hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      <p className="label-sm text-hb-text-secondary">{step}</p>
      <h3 className="heading-sm text-hb-dark">{title}</h3>
      <p className="body-md text-hb-text-secondary">{description}</p>
    </button>
  );
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  featured = false,
}: {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <Card
      className={`${
        featured ? "border-2 border-hb-primary" : "border border-hb-border-gray"
      } rounded-xl overflow-hidden bg-[#F8F6F9]`}
    >
      <CardHeader className="space-y-6">
        <div>
          <h3 className="text-xl font-medium text-hb-dark mb-2">{title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-medium text-hb-dark -tracking-wider">
              {price}
            </span>
            <span className="body-md font-medium text-[#0E0E0F]">{period}</span>
          </div>
        </div>
        <p className="body-md text-hb-text-secondary">{description}</p>
        <Button
          className={`w-full transform-gpu transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
            featured
              ? "bg-hb-primary hover:bg-hb-primary/90 shadow-hb-primary/30"
              : "bg-white hover:bg-gray-50 text-hb-dark border border-hb-border-gray shadow-hb-border-gray/30"
          } rounded-full h-12`}
        >
          Get started
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <h4 className="text-lg font-medium">
          {title === "Free" ? "Free includes" : "AI includes"}
        </h4>
        <div className="space-y-5">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 items-start">
              <Check className="w-4 h-4 text-hb-text-primary mt-1 shrink-0" />
              <span className="body-md text-hb-text-primary">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
