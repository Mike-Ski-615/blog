import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/Center/SectionHeader";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { ExperienceEntry } from "@/types";

function ExperienceItem({ experience }: { experience: ExperienceEntry }) {
  return (
    <AccordionItem
      value={experience.id}
      className="group px-4 transition-colors hover:bg-muted/30 not-last:border-b-0"
    >
      <AccordionTrigger className="py-4 hover:no-underline">
        <div className="flex w-full flex-col items-start justify-between pr-2 sm:flex-row">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-muted/25">
              <div className=" flex size-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                {experience.logoText}
              </div>
            </div>

            <div className="min-w-0 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className=" text-lg font-semibold leading-none">
                  {experience.organization}
                </h3>
                {experience.employmentType ? (
                  <Badge variant="outline" className="">
                    {experience.employmentType}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {experience.role}
              </p>
            </div>
          </div>

          <div className=" mt-2 text-sm text-muted-foreground md:mt-0 md:pl-4 md:text-right">
            <p className="text-base font-semibold">{experience.period}</p>
            <p className="text-base text-muted-foreground">
              {experience.location}
            </p>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <ul className="flex flex-col gap-2.5 pb-2 pl-3 text-sm leading-7 text-muted-foreground md:pl-5">
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function Experiences() {
  const {
    home: { experiences },
  } = useSiteContent();

  return (
    <>
      <SectionHeader>{experiences.title}</SectionHeader>

      <Accordion type="single" collapsible>
        {experiences.items.map((experience, index) => (
          <div key={experience.id}>
            <ExperienceItem experience={experience} />
            {index < experiences.items.length - 1 && (
              <div className="double-divider" />
            )}
          </div>
        ))}
      </Accordion>
    </>
  );
}
