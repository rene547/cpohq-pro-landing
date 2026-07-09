"use client";

import { useState } from "react";
import type { Variant, VariantId } from "@/lib/variants";
import Image from "next/image";
import Banner from "@/components/sections/Banner";
import Hero from "@/components/sections/Hero";
import HeroV0 from "@/components/sections/HeroV0";
import { ShellNavbar } from "@/components/ShellNavbar";
import LogoBar from "@/components/sections/LogoBar";
import LogoBarV0 from "@/components/sections/LogoBarV0";
import Highlights from "@/components/sections/Highlights";
import HighlightCardsV0 from "@/components/sections/HighlightCardsV0";
import LoveWall from "@/components/sections/LoveWall";
import LoveWallV0 from "@/components/sections/LoveWallV0";
import Community from "@/components/sections/Community";
import CommunityV0 from "@/components/sections/CommunityV0";
import ChiefOfStaff from "@/components/sections/ChiefOfStaff";
import ChiefOfStaffV0 from "@/components/sections/ChiefOfStaffV0";
import Agents from "@/components/sections/Agents";
import Security from "@/components/sections/Security";
import TalkToUs from "@/components/sections/TalkToUs";
import TalkToUsV0 from "@/components/sections/TalkToUsV0";
import Footer from "@/components/sections/Footer";
import JoinModal from "@/components/JoinModal";
import VariantSwitcher from "@/components/VariantSwitcher";

/* v0 is locked; v3-v5 are the same page with one deliberate tweak each. */
const V0_FAMILY: Partial<Record<VariantId, { darkNav?: boolean; coloredLogos?: boolean; mirrorHero?: boolean }>> = {
  v0: {},
  v3: { darkNav: true },
  v4: { coloredLogos: true },
  v5: { mirrorHero: true },
};

export default function Landing({ variant }: { variant: Variant }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openJoin = (prefill = "") => {
    setEmail(prefill);
    setModalOpen(true);
  };

  const fam = V0_FAMILY[variant.id];

  if (fam) {
    return (
      <div className={`page ${variant.themeClass} flex-1`}>
        <ShellNavbar
          className={
            fam.darkNav
              ? "[--nav-bg:rgba(11,13,18,0.78)] text-white"
              : undefined
          }
          logo={
            <Image
              src={
                fam.darkNav
                  ? "/brand/cpohqlogo-horizontal-white.png"
                  : "/brand/cpohqlogo-horizontal-black.png"
              }
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
        <HeroV0 onJoin={openJoin} mirror={fam.mirrorHero} />
        <LogoBarV0 colored={fam.coloredLogos} />
        <HighlightCardsV0 />
        <LoveWallV0 />
        <CommunityV0 />
        <ChiefOfStaffV0 />
        <Agents />
        <Security />
        <TalkToUsV0 onJoin={() => openJoin()} />
        <Footer />
        <JoinModal open={modalOpen} email={email} onClose={() => setModalOpen(false)} />
        <VariantSwitcher current={variant.id} />
      </div>
    );
  }

  return (
    <div className={`page ${variant.themeClass} flex-1`}>
      <Banner />
      <Hero variant={variant} onJoin={openJoin} />
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
