"use client";

import { useState, useEffect } from "react";
import { FileDown, Github, Linkedin, Menu, X } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-display text-2xl text-foreground transition-colors hover:text-accent"
        >
          {data.personal.logo}
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {data.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Social + Resume */}
        <div className="hidden items-center gap-4 md:flex">
          {data.personal.resume && (
            <a
              href={data.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <FileDown size={16} />
              Resume
            </a>
          )}
          <a
            href={data.personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <Github size={20} />
          </a>
          <a
            href={data.personal.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/98 backdrop-blur-md md:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-6 text-foreground"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          {data.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display text-3xl text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
            {data.personal.resume && (
              <a
                href={data.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                <FileDown size={20} />
                Resume
              </a>
            )}
            <a
              href={data.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-accent"
            >
              <Github size={24} />
            </a>
            <a
              href={data.personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-accent"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
