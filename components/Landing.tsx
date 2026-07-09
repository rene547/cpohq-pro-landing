"use client";

import { useState } from "react";
import type { Variant } from "@/lib/variants";
import Image from "next/image";
import Banner from "@/components/sections/Banner";
import Hero from "@/components/sections/Hero";
import HeroV0 from "@/components/sections/HeroV0";
import { ShellNavbar } from "@/components/ShellNavbar";
import LogoBar from "@/components/sections/LogoBar";
import Highlights from "@/components/sections/Highlights";
import LoveWall from "@/components/sections/LoveWall";
import Community from "@/components/sections/Community";
import ChiefOfStaff from "@/components/sections/ChiefOfStaff";
import Agents from "@/components/sections/Agents";
import Security from "@/components/sections/Security";
import TalkToUs from "@/components/sections/TalkToUs";
import Footer from "@/components/sections/Footer";
import JoinModal from "@/components/JoinModal";
import VariantSwitcher from "@/components/VariantSwitcher";

export default function Landing({ variant }: { variant: Variant }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openJoin = (prefill = "") => {
    setEmail(prefill);
    setModalOpen(true);
  };

  return (
    <div className={`page ${variant.themeClass} flex-1`}>
      {/* v0 follows Stripe: nav is topmost; investor banner returns lower once
          Lucas's logos land */}
      {variant.id === "v0" ? (
        <>
          <ShellNavbar
            logo={
              <Image
                src="/brand/cpohqlogo-horizontal-black.png"
                alt="CPOHQ"
                width={120}
                height={24}
                priority
              />
            }
            links={[
              { label: "Community", href: "#community" },
              { label: "AI Chief of Staff", href: "#chief-of-staff" },
              { label: "AI Agents", href: "#agents" },
              { label: "Careers", href: "#" },
            ]}
            secondaryCta={{ label: "Talk to us", href: "#" }}
            cta={{ label: "Join CPOHQ", onClick: () => openJoin() }}
          />
          <HeroV0 onJoin={openJoin} />
        </>
      ) : (
        <>
          <Banner />
          <Hero variant={variant} onJoin={openJoin} />
        </>
      )}
      <LogoBar variant={variant} />
      <Highlights />
      <LoveWall />
      <Community />
      <ChiefOfStaff variant={variant} />
      <Agents />
      <Security />
      <TalkToUs onJoin={() => openJoin()} />
      <Footer />
      <JoinModal open={modalOpen} email={email} onClose={() => setModalOpen(false)} />
      <VariantSwitcher current={variant.id} />
    </div>
  );
}
