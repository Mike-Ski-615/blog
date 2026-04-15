import type { Config } from "@react-router/dev/config";
import { PROJECT_SLUGS } from "./app/data/projects";

export default {
  appDirectory: "app",
  ssr: true,
  async prerender({ getStaticPaths }) {
    return [
      ...getStaticPaths(),
      ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`),
    ];
  },
} satisfies Config;
