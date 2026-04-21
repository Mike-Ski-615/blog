import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/Center/SectionHeader";
import { IconCheck, IconCopy, IconDownload } from "@tabler/icons-react";
import { useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { siteConfig } from "@/site/config";

export default function Resume() {
  const {
    home: { resume },
  } = useSiteContent();
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const resumeEmail = siteConfig.resume.email.trim();
  const hasResumeEmail = Boolean(resumeEmail);

  const handleCopyEmail = async () => {
    if (!navigator.clipboard || !hasResumeEmail) return;

    await navigator.clipboard.writeText(resumeEmail);
    setIsEmailCopied(true);

    setTimeout(() => {
      setIsEmailCopied(false);
    }, 1800);
  };

  return (
    <>
      <SectionHeader>{resume.title}</SectionHeader>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="">
                {resume.badges.available}
              </Badge>
              <Badge variant="outline" className="">
                {resume.badges.updated}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold leading-tight">
                {resume.heading}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                {resume.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Button size="sm" className="" asChild>
              <a
                href={siteConfig.resume.href}
                download={siteConfig.resume.downloadName}
              >
                <IconDownload data-icon="inline-start" />
                {resume.downloadLabel}
              </a>
            </Button>

            {hasResumeEmail ? (
              <Button
                variant="outline"
                size="sm"
                className=" w-26"
                onClick={handleCopyEmail}
              >
                {isEmailCopied ? (
                  <IconCheck data-icon="inline-start" />
                ) : (
                  <IconCopy data-icon="inline-start" />
                )}
                {isEmailCopied
                  ? resume.emailCopiedLabel
                  : resume.copyEmailLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
