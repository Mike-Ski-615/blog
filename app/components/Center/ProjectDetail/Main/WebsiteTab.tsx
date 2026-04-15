import { useMemo, useState } from "react";
import { IconCheck, IconCopy, IconDownload } from "@tabler/icons-react";
import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WebsiteTabProps = {
  githubUrl?: string;
};

type CloneProtocol = "https" | "ssh" | "cli";

export function WebsiteTab({ githubUrl }: WebsiteTabProps) {
  const intl = useIntl();
  const [copiedCloneProtocol, setCopiedCloneProtocol] =
    useState<CloneProtocol | null>(null);
  const repository = useMemo(
    () => parseGitHubRepository(githubUrl),
    [githubUrl],
  );
  const cloneCommands = useMemo(() => {
    if (!repository) {
      return null;
    }

    const https = `https://github.com/${repository.owner}/${repository.repo}.git`;
    const ssh = `git@github.com:${repository.owner}/${repository.repo}.git`;
    const cli = `gh repo clone ${repository.owner}/${repository.repo}`;

    return {
      zip: `https://github.com/${repository.owner}/${repository.repo}/archive/refs/heads/main.zip`,
      protocols: [
        { value: "https", label: "HTTPS", command: https },
        { value: "ssh", label: "SSH", command: ssh },
        { value: "cli", label: "GitHub CLI", command: cli },
      ] satisfies Array<{
        value: CloneProtocol;
        label: string;
        command: string;
      }>,
    };
  }, [repository]);

  const copyCloneCommand = async (protocol: CloneProtocol, command: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(command);
    setCopiedCloneProtocol(protocol);

    window.setTimeout(() => {
      setCopiedCloneProtocol(null);
    }, 1600);
  };

  return (
    <TabsContent value="website">
      <div className="p-4">
        {cloneCommands ? (
          <Tabs defaultValue="https" className="gap-4">
            <TabsList variant="line" className="h-9 w-full justify-start">
              {cloneCommands.protocols.map((protocol) => (
                <TabsTrigger
                  key={protocol.value}
                  value={protocol.value}
                  className="flex-none px-2"
                >
                  {protocol.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <Separator />

            {cloneCommands.protocols.map((protocol) => (
              <TabsContent
                key={protocol.value}
                value={protocol.value}
                className="flex flex-col gap-3"
              >
                <InputGroup className="h-auto min-h-12 rounded-lg px-2">
                  <InputGroupInput
                    aria-label={protocol.label}
                    readOnly
                    value={protocol.command}
                    className="font-mono text-sm"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={
                        copiedCloneProtocol === protocol.value
                          ? intl.formatMessage({ id: "common.copied" })
                          : intl.formatMessage({ id: "common.copy" })
                      }
                      onClick={() =>
                        copyCloneCommand(protocol.value, protocol.command)
                      }
                      size="icon-sm"
                    >
                      {copiedCloneProtocol === protocol.value ? (
                        <IconCheck />
                      ) : (
                        <IconCopy />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                <p className="text-sm text-muted-foreground">
                  {intl.formatMessage({
                    id: "projectDetail.cloneDescription",
                  })}
                </p>
              </TabsContent>
            ))}

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="ghost">
                <a href={cloneCommands.zip}>
                  <IconDownload data-icon="inline-start" />
                  {intl.formatMessage({ id: "projectDetail.downloadZip" })}
                </a>
              </Button>
            </div>
          </Tabs>
        ) : (
          <p className="text-sm text-muted-foreground">
            {intl.formatMessage({ id: "projectDetail.websiteUnavailable" })}
          </p>
        )}
      </div>
    </TabsContent>
  );
}

function parseGitHubRepository(githubUrl?: string) {
  if (!githubUrl) {
    return null;
  }

  try {
    const url = new URL(githubUrl);
    const [owner, repoName] = url.pathname.replace(/^\/|\/$/g, "").split("/");
    const repo = repoName?.replace(/\.git$/, "");

    if (url.hostname !== "github.com" || !owner || !repo) {
      return null;
    }

    return { owner, repo };
  } catch {
    return null;
  }
}
