import {
  IconAppWindow,
  IconBook2,
  IconBrandGithub,
  IconBug,
  IconWorldPin,
} from "@tabler/icons-react";
import type { LinkType } from "@/data/projects";

type LinkConfig = {
  icon: typeof IconWorldPin;
  messageId: string;
  order: number;
};

export const LINK_CONFIG: Record<LinkType, LinkConfig> = {
  github: {
    icon: IconBrandGithub,
    messageId: "common.link.github",
    order: 1,
  },
  readme: {
    icon: IconBook2,
    messageId: "common.link.readme",
    order: 2,
  },
  issues: {
    icon: IconBug,
    messageId: "common.link.issues",
    order: 3,
  },
  demo: {
    icon: IconAppWindow,
    messageId: "common.link.demo",
    order: 4,
  },
  website: {
    icon: IconWorldPin,
    messageId: "common.link.website",
    order: 5,
  },
};
