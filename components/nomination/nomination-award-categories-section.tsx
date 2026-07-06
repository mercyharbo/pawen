"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { useNomination } from "@/lib/stores/nomination-dialog-store";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const awardCategories = [
  {
    title: "Entrepreneurship Excellence Awards",
    description:
      "Scaling African Businesses for Growth. African women entrepreneurs are building resilient, innovative, high-growth businesses across every industry. This category celebrates market access, scaling strategy, and the opportunities shaping the future of African enterprise.",
    image: {
      src: "/images/entreprenuer.jpg",
      alt: "Entrepreneurship Excellence Awards flyer",
    },
  },
  {
    title: "Leadership Excellence Awards",
    description:
      "Recognising women leading institutions, teams, and industries with vision, courage, and measurable influence across Africa's business and professional landscape.",
    image: {
      src: "/images/leadership.jpg",
      alt: "Leadership Excellence Awards flyer",
    },
  },
  {
    title: "Impact Leadership Awards",
    description:
      "Celebrating women whose work creates lasting social, economic, policy, community, or environmental impact across the continent and diaspora.",
    image: {
      src: "/images/impact.jpg",
      alt: "Impact Leadership Awards flyer",
    },
  },
  {
    title: "Special Awards",
    description:
      "Honouring exceptional contributions, legacy achievements, and standout work that deserves dedicated recognition beyond the core award categories.",
    image: null,
  },
] as const;

export function NominationAwardCategoriesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { openDialog } = useNomination();
  const reduceMotion = useReducedMotion();
  const panelTransition = {
    duration: reduceMotion ? 0 : 0.36,
    ease: [0.22, 1, 0.36, 1],
  } as const;

  return (
    <section
      id='award-categories'
      aria-labelledby='nomination-award-categories-heading'
      className='bg-[linear-gradient(180deg,var(--color-pawen-brand-color)_0%,var(--color-pawen-brand-color)_42%,rgba(28,6,45,0.82)_58%,var(--color-pawen-brand-color)_74%,var(--color-pawen-brand-color)_100%)] px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16'
    >
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-10'>
        <div className='flex flex-col items-center gap-5 text-center'>
          <MotionReveal>
            <h2
              id='nomination-award-categories-heading'
              className='font-brand text-4xl font-semibold leading-tight text-accent sm:text-5xl'
            >
              Award Categories
            </h2>
          </MotionReveal>

          <MotionReveal className='max-w-5xl' delay={0.12}>
            <p className='font-brand text-base leading-6 md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              Explore the categories below and nominate that African woman whose
              contribution deserves to be recognized and celebrated. Every
              nomination undergoes a rigorous multi-stage evaluation process led
              by an independent judging panel comprising respected leaders from
              business, governance, academia and civil society. Self nominations
              are accepted. NOMINATION is FREE!!! We will never ask you to pay
              for any award.
            </p>
          </MotionReveal>
        </div>

        <div className='flex flex-col'>
          {awardCategories.map((category, index) => {
            const isActive = activeCategory === index
            const categoryNumber = String(index + 1).padStart(2, '0')
            const contentId = `award-category-panel-${index}`

            return (
              <MotionReveal
                className='border-b border-primary/10'
                delay={index * 0.06}
                key={category.title}
              >
                <article className='py-7 lg:py-8'>
                  <button
                    type='button'
                    aria-controls={contentId}
                    aria-expanded={isActive}
                    className={`group/category flex w-full gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-5 ${
                      isActive ? 'items-start' : 'items-center'
                    }`}
                    onClick={() => setActiveCategory(index)}
                  >
                    <span
                      className={`font-brand text-lg text-accent sm:text-xl ${
                        isActive ? 'leading-8' : 'leading-none'
                      }`}
                    >
                      {categoryNumber}
                    </span>
                    <span className='flex-1 font-brand text-2xl leading-tight text-primary sm:text-3xl'>
                      {category.title}
                    </span>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/45 text-primary transition-all duration-500 ease-out group-hover/category:bg-accent group-hover/category:text-background group-focus-visible/category:bg-accent group-focus-visible/category:text-background sm:size-10 ${
                        isActive
                          ? 'rotate-90 opacity-0'
                          : 'rotate-0 opacity-100'
                      }`}
                      aria-hidden='true'
                    >
                      <ArrowRight className='size-5' />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        className='overflow-hidden'
                        exit={{ height: 0, opacity: 0, y: -8 }}
                        id={contentId}
                        initial={{ height: 0, opacity: 0, y: 8 }}
                        key='expanded-content'
                        transition={panelTransition}
                      >
                        <div
                          className={`grid gap-8 pt-5 lg:items-center lg:gap-16 ${
                            category.image
                              ? "lg:grid-cols-[1fr_18rem] xl:grid-cols-[1fr_20rem]"
                              : ""
                          }`}
                        >
                          <div className='flex flex-col gap-5 pl-12 sm:pl-14'>
                            <p
                              className={`font-brand text-base leading-6 md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8 ${
                                category.image ? "max-w-xl" : "max-w-3xl"
                              }`}
                            >
                              {category.description}
                            </p>
                            <Button
                              className='h-10 w-fit rounded-full bg-accent px-6 font-medium text-background hover:bg-accent/90'
                              onClick={openDialog}
                              type='button'
                            >
                              Submit a Nomination
                            </Button>
                          </div>

                          {category.image ? (
                            <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
                              <Image
                                src={category.image.src}
                                alt={category.image.alt}
                                fill
                                sizes='(min-width: 1280px) 20rem, (min-width: 1024px) 18rem, calc(100vw - 5.5rem)'
                                className='object-cover'
                              />
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              </MotionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
