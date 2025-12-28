import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
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

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-360 mx-auto">
          <div className="flex flex-col items-center gap-16">
            <div className="flex-1 flex justify-center flex-col text-center max-w-3xl">
              <h1 className="heading-xl text-hb-dark mb-6">
                Own property back home securely. From anywhere
              </h1>
              <p className="body-lg text-hb-text-secondary mb-8 max-w-xl mx-auto">
                Buy property and manage your investments with confidence,
                clarity, and complete visibility all in one app.
              </p>
              <div className="flex md:flex-row flex-col justify-center gap-3">
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
            <div className="flex-1 relative">
              <Image
                src="/phone-mockup.png"
                alt="Homebridge App"
                width={310}
                height={624}
                className="relative md:hidden block z-10"
              />
              <Image
                src="/phone-lap.svg"
                alt="Homebridge App"
                width={1106}
                height={640}
               className="md:block hidden"
              />

            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="pb-20 px-8 lg:px-16 bg-linear-to-b from-transparent to-white">
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
      <section id="about" className="pb-20 px-8 lg:px-20">
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
      <section className="pb-20 px-8 lg:px-20 ">
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
            <Image
              src="/visibility.svg"
              alt=""
              width={675}
              height={600}
              className="object-contain md:block hidden"
            />
            <Image
              src="/visibility-mob.svg"
              alt=""
              width={675}
              height={600}
              className="object-contain md:hidden block"
            />
            <div className="space-y-6">
              <Image
                src="/reality.svg"
                alt=""
                width={529}
                height={294}
                className="object-cover md:block hidden"
              />
              <Image
                src="/flex-mob.svg"
                alt=""
                width={529}
                height={294}
                className="object-cover md:hidden block"
              />
              <Image
                src="/flex.svg"
                alt=""
                width={529}
                height={294}
                className="object-cover md:block hidden"
              />
              <Image
                src="/reality-mob.svg"
                alt=""
                width={529}
                height={294}
                className="object-cover md:hidden block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pb-20 px-8 lg:px-20">
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
      <section id="how-it-works" className=" pb-20 px-8 lg:px-20">
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
            <div className="md:w-5/12">
              <Image
                src="/Register-filled.svg"
                alt=""
                width={353}
                height={404}
                className="object-cover w-full"
              />
            </div>

            <div className="md:w-6/12 space-y-12">
              <StepItem
                step="Step 1"
                title="Create an Account"
                description="Sign up with your email or phone and get access to verified property listings."
              />
              <StepItem
                step="Step 2"
                title="Browse & Purchase Properties"
                description="Explore properties, choose your preferred payment plan, and purchase securely."
              />
              <StepItem
                step="Step 3"
                title="Track & Monitor Investments"
                description="Monitor your properties, check payment progress, and list properties for resale."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pb-20 px-8 lg:px-20">
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
      <section className="pb-20 px-8 lg:px-20 ">
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
      <section className="pb-20 px-8 lg:px-16 ">
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
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  width={17}
                  height={15}
                  className="brightness-0 invert cursor-pointer"
                />
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                   className="brightness-0 invert cursor-pointer"
                />
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={19}
                  height={20}
                   className="brightness-0 invert cursor-pointer"
                />
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
    <div className="flex-1 relative group cursor-pointer">
      <div className="relative h-96 rounded-3xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3 border border-white/10">
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
    <div className={`flex justify-between md:flex-row flex-col gap-4 items-center ${imagePosition === "right" ? "md:flex-row-reverse" : ""}`}>
      {imagePosition === "left" && (
        <div className="md:w-6/12 flex justify-start">
          <Image
            src={image}
            alt=""
            width={560}
            height={463}
            className="object-contain"
          />
        </div>
      )}
        {imagePosition === "right" && (
        <div className="md:w-6/12 flex justify-end ">
          <Image
            src={image}
            alt=""
            width={560}
            height={463}
            className="object-contain"
          />
        </div>
      )}
      <div className="text-center md:w-5/12">
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
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className={`space-y-2 ${step === "Step 1" ? "bg-[#F8F6F9] rounded-4xl p-5" : ""}`}>
      <p className="label-sm text-hb-text-secondary">{step}</p>
      <h3 className="heading-sm text-hb-dark">{title}</h3>
      <p className="body-md text-hb-text-secondary">{description}</p>
    </div>
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
          className={`w-full ${
            featured
              ? "bg-hb-primary hover:bg-hb-primary/90"
              : "bg-white hover:bg-gray-50 text-hb-dark border border-hb-border-gray"
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
