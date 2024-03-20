import Link from "next/link";
import { FaLock as Lock } from "react-icons/fa6";
import { IoQrCode as QRCode } from "react-icons/io5";

import { auth } from "@/server/auth";

import {
  BentoGrid,
  BentoGridCard,
  BentoGridCardDescription,
  BentoGridCardTitle,
} from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container">
        <Header />
        <div className="flex flex-col items-center justify-center space-y-4 py-24">
          <div className="w-[980px] space-y-2 text-center">
            <h1 className="hidden text-center text-3xl font-bold leading-tight tracking-tighter md:block md:text-5xl lg:leading-[1.1]">
              Your restaurant in one Link. Less papers, just a QRCode away.
            </h1>

            <p className="mx-auto max-w-[750px] text-center text-sm text-muted-foreground sm:text-lg">
              Revolutionize your menu presentation with our innovative startup.
              Create stunning digital menus tailored to your brand effortlessly.
              Stand out, engage customers, and streamline operations with our
              user-friendly platform.
            </p>
          </div>

          <Button variant="default" asChild>
            {session ? (
              <Link href="/admin">Go to Admin Page!</Link>
            ) : (
              <Link href="/auth">Get started!</Link>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold tracking-tight">Features</h4>

          <BentoGrid>
            <BentoGridCard>
              <BentoGridCardTitle>
                Create Your Own Digital Menu
              </BentoGridCardTitle>
              <BentoGridCardDescription>
                Easily enhance your menu with our user-friendly platform. Add
                new meals, update prices, and showcase specials effortlessly.
                Stay agile and keep customers engaged with our streamlined menu
                expansion tool.
              </BentoGridCardDescription>
            </BentoGridCard>

            <BentoGridCard>
              <BentoGridCardTitle>
                Reduce Papers and Carbon Footprint
              </BentoGridCardTitle>
              <BentoGridCardDescription>
                Eliminate the need for paper menus with our digital solution.
                Customers can view your menu on their mobile phones, tablets,
                and computers with just a scan of a QR code. Reduce waste, lower
                carbon footprint, and promote a more sustainable future of food
                service.
              </BentoGridCardDescription>
            </BentoGridCard>

            <BentoGridCard>
              <BentoGridCardTitle>
                Share Your Menu With The World
              </BentoGridCardTitle>
              <BentoGridCardDescription>
                Make sharing your menu easy and convenient with our platform.
                Invite friends, family, and colleagues to view your menu and
                enhance customer experience with our social sharing feature.
              </BentoGridCardDescription>
            </BentoGridCard>

            <BentoGridCard className="relative row-span-2 overflow-hidden">
              <BentoGridCardTitle>
                Generate a QRCode For The Menu
              </BentoGridCardTitle>
              <BentoGridCardDescription>
                Streamline customer access to your menu with our QR code
                generator. Enhance convenience, elevate customer experience, and
                embrace the future of dining technology effortlessly.
                <QRCode className="absolute -bottom-8 -right-4 size-[220px] -rotate-[6deg] text-primary" />
              </BentoGridCardDescription>
            </BentoGridCard>

            <BentoGridCard className="relative col-span-2 overflow-hidden">
              <BentoGridCardTitle>Privacy and Security</BentoGridCardTitle>
              <BentoGridCardDescription>
                Privacy and security are essential components of data
                protection. While security focuses on safeguarding data from
                breaches, privacy concerns the protection of user identity and
                personal information. By prioritizing both aspects,
                organizations can enhance data protection, comply with
                regulations, and build trust with users effectively.
                <Lock className="absolute -bottom-6 -right-2 size-[116px] -rotate-[6deg] text-primary" />
              </BentoGridCardDescription>
            </BentoGridCard>

            <BentoGridCard>
              <BentoGridCardTitle>Always Improving</BentoGridCardTitle>
              <BentoGridCardDescription>
                We are always on the move, constantly evolving to better serve
                you. Our commitment to improvement drives us every day, ensuring
                that we deliver the best possible experience to our customers.
              </BentoGridCardDescription>
            </BentoGridCard>
          </BentoGrid>
        </div>

        <Footer />
      </div>
    </main>
  );
}
