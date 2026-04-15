import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconCopy,
  IconDownload,
  IconMapPin,
  IconStack2,
  IconUserSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { useIntl } from "react-intl";

const resumePath = "/documents/resume-mike-ski.md";
const emailAddress = "gvjk0631@gmail.com";

const resumeFacts = [
  {
    id: "role",
    icon: IconUserSearch,
    labelId: "resume.fact.role.label",
    valueId: "resume.fact.role.value",
  },
  {
    id: "stack",
    icon: IconStack2,
    labelId: "resume.fact.stack.label",
    valueId: "resume.fact.stack.value",
  },
  {
    id: "location",
    icon: IconMapPin,
    labelId: "resume.fact.location.label",
    valueId: "resume.fact.location.value",
  },
];

export default function Resume() {
  const intl = useIntl();
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(emailAddress);
    setIsEmailCopied(true);

    setTimeout(() => {
      setIsEmailCopied(false);
    }, 1800);
  };

  return (
    <>
      <div className="px-4 py-2 text-lg font-medium">
        {intl.formatMessage({ id: "resume.title" })}
      </div>
      <div className="double-divider" />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {intl.formatMessage({ id: "resume.badge.available" })}
              </Badge>
              <Badge variant="outline">
                {intl.formatMessage({ id: "resume.badge.updated" })}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold leading-tight">
                {intl.formatMessage({ id: "resume.heading" })}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {intl.formatMessage({ id: "resume.description" })}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Button size="sm" asChild>
              <a href={resumePath} download="mike-ski-resume.md">
                <IconDownload data-icon="inline-start" />
                {intl.formatMessage({ id: "resume.download" })}
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-24"
              onClick={handleCopyEmail}
            >
              {isEmailCopied ? (
                <IconCheck data-icon="inline-start" />
              ) : (
                <IconCopy data-icon="inline-start" />
              )}
              {intl.formatMessage({
                id: isEmailCopied ? "resume.emailCopied" : "resume.copyEmail",
              })}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
